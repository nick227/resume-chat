import { StorageManager } from './StorageManager.js';

/**
 * Manages chat history storage and retrieval
 */
export class ChatStorageManager {
    static STORAGE_KEY = 'chatHistory';
    static MAX_MESSAGES = 50;

    /**
     * Retrieves all chat messages from storage
     * @returns {Array} Array of message objects
     */
    static getMessages() {
        return StorageManager.load(this.STORAGE_KEY) || [];
    }

    /**
     * Adds a new message to storage
     * @param {string} type - Message type ('user' or 'bot')
     * @param {string} content - Message content
     * @returns {Object} The saved message object
     */
    static addMessage(type, content) {
        try {
            const messages = this.getMessages();
            const newMessage = {
                type,
                content,
                timestamp: new Date().toISOString(),
                id: crypto.randomUUID()
            };

            messages.push(newMessage);

            // Keep only the latest MAX_MESSAGES
            if (messages.length > this.MAX_MESSAGES) {
                messages.shift();
            }

            StorageManager.save(this.STORAGE_KEY, messages);
            return newMessage;
        } catch (error) {
            console.error('Failed to save message:', error);
            return null;
        }
    }

    /**
     * Clears all chat history
     */
    static clearHistory() {
        StorageManager.remove(this.STORAGE_KEY);
    }

    /**
     * Removes a specific message by ID
     * @param {string} messageId - ID of message to remove
     */
    static removeMessage(messageId) {
        try {
            const messages = this.getMessages();
            const filtered = messages.filter(msg => msg.id !== messageId);
            StorageManager.save(this.STORAGE_KEY, filtered);
        } catch (error) {
            console.error('Failed to remove message:', error);
        }
    }
}