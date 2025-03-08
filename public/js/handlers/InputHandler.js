import { CONSTANTS } from '../constants.js';
import { utils } from '../utils.js';
import { MessageHandler } from './MessageHandler.js';
import { ChatAPI } from '../api/ChatAPI.js';
import { ChatButtons } from './ChatButtons.js';
import { RESPONSE_TYPES } from '../constants.js';

/**
 * Handles chat input and message submission
 */
export class InputHandler {
    constructor() {
        this.isInitialized = false;
        this.inputElement = utils.elements.get(CONSTANTS.SELECTORS.chatInput);
        this.sendButton = utils.elements.get(CONSTANTS.SELECTORS.sendButton);

        if (!this.inputElement || !this.sendButton) {
            console.error('Required elements not found for InputHandler');
            return;
        }

        // Disabled for now
        this.setupEventListeners();
        this.isProcessing = false;
        this.isInitialized = true;
    }

    /**
     * Submits a chat message
     */
    async submitMessage(text) {
        if (!text.trim() || this.isProcessing) return;
        console.log('Submitting message:', text);

        try {
            this.isProcessing = true;
            this.updateUIState(true);
            MessageHandler.toggleLoading(true);

            // Force scroll on user message
            await MessageHandler.addMessage('user', text.trim(), RESPONSE_TYPES.TEXT, true);
            console.log('User message added');

            this.inputElement.value = '';

            // Get API response
            const response = await ChatAPI.sendMessage(text);

            // Always toggle loading off after getting response
            MessageHandler.toggleLoading(false);

            if (!response.success) {
                // Handle server errors more gracefully
                const userMessage = 'Sorry, I encountered an error processing your message. Please try again.';
                console.error('Server error:', response.message);
                throw new Error(userMessage);
            }

            // Handle empty but successful responses
            if (response.message || response.message === '') {
                await MessageHandler.addMessage('bot', response.message);
            }

            // Update chat buttons if available
            if (response.options) {
                ChatButtons.updateButtons(response.options);
            }

            // Update chat buttons if available
            if (response.buttons) {
                ChatButtons.insertButtons(response.buttons);
            }

        } catch (error) {
            console.error('Chat error:', error);
            await MessageHandler.addMessage('bot',
                error.message || CONSTANTS.MESSAGES.ERROR,
                RESPONSE_TYPES.ERROR
            );
            ChatButtons.clearButtons();
        } finally {
            MessageHandler.toggleLoading(false); // Ensure loading is off
            this.updateUIState(false);
            this.isProcessing = false;
        }
    }

    /**
     * Updates UI state during processing
     */
    updateUIState(processing) {
        this.inputElement.disabled = processing;
        this.sendButton.disabled = processing;
        // disable ALL buttons on page
        document.querySelectorAll('button').forEach(button => {
            button.disabled = processing;
        });
    }

    /**
     * Sets up event listeners
     */
    setupEventListeners() {
        // Create bound version of submitMessage for event listeners
        const submitHandler = () => {
            const text = this.inputElement.value.trim();
            if (text) {
                this.submitMessage(text);
            }
        };

        this.inputElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitHandler();
            }
        });

        this.sendButton.addEventListener('click', submitHandler);

        // Listen for chat button clicks
        document.addEventListener('chatButtonClick', async(e) => {
            console.log('ChatButtonClick received:', e.detail.text);

            this.inputElement.value = e.detail.text;
            this.inputElement.dispatchEvent(new Event('input'));
            this.inputElement.focus();

            try {
                // Wait for message to be submitted
                await this.submitMessage(e.detail.text);
            } catch (error) {
                console.error('Error submitting message:', error);
            }
        });
    }
}