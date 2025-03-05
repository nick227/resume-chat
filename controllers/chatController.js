const Message = require('../models/Message');
const OpenAIService = require('../services/OpenAIService');

const chatController = {
    async getRandomMessage(userId, sessionId, req) {
        try {
            if (!sessionId) {
                sessionId = 'default-session';
                console.warn('No sessionId provided, using default');
            }

            const { message: aiMessage, options: aiOptions, completion } =
            await OpenAIService.getRandomFact();

            // Reset socket messages for this session
            if (req.socketServer) {
                await req.socketServer.handleApiRequest(sessionId);
            }

            return {
                success: true,
                message: aiMessage,
                options: aiOptions,
                sessionId
            };
        } catch (error) {
            console.error('Chat error:', error);
            return {
                success: false,
                error: error.message,
                options: []
            };
        }
    },

    async getAutoMessage(userId, sessionId, startIndex = 0, req) {
        try {
            if (!sessionId) {
                sessionId = 'default-session';
                console.warn('No sessionId provided, using default');
            }
            startIndex = parseInt(startIndex) || 0;

            const message = await OpenAIService.getMessageByIndex(startIndex);
            if (!message) {
                throw new Error('No message found');
            }

            return {
                success: true,
                message: message.message,
                options: message.options || [],
                buttons: message.buttons || [],
                sessionId
            };

        } catch (error) {
            console.error('Chat error:', error);
            return {
                success: false,
                error: error.message,
                options: [],
                buttons: []
            };
        }
    },

    // Save a new message
    async saveMessage(message, userId) {
        try {
            const [result] = await db.execute(
                'INSERT INTO chat_messages (user_id, message, created_at) VALUES (?, ?, NOW())', [userId, message]
            );
            return {
                success: true,
                messageId: result.insertId,
                error: null
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    },

    // Get chat history
    async getChatHistory(limit = 50, offset = 0) {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM chat_messages ORDER BY created_at DESC LIMIT ? OFFSET ?', [limit, offset]
            );
            return {
                success: true,
                messages: rows,
                error: null
            };
        } catch (error) {
            return {
                success: false,
                messages: [],
                error: error.message
            };
        }
    },

    // Delete a message
    async deleteMessage(messageId, userId) {
        try {
            const success = await Message.deleteMessage(messageId, userId);
            return {
                success,
                error: null
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    },

    // Send a chat message
    async sendChatMessage(message, userId, sessionId, req) {
        try {
            if (!sessionId) {
                sessionId = 'default-session'; // Provide default if missing
                console.warn('No sessionId provided, using default');
            }

            const history = await Message.getRecentHistory(userId);

            const { message: aiMessage, options: aiOptions, completion } =
            await OpenAIService.generateResponse(message, history);

            // Reset socket messages for this session
            if (req.socketServer) {
                await req.socketServer.handleApiRequest(sessionId);
            }

            // Save conversation asynchronously
            await Message.saveMessages(message, aiMessage, userId, sessionId, completion)
                .catch(err => console.error('Error saving chat history:', err));

            return {
                success: true,
                message: aiMessage,
                options: aiOptions,
                sessionId
            };
        } catch (error) {
            console.error('Chat error:', error);
            return {
                success: false,
                error: error.message,
                options: [
                    'Can you try rephrasing that?',
                    'Let me help you with something else',
                    'Would you like to start over?'
                ]
            };
        }
    }
};

module.exports = chatController;