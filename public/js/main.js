import { utils } from './utils.js';
import { MessageHandler } from './handlers/MessageHandler.js';
import { InputHandler } from './handlers/InputHandler.js';
import { VoiceHandler } from './handlers/VoiceHandler.js';
import { ChatButtons } from './handlers/ChatButtons.js';
import { autoMessageLoader } from './services/AutoMessageLoader.js';
import { PanelHandler } from './handlers/PanelHandler.js';
import { ImageHandler } from './handlers/ImageHandler.js';
import { NavigationHandler } from './handlers/NavigationHandler.js';
import { setupQr } from './handlers/setupQr.js';
import { setupAvatar } from './handlers/setupAvatar.js';

const initializeChat = () => {
    try {
        utils.elements.clear();

        // Initialize core components
        MessageHandler.init();
        ChatButtons.init();
        PanelHandler.init();
        ImageHandler.init();
        NavigationHandler.init();

        // Initialize setup handlers
        setupQr();
        setupAvatar();

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
                startDelay: 0,
                delay: 0,
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