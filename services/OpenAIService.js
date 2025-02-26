const { OpenAI } = require('openai');
const { buildConfig } = require('../config/prompts');

class OpenAIService {
    constructor() {
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        this.requestCount = 0;
        this.requestLimit = 50;
        this.resetInterval = 60000; // 1 minute

        // Use a more precise rate limiting mechanism
        this.requestTimes = [];
        this.windowSize = 60000; // 1 minute window

        setInterval(() => {
            const now = Date.now();
            this.requestTimes = this.requestTimes.filter(time =>
                now - time < this.windowSize
            );
        }, 1000); // Clean up every second

        // Config flags
        this.config = {
            includeHistory: false, // Toggle chat history
            maxHistoryLength: 5 // Max number of previous messages to include
        };
    }

    async generateResponse(message, history) {
        const now = Date.now();
        this.requestTimes = this.requestTimes.filter(time =>
            now - time < this.windowSize
        );

        if (this.requestTimes.length >= this.requestLimit) {
            throw new Error('Rate limit exceeded. Please try again later.');
        }

        this.requestTimes.push(now);
        if (!message || typeof message !== 'string') {
            throw new Error('Invalid message format');
        }
        if (!Array.isArray(history)) {
            throw new Error('Invalid history format');
        }

        const config = this.buildMessageConfig(message, history);
        //console.log(config);
        const completion = await this.client.chat.completions.create(config);

        if (!completion.choices || !completion.choices[0]) {
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
        const messages = [...config.messages];

        // Add current user message next
        messages.push({
            role: 'user',
            content: message
        });

        // Only include history if enabled
        if (this.config.includeHistory && history.length > 0) {
            // Validate and sort history messages
            const validHistoryMessages = history
                .filter(msg =>
                    msg &&
                    typeof msg.role === 'string' &&
                    typeof msg.message === 'string' &&
                    msg.created_at // Ensure timestamp exists
                )
                .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)) // Sort by timestamp
                .slice(-this.config.maxHistoryLength); // Limit history length

            messages.push(...validHistoryMessages.map(msg => ({
                role: msg.role,
                content: msg.message
            })));
        }

        config.messages = messages;
        return config;
    }

    parseResponse(completion) {
        const choice = completion.choices[0];
        let aiMessage, aiOptions;

        if (choice.message.function_call) {
            try {
                const parsed = JSON.parse(choice.message.function_call.arguments);
                aiMessage = parsed.message;
                aiOptions = parsed.options;
            } catch (error) {
                console.error('Error parsing function call arguments:', error);
                throw new Error('Invalid response format from OpenAI');
            }
        } else if (choice.message.content) {
            aiMessage = choice.message.content;
            // Default options might not be appropriate for all contexts
            aiOptions = [
                "Tell me more about that",
                "Can you explain that differently?",
                "What else should I know?"
            ];
        } else {
            throw new Error('Unexpected response format from OpenAI');
        }

        if (!aiMessage) {
            throw new Error('Empty response from OpenAI');
        }

        return {
            message: aiMessage,
            options: aiOptions || [], // Ensure options is always an array
            completion
        };
    }

    // Method to update config
    setConfig(newConfig) {
        this.config = {
            ...this.config,
            ...newConfig
        };
    }
}

module.exports = new OpenAIService();