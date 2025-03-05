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

        // Setup message intervals
        const intervals = setupMessageIntervals();

        // Setup cleanup
        window.addEventListener('unload', () => {
            utils.elements.clear();
            autoMessageLoader.destroy();
            intervals.forEach(clearInterval);
        });

    } catch (error) {
        console.error('Initialization error:', error);
        if (MessageHandler.isInitialized) {
            MessageHandler.addMessage('bot', 'An error occurred while initializing the chat.', 'error');
        }
    }
};

const createMessageInterval = (config) => {
    const { type, startIndex = 0, maxIndex, delay, initialDelay = 0 } = config;
    let messageIndex = startIndex;

    // Initial message if needed
    if (initialDelay === 0) {
        loadMessage(type, messageIndex);
    }

    // Setup interval
    return setInterval(() => {
        if (messageIndex >= maxIndex) {
            clearInterval(interval);
            return;
        }
        loadMessage(type, messageIndex);
        messageIndex++;
    }, delay);
};

const loadMessage = (type, startIndex) => {
    autoMessageLoader.init({
        messages: [{
            type,
            delay: 0,
            maxRuns: 1,
            startIndex
        }]
    });
};

const setupMessageIntervals = () => {
    // Initial auto message
    loadMessage('AUTO', 0);

    // Setup intervals for different message types
    const intervals = [
        createMessageInterval({
            type: 'AUTO',
            startIndex: 2,
            maxIndex: 20,
            delay: 90 * 1000
        }),
        createMessageInterval({
            type: 'RANDOM',
            maxIndex: 6,
            delay: 2 * 60 * 1000 // 1.5 minutes
        }),
        createMessageInterval({
            type: 'RANDOM',
            maxIndex: 1,
            delay: 1.5 * 1000 // 1.5 minutes
        })
    ];

    return intervals;
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChat);
} else {
    initializeChat();
}