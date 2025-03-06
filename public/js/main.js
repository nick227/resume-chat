import { utils } from './utils.js';
import { MessageHandler } from './handlers/MessageHandler.js';
import { InputHandler } from './handlers/InputHandler.js';
import { VoiceHandler } from './handlers/VoiceHandler.js';
import { ChatButtons } from './handlers/ChatButtons.js';
import { autoMessageLoader } from './services/AutoMessageLoader.js';
import { PanelHandler } from './handlers/PanelHandler.js';

const initializeChat = () => {
    try {
        utils.elements.clear();

        // Initialize core components
        MessageHandler.init();
        ChatButtons.init();
        PanelHandler.init();

        // Initialize input handler
        const input = new InputHandler();
        if (!input.isInitialized) {
            throw new Error('Failed to initialize InputHandler');
        }

        // Initialize voice handler
        new VoiceHandler();

        // Start auto messages
        autoMessageLoader.init({
            messages: [{
                type: 'AUTO',
                delay: 2,
                maxRuns: 17,
                startIndex: 0
            }, {
                type: 'RANDOM',
                delay: 5 * 60 * 1000,
                maxRuns: 1,
                startIndex: 0
            }]
        });

        // Cleanup on unload
        window.addEventListener('unload', () => {
            utils.elements.clear();
            autoMessageLoader.destroy();
        });

    } catch (error) {
        console.error('Initialization error:', error);
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