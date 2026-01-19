export const CONSTANTS = {
    SELECTORS: {
        chatMessages: '#chat-messages',
        chatInput: '#chat-input',
        sendButton: '#send-button',
        chatButtonsContainer: '.buttons-set[data-button-rail="true"]',
        chatButtons: '.chat-button',
        micButton: '.chat-microphone',
        avatarContainer: '.avatar',
        elevenLabsConvai: 'elevenlabs-convai',
        avatarDropdown: '.avatar-dropdown'
    },
    MESSAGES: {
        ERROR: 'Sorry, there was an error processing your message.',
        VOICE_ERROR: 'Voice recognition is not supported in your browser. Please try a browser like Chrome, Edge, or Safari for voice features. However voice assistant will work!'
    },
    CLASSES: {
        LISTENING: 'listening',
        LOADING: 'message-loading'
    },
    // Disabled for now
    // STORAGE_KEYS: {
    //     CHAT_HISTORY: 'chatHistory'
    // },
    // MAX_HISTORY: 50,
    TYPING_DELAY: 1000,
    VOICE_TIMEOUT: 10000,
    API: {
        CHAT_ENDPOINT: '/api/chat'
    },
    MESSAGE_LENGTH_LIMIT: 100
};

export const RESPONSE_TYPES = {
    TEXT: 'text',
    ERROR: 'error'
};
