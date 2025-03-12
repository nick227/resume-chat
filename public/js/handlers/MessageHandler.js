import { CONSTANTS } from '../constants.js';
import { utils } from '../utils.js';
import { RESPONSE_TYPES } from '../schema.js';
import { LoadingHandler } from './LoadingHandler.js';
import { scrollService } from '../services/ScrollService.js';
// Commented out for now, easy to re-enable later
// import { ChatStorageManager } from '../storage/ChatStorageManager.js';

/**
 * Handles chat message UI operations and rendering
 */
export class MessageHandler {
    static isInitialized = false;
    static container = null;
    static buttonSet = null;

    // ============= Message Templates =============
    static templates = {
        message: (text, isBot = false, type = RESPONSE_TYPES.TEXT) => `<div class="message ${isBot ? 'bot' : 'user'} ${type}">${isBot ? text : utils.sanitizeHTML(text)}${isBot && type === RESPONSE_TYPES.ERROR ? '<button class="retry-button"><span class="material-icons">refresh</span></button>' : ''}</div>`.trim()
    };

    // ============= Initialization =============
    static init() {
        this.container = document.getElementById('chat-messages');
        if (!this.container) {
            throw new Error('Chat messages container not found');
        }

        // Initialize scroll service
        scrollService.init('chat-messages');

        // Add loading indicator
        this.container.insertAdjacentHTML('beforeend', LoadingHandler.getLoadingHTML('AI is typing'));

        // Setup click handler
        this.container.addEventListener('click', this.handleMessageClick.bind(this));

        this.isInitialized = true;
    }

    // ============= Core Message Operations =============
    /**
     * Adds a message to the chat
     * @param {string} role - Message role ('user' or 'bot')
     * @param {string} content - Message content
     * @param {string} type - Response type (TEXT or ERROR)
     * @param {boolean} autoScroll - Whether to automatically scroll to the bottom
     */
    static async addMessage(role, content, type = RESPONSE_TYPES.TEXT, autoScroll = true, clearContainer = true) {
        if (!this.isInitialized) {
            throw new Error('MessageHandler not initialized');
        }

        if (!content) {
            console.warn('Empty message content');
            return;
        }

        const messageEl = this.createMessageElement(role, content.trim(), type);
        if (!messageEl) {
            console.error('Failed to create message element');
            return;
        }

        // Set scroll behavior before appending
        await this.appendMessage(messageEl, clearContainer);

        // Use current scroll settings
        if (autoScroll) {
            scrollService.scrollToBottom();
        }
    }

    // Helper function to extract the correct HTML chunk without breaking tags
    static extractHTMLChunk(content, start, end) {
        // Create a temporary container to hold the substring and parse it as HTML
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = content.substring(start, end);

        // Check for any broken tags, if any, adjust the range to avoid breaking
        const cleanedHTML = tempContainer.innerHTML; // this will fix any broken tags
        return cleanedHTML;
    }

    // Helper function to get all text nodes from an HTML document
    static getTextNodes(element) {
        const textNodes = [];
        const walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
        while (walk.nextNode()) {
            textNodes.push(walk.currentNode);
        }
        return textNodes;
    }

    /**
     * Validates message content
     */
    static validateMessage(content) {
        return content && typeof content === 'string' && content.trim().length > 0;
    }

    // ============= UI Operations =============
    /**
     * Creates a message DOM element
     */
    static createMessageElement(role, content, type) {
        try {
            const wrapper = document.createElement('div');
            wrapper.className = `message ${role}`;

            if (type === RESPONSE_TYPES.ERROR) {
                wrapper.classList.add('error');
            }

            wrapper.innerHTML = content;
            return wrapper;
        } catch (error) {
            console.error('Error creating message element:', error);
            return null;
        }
    }

    /**
     * Appends a message to the chat container
     */
    static async appendMessage(element, clearContainer) {
        if (!this.isInitialized || !element) {
            console.error('Cannot append message: Handler not initialized or invalid element');
            return;
        }

        // Insert before loading indicator if present
        const loadingIndicator = this.container.querySelector('.message-loading');
        if (clearContainer) {
            this.clearContainer();
        }
        if (loadingIndicator) {
            this.container.insertBefore(element, loadingIndicator);
        } else {
            this.container.appendChild(element);
        }
    }

    static clearContainer() {
        const messages = this.container.querySelectorAll('.message:not(.message-loading)');
        messages.forEach(message => message.remove());
    }

    /**
     * Toggles the loading indicator visibility
     */
    static toggleLoading(show) {
        if (!this.isInitialized) return;
        this.buttonSet = this.container.querySelector('.buttons-set');

        const loadingIndicator = this.container.querySelector('.message-loading');
        if (loadingIndicator) {
            this.buttonSet.style.display = show ? 'none' : 'flex';
            loadingIndicator.style.display = show ? 'flex' : 'none';
        }
    }

    /**
     * Scrolls the chat to the bottom
     */
    static scrollToBottom(container) {
        scrollService.scrollToBottom();
    }

    // ============= Event Handlers =============
    /**
     * Handles message click events
     */
    static handleMessageClick(event) {
        const retryButton = event.target.closest('.retry-button');
        if (!retryButton) return;

        const messageElement = retryButton.closest('.message');
        if (!messageElement) return;

        const messageText = messageElement.textContent;
        messageElement.remove();

        document.dispatchEvent(new CustomEvent('retryMessage', {
            detail: { message: messageText }
        }));
    }
}