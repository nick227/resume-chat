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
    // ============= Message Templates =============
    static templates = {
        message: (text, isBot = false, type = RESPONSE_TYPES.TEXT) => `<div class="message ${isBot ? 'bot' : 'user'} ${type}">${isBot ? text : utils.sanitizeHTML(text)}${isBot && type === RESPONSE_TYPES.ERROR ? '<button class="retry-button"><span class="material-icons">refresh</span></button>' : ''}</div>`.trim()
    };

    // ============= Initialization =============
    static init() {
        const container = utils.elements.get(CONSTANTS.SELECTORS.chatMessages);
        if (!container) return;

        // Initialize scroll service
        scrollService.init('chat-messages');

        // Add permanent loading indicator using shared LoadingHandler
        container.insertAdjacentHTML('beforeend', LoadingHandler.getLoadingHTML('AI is typing'));

        container.addEventListener('click', this.handleMessageClick.bind(this));
    }

    // ============= Core Message Operations =============
    /**
     * Adds a message to the chat
     * @param {string} type - Message type ('user' or 'bot')
     * @param {string} content - Message content
     * @param {string} responseType - Response type (TEXT or ERROR)
     */
    static async addMessage(type, content, responseType = RESPONSE_TYPES.TEXT) {
        if (!this.validateMessage(content)) return;
        await this.renderMessage(type, content.trim(), responseType);
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

    /**
     * Renders a message in the chat
     */
    static async renderMessage(type, content, responseType) {
        try {
            const element = this.createMessageElement(content, type !== 'user', responseType);
            if (!element) return;
            this.appendMessage(element);
        } catch (error) {
            console.error('Error rendering message:', error);
        }
    }

    // ============= UI Operations =============
    /**
     * Creates a message DOM element
     */
    static createMessageElement(content, isBot, type) {
        try {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = this.templates.message(content, isBot, type);
            return wrapper.firstElementChild;
        } catch (error) {
            console.error('Error creating message element:', error);
            return null;
        }
    }

    /**
     * Appends a message to the chat container
     */
    static appendMessage(element) {
        const container = utils.elements.get(CONSTANTS.SELECTORS.chatMessages);
        if (!container || !element) return;

        const loadingIndicator = container.querySelector('.message-loading');
        if (loadingIndicator) {
            container.insertBefore(element, loadingIndicator);
        } else {
            container.appendChild(element);
        }

        // Scroll to the new message
        this.scrollToBottom(container);
    }

    /**
     * Toggles the loading indicator visibility
     */
    static toggleLoading(show) {
        const loadingIndicator = document.querySelector('.message-loading');
        if (loadingIndicator) {
            loadingIndicator.style.display = show ? 'flex' : 'none';
            if (show) this.scrollToBottom(loadingIndicator.parentElement);
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