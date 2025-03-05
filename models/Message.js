const db = require('../db');

class Message {
    static async getRecentHistory(userId, limit = 5) {
        try {
            if (!userId) throw new Error('User ID is required');
            const safeUserId = String(userId);

            // Use the limit directly in the query
            const query = `SELECT message, role FROM chat_messages 
                         WHERE user_id = ? 
                         ORDER BY created_at DESC 
                         LIMIT ${parseInt(limit, 10)}`;

            const [history] = await db.execute(query, [safeUserId]);
            return history.reverse();
        } catch (error) {
            console.error('Error getting chat history:', error);
            throw error;
        }
    }

    static async saveMessages(userMessage, aiMessage, userId, sessionId = 'default-session', completion) {
        // Validate required fields
        if (!userMessage) throw new Error('User message is required');
        if (!aiMessage) throw new Error('AI message is required');
        if (!userId) throw new Error('User ID is required');
        if (!completion.model) throw new Error('Model is required');
        if (!completion.usage.total_tokens) throw new Error('Tokens are required');

        const safeUserId = String(userId);
        const safeSessionId = String(sessionId);

        // Save user message
        await db.execute(
            'INSERT INTO chat_messages (user_id, session_id, message, role, model, tokens, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())', [safeUserId, safeSessionId, userMessage, 'user', completion.model, completion.usage.total_tokens]
        );

        // Save AI response
        await db.execute(
            'INSERT INTO chat_messages (user_id, session_id, message, role, model, tokens, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())', [safeUserId, safeSessionId, aiMessage, 'assistant', completion.model, completion.usage.total_tokens]
        );
    }

    static async saveMessage({ userId, message, role, model, tokens, sessionId }) {
        // Validate required fields
        if (!userId) throw new Error('User ID is required');
        if (!message) throw new Error('Message is required');
        if (!role) throw new Error('Role is required');
        if (!model) throw new Error('Model is required');
        if (!tokens) throw new Error('Tokens are required');
        if (!sessionId) throw new Error('Session ID is required');

        // Validate role enum
        const validRoles = ['user', 'assistant', 'system'];
        if (!validRoles.includes(role)) {
            throw new Error('Invalid role. Must be user, assistant, or system');
        }

        const safeTokens = parseInt(tokens, 10);
        if (isNaN(safeTokens)) throw new Error('Invalid token count');

        const safeUserId = String(userId);
        const safeSessionId = String(sessionId);
        const safeModel = String(model);

        return db.execute(
            'INSERT INTO chat_messages (user_id, message, role, created_at, model, tokens, session_id) VALUES (?, ?, ?, NOW(), ?, ?, ?)', [safeUserId, message, role, safeModel, safeTokens, safeSessionId]
        );
    }

    static async deleteMessage(messageId, userId) {
        if (!messageId) throw new Error('Message ID is required');
        if (!userId) throw new Error('User ID is required');

        const safeMessageId = parseInt(messageId, 10);
        if (isNaN(safeMessageId)) throw new Error('Invalid message ID');

        const safeUserId = String(userId);
        const [result] = await db.execute(
            'DELETE FROM chat_messages WHERE id = ? AND user_id = ?', [safeMessageId, safeUserId]
        );
        return result.affectedRows > 0;
    }

    static async getSessionHistory(sessionId, limit = 50) {
        if (!sessionId) throw new Error('Session ID is required');
        const safeLimit = parseInt(limit, 10);
        const safeSessionId = String(sessionId);
        const [history] = await db.execute(
            'SELECT * FROM chat_messages WHERE session_id = ? ORDER BY created_at ASC LIMIT ?', [safeSessionId, safeLimit]
        );
        return history;
    }
}

module.exports = Message;