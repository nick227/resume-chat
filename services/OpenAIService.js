const { OpenAI } = require('openai');
const { buildConfig } = require('../config/prompts');
const { AUTO_MESSAGES } = require('../config/AUTO_MESSAGES');
const { Message } = require('../models/Message');

class OpenAIService {
    constructor() {
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        this.requestLimit = 50;
        this.autoMessages = AUTO_MESSAGES;

        // Rate limiting state
        this.requestTimes = [];
        this.windowSize = 60000; // 1 minute window

        this.messageConfig = Object.freeze({
            includeHistory: true, // Toggle chat history
            maxHistoryLength: 5 // Max number of previous messages to include
        });
    }

    async getMessageByIndex(startIndex = 0) {
        // Validate index
        if (startIndex < 0 || startIndex >= this.autoMessages.length) {
            throw new Error('Invalid message index');
        }

        const message = this.autoMessages[startIndex];
        if (!message) {
            throw new Error('Message not found');
        }

        return message;
    }

    async getRandomFact() {
        this.registerRequest();
        // Should use the same message config and processing as normal chat
        const message = 'Write a short fact about Nick. Be humble and low-key. Keep it short and concise. Wrap the entire response in a <div class="panel"> tag.';
        const history = []; // Empty history for random facts

        const config = this.buildMessageConfig(message, history);
        const completion = await this.client.responses.create(config);

        if (!completion) {
            throw new Error('No response from OpenAI');
        }

        return this.parseResponse(completion);
    }

    async generateResponse(message, history) {
        this.registerRequest();
        if (!message || typeof message !== 'string') {
            throw new Error('Invalid message format');
        }
        if (!Array.isArray(history)) {
            throw new Error('Invalid history format');
        }

        const config = this.buildMessageConfig(message, history);
        const completion = await this.client.responses.create(config);

        if (!completion) {
            throw new Error('No response from OpenAI');
        }

        return this.parseResponse(completion);
    }

    buildMessageConfig(message, history) {
        if (!message) throw new Error('Message is required');
        if (!Array.isArray(history)) throw new Error('History must be an array');

        const config = buildConfig({
            temperature: 0.7
        });

        if (!config.messages || !Array.isArray(config.messages)) {
            throw new Error('Invalid configuration: messages must be an array');
        }

        // Start with system message from config
        const messages = [...config.input];

        // Only include history if enabled
        if (this.messageConfig.includeHistory && history.length > 0) {
            // Validate and sort history messages
            const validHistoryMessages = history
                .filter(msg =>
                    msg &&
                    typeof msg.role === 'string' &&
                    ['system', 'user', 'assistant'].includes(msg.role) &&
                    typeof msg.message === 'string' &&
                    msg.created_at // Ensure timestamp exists
                )
                .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)) // Sort by timestamp
                .slice(-this.messageConfig.maxHistoryLength); // Limit history length

            messages.push(...validHistoryMessages.map(msg => ({
                role: msg.role,
                content: msg.message
            })));
        }

        // Add current user message last
        messages.push({
            role: 'user',
            content: message
        });

        config.input = messages;
        return config;
    }

    parseResponse(completion) {
        let aiMessage, aiOptions, aiButtons;
        if (!completion.output || !Array.isArray(completion.output)) {
            throw new Error('Invalid response format from OpenAI');
        }

        const toolCall = completion.output.find(item =>
            item && item.type === 'tool_call'
        );

        if (toolCall) {
            try {
                if (!toolCall.arguments || typeof toolCall.arguments !== 'string') {
                    throw new Error('Missing tool call arguments');
                }
                const parsed = JSON.parse(toolCall.arguments);
                if (typeof parsed.message !== 'string' || !Array.isArray(parsed.options)) {
                    throw new Error('Invalid tool call payload');
                }
                aiMessage = parsed.message;
                aiOptions = parsed.options;
                aiButtons = parsed.buttons;
            } catch (error) {
                console.error('Error parsing function call arguments:', error);
                throw new Error('Invalid response format from OpenAI');
            }
        } else if (completion.output_text) {
            aiMessage = completion.output_text;
            aiOptions = [];
            aiButtons = [];
        }

        if (!aiMessage) {
            throw new Error('Empty response from OpenAI');
        }

        if (completion.usage && completion.usage.total_tokens === undefined) {
            const inputTokens = completion.usage.input_tokens;
            const outputTokens = completion.usage.output_tokens;
            if (typeof inputTokens === 'number' && typeof outputTokens === 'number') {
                completion.usage.total_tokens = inputTokens + outputTokens;
            }
        }

        return {
            message: aiMessage,
            options: aiOptions || [],
            buttons: aiButtons || [],
            completion
        };
    }

    registerRequest() {
        const now = Date.now();
        const cutoff = now - this.windowSize;
        while (this.requestTimes.length > 0 && this.requestTimes[0] <= cutoff) {
            this.requestTimes.shift();
        }

        if (this.requestTimes.length >= this.requestLimit) {
            throw new Error('Rate limit exceeded. Please try again later.');
        }

        this.requestTimes.push(now);
    }

    async saveMessage(userId, message, role, model, tokens, sessionId) {
        await Message.saveMessage({
            userId: userId,
            message: message,
            role: role,
            model: model,
            tokens: tokens,
            sessionId: sessionId
        });
    }
}

module.exports = new OpenAIService();