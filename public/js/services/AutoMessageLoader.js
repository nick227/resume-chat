import { CONSTANTS } from '../constants.js';
import { MessageHandler } from '../handlers/MessageHandler.js';
import { ChatButtons } from '../handlers/ChatButtons.js';
import { ChatAPI } from '../api/ChatAPI.js';
import { RESPONSE_TYPES } from '../schema.js';

/**
 * Service to automatically load messages after period of inactivity
 */
export class AutoMessageLoader {
    static instance = null;
    static MESSAGE_TYPES = {
        AUTO: { endpoint: 'auto', errorContext: 'Auto message' },
        RANDOM: { endpoint: 'random', errorContext: 'Random message' },
        QUESTIONS: { endpoint: 'questions', errorContext: 'Questions message' }
    };

    constructor() {
        if (AutoMessageLoader.instance) return AutoMessageLoader.instance;
        this.taskGroups = new Map();
        this.isLoading = false;
        AutoMessageLoader.instance = this;
    }

    /**
     * Create a single message task
     */
    createMessageTask(type, delay, startIndex) {
        const config = AutoMessageLoader.MESSAGE_TYPES[type];
        if (!config) {
            console.error(`Unknown message type: ${type}`);
            return null;
        }

        let currentIndex = startIndex; // Track index for this task

        return async() => {
            if (this.isLoading) return;

            try {
                this.isLoading = true;
                MessageHandler.toggleLoading(true);

                const url = new URL(`/api/chat/${config.endpoint}`, window.location.origin);
                url.searchParams.append('userId', ChatAPI.getUserId());
                url.searchParams.append('sessionId', ChatAPI.getSessionId());
                url.searchParams.append('startIndex', currentIndex); // Use current index

                console.log('Requesting message at index:', currentIndex);

                const response = await fetch(url);
                const data = await response.json();
                const validatedData = ChatAPI.validateResponse(data);

                if (validatedData.success) {
                    await MessageHandler.addMessage('bot', validatedData.message, RESPONSE_TYPES.TEXT, false);

                    if (validatedData.options && validatedData.options.length) {
                        ChatButtons.insertButtons(validatedData.options);
                    }

                    if (validatedData.buttons && validatedData.buttons.length) {
                        ChatButtons.updateButtons(validatedData.buttons);
                    }
                }

                currentIndex++; // Increment for next run
            } catch (error) {
                console.error(`${config.errorContext} error:`, error);
            } finally {
                this.isLoading = false;
                MessageHandler.toggleLoading(false);
                return new Promise(resolve => setTimeout(resolve, delay));
            }
        };
    }

    init({ messages }) {
        if (!Array.isArray(messages)) {
            console.error('Messages must be an array');
            return;
        }

        // Create separate task sequences for each message config
        messages.forEach((config, index) => {
            console.log(`Initializing message group ${index}:`, config);

            const { type, delay, maxRuns, startIndex = 0, startDelay = 0 } = config;

            // Create task sequence
            const task = this.createMessageTask(type, delay, startIndex);
            if (!task) return;

            // Setup task runner with its own counter
            let runCount = 0;
            const runner = async() => {
                if (runCount >= maxRuns) {
                    console.log(`Task group ${index} completed ${maxRuns} runs`);
                    return;
                }

                await task();
                runCount++;

                // Schedule next run after delay
                setTimeout(runner, delay);
            };

            // Store task group
            this.taskGroups.set(index, {
                config,
                runner,
                runCount: 0
            });

            // Start the sequence with initial delay
            console.log(`Starting task group ${index} with initial delay ${startDelay}ms`);
            setTimeout(runner, startDelay);
        });
    }

    destroy() {
        this.taskGroups.clear();
    }
}

export const autoMessageLoader = new AutoMessageLoader();

window.addEventListener('unload', () => autoMessageLoader.destroy());