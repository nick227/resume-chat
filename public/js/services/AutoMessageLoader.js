import { CONSTANTS } from '../constants.js';
import { MessageHandler } from '../handlers/MessageHandler.js';
import { ChatButtons } from '../handlers/ChatButtons.js';
import { ChatAPI } from '../api/ChatAPI.js';

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
        this.isLoading = false; // Add loading state
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

        return async() => {
            if (this.isLoading) return;

            try {
                this.isLoading = true;
                MessageHandler.toggleLoading(true);

                const url = new URL(`/api/chat/${config.endpoint}`, window.location.origin);
                url.searchParams.append('userId', ChatAPI.getUserId());
                url.searchParams.append('sessionId', ChatAPI.getSessionId());
                url.searchParams.append('startIndex', startIndex);

                const response = await fetch(url);
                const data = await response.json();
                const validatedData = ChatAPI.validateResponse(data);

                if (validatedData.success) {
                    await MessageHandler.addMessage('bot', validatedData.message);

                    if (validatedData.options && validatedData.options.length) {
                        ChatButtons.insertButtons(validatedData.options);
                    }

                    if (validatedData.buttons && validatedData.buttons.length) {
                        ChatButtons.updateButtons(validatedData.buttons);
                    }
                }
            } catch (error) {
                console.error(`${config.errorContext} error:`, error);
            } finally {
                this.isLoading = false;
                MessageHandler.toggleLoading(false);
                return new Promise(resolve => setTimeout(resolve, delay));
            }
        };
    }

    /**
     * Initialize with message configurations
     */
    init(config = {
        messages: [
            { type: 'AUTO', delay: 3000, maxRuns: 3, startIndex: 0 }
        ]
    }) {
        this.taskGroups.clear();

        config.messages.forEach((messageConfig, groupIndex) => {
            const { type, delay = 3000, maxRuns = 0, startIndex = 0 } = messageConfig;

            // For infinite runs, just create one task that repeats
            const task = this.createMessageTask(type, delay, startIndex);
            if (task) {
                this.taskGroups.set(`group-${type}-${groupIndex}`, {
                    task,
                    currentRuns: 0,
                    maxRuns,
                    delay
                });
            }
        });

        // Start all task groups
        this.taskGroups.forEach((group, groupId) => {
            this.runSequence(groupId);
        });

        return this;
    }

    /**
     * Run tasks in sequence for a group
     */
    async runSequence(groupId) {
        const group = this.taskGroups.get(groupId);
        if (!group) return;

        // Check if we should stop
        if (group.maxRuns > 0 && group.currentRuns >= group.maxRuns) {
            return;
        }

        try {
            await group.task();
            group.currentRuns++;

            // Continue if infinite or not reached max
            if (group.maxRuns === 0 || group.currentRuns < group.maxRuns) {
                this.runSequence(groupId);
            }
        } catch (error) {
            console.error(`Sequence error for ${groupId}:`, error);
        }
    }

    /**
     * Cleanup
     */
    destroy() {
        this.taskGroups.clear();
        this.isLoading = false;
    }
}

export const autoMessageLoader = new AutoMessageLoader();

window.addEventListener('unload', () => autoMessageLoader.destroy());