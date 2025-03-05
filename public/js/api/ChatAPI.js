import { CONSTANTS } from '../constants.js';
import { requestInterceptor } from '../services/RequestInterceptorService.js';
import { MessageHandler } from '../handlers/MessageHandler.js';

/**
 * Handles all chat API interactions
 */
export class ChatAPI {
    /**
     * Get the base URL for API requests
     */
    static get BASE_URL() {
        // Use window.location to get current origin
        const origin = window.location.origin;
        return `${origin}/api`;
    }

    /**
     * Validates API response structure
     * @param {Object} response - API response to validate
     * @returns {Object} Validated and formatted response
     * @throws {Error} If response is invalid
     */
    static validateResponse(response) {
        if (!response) {
            throw new Error('Empty response received');
        }

        // Check for error response format
        if (response.error) {
            return {
                success: false,
                message: response.error,
                options: [],
                buttons: []
            };
        }

        // Validate message field
        if (!response.message && response.message !== '') {
            throw new Error('Invalid response: missing message');
        }

        // Ensure consistent response format with separate handling
        return {
            success: true,
            message: response.message,
            options: Array.isArray(response.options) ? response.options : [],
            buttons: Array.isArray(response.buttons) ? response.buttons : [] // Keep buttons separate
        };
    }

    /**
     * Sends a message to the chat API
     * @param {string} message - Message to send
     * @returns {Promise<Object>} Formatted API response
     */
    static async sendMessage(message) {
        try {
            const response = await fetch(`${this.BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message.trim(),
                    userId: this.getUserId(),
                    sessionId: this.getSessionId()
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return this.validateResponse(data);

        } catch (error) {
            console.error('API Error:', error);
            return {
                success: false,
                message: CONSTANTS.MESSAGES.ERROR,
                options: [],
                buttons: []
            };
        }
    }

    /**
     * Gets the WebSocket session identifier
     * @private
     */
    static getSessionId() {
        const sessionId = localStorage.getItem('chatSessionId');
        if (!sessionId) {
            console.warn('No WebSocket session ID found');
            throw new Error('WebSocket session not established');
        }
        return sessionId;
    }

    /**
     * Gets or creates a user identifier
     * @private
     */
    static getUserId() {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = `user-${crypto.randomUUID()}`;
            localStorage.setItem('userId', userId);
        }
        return userId;
    }
}

// Add a listener for loading states
requestInterceptor.addListener((event, data) => {
    // Check if URL string contains '/api/chat'
    const urlString = data.url.toString();
    if (urlString.includes('/api/chat')) {
        switch (event) {
            case 'before':
                MessageHandler.toggleLoading(true);
                break;
            case 'after':
            case 'error':
                MessageHandler.toggleLoading(false);
                break;
        }
    }
});