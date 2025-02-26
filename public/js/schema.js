/**
 * API Schema Documentation
 * This file documents all API endpoints used by the chat interface
 */

export const API_SCHEMA = {
    // Chat API Endpoints
    chat: {
        sendMessage: {
            endpoint: '/api/chat',
            method: 'POST',
            request: {
                message: 'string', // User's message text
            },
            response: {
                success: 'boolean',
                message: 'string', // Bot's response text
                options: 'string[]', // Bot's response options
                error: 'string?' // Optional error message
            }
        }
    },

    // Voice API Endpoints (if server-side processing needed)
    voice: {
        processAudio: {
            endpoint: '/api/voice/process',
            method: 'POST',
            request: {
                audio: 'Blob', // Audio data
                format: 'string' // Audio format (e.g., 'wav', 'webm')
            },
            response: {
                success: 'boolean',
                text: 'string', // Transcribed text
                error: 'string?'
            }
        }
    },

    // Media Messages (if implementing media support)
    media: {
        upload: {
            endpoint: '/api/media/upload',
            method: 'POST',
            request: {
                file: 'File',
                type: 'string' // 'image' or 'video'
            },
            response: {
                success: 'boolean',
                url: 'string', // URL to uploaded media
                error: 'string?'
            }
        }
    },

    // Chat History (if implementing server-side history)
    history: {
        getHistory: {
            endpoint: '/api/history',
            method: 'GET',
            params: {
                limit: 'number?', // Optional limit of messages to retrieve
                before: 'string?' // Optional timestamp for pagination
            },
            response: {
                success: 'boolean',
                messages: [{
                    id: 'string',
                    type: 'string', // 'user' or 'bot'
                    content: 'string',
                    timestamp: 'string',
                    media: {
                        url: 'string?',
                        type: 'string?' // 'image' or 'video'
                    }
                }],
                error: 'string?'
            }
        },

        clearHistory: {
            endpoint: '/api/history/clear',
            method: 'POST',
            response: {
                success: 'boolean',
                error: 'string?'
            }
        }
    },

    // Error Response Schema (common across all endpoints)
    errorSchema: {
        success: false,
        error: 'string',
        code: 'number' // HTTP status code
    }
};

// Common HTTP Status Codes used
export const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
};

// API Response Types
export const RESPONSE_TYPES = {
    TEXT: 'text',
    MEDIA: 'media',
    SUGGESTION: 'suggestion',
    ERROR: 'error'
};

// Current API Version
export const API_VERSION = 'v1';

// Base API URL
export const API_BASE_URL = '/api';