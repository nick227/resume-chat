import { utils } from './utils.js';
import { MessageHandler } from './handlers/MessageHandler.js';
import { InputHandler } from './handlers/InputHandler.js';
import { VoiceHandler } from './handlers/VoiceHandler.js';
import { ChatButtons } from './handlers/ChatButtons.js';
import { SocketHandler } from './handlers/SocketHandler.js';
import { autoMessageLoader } from './services/AutoMessageLoader.js';

const initializeChat = () => {
    try {
        utils.elements.clear();

        // Initialize core components first
        MessageHandler.init();
        ChatButtons.init();

        // Initialize handlers that depend on UI elements
        const input = new InputHandler();
        if (!input.isInitialized) {
            throw new Error('Failed to initialize InputHandler: Required elements not found');
        }

        // Initialize optional components
        new VoiceHandler();
        //new SocketHandler();

        // Initialize auto message loader with custom configuration

        autoMessageLoader.init({
            messages: [{
                type: 'AUTO',
                delay: 0,
                maxRuns: 1,
                startIndex: 0
            }]
        });
        let messageIndex = 1;
        const messageInterval = setInterval(() => {
            if (messageIndex >= 2) {
                clearInterval(messageInterval);
                return;
            }

            autoMessageLoader.init({
                messages: [{
                    type: 'AUTO',
                    delay: 0,
                    maxRuns: 1,
                    startIndex: messageIndex
                }]
            });
            messageIndex++;
        }, 20);

        // Setup cleanup
        window.addEventListener('unload', () => {
            utils.elements.clear();
            autoMessageLoader.destroy();
            clearInterval(messageInterval);
        });

    } catch (error) {
        console.error('Initialization error:', error);
        // Show error in chat if MessageHandler was initialized
        if (MessageHandler.isInitialized) {
            MessageHandler.addMessage('bot', 'An error occurred while initializing the chat.', 'error');
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChat);
} else {
    initializeChat();
}