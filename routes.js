const chatController = require('./controllers/chatController');

const routes = [{
    endpoint: '/api/chat',
    method: 'POST',
    params: {
        message: 'string',
        userId: 'string',
        sessionId: 'string'
    },
    handler: async(req) => {
        const { message, userId, sessionId } = req.body;
        // Pass req to the controller method
        return await chatController.sendChatMessage(message, userId, sessionId, req);
    }
}, {
    endpoint: '/api/chat/random',
    method: 'GET',
    params: {},
    handler: async(req) => {
        const { userId, sessionId } = req.body;
        return await chatController.getRandomMessage(userId, sessionId, req);
    }
}, {
    endpoint: '/api/chat/auto',
    method: 'GET',
    params: {},
    handler: async(req) => {
        const userId = req.query.userId;
        const sessionId = req.query.sessionId;
        const startIndex = parseInt(req.query.startIndex) || 0;
        return await chatController.getAutoMessage(userId, sessionId, startIndex, req);
    }
}];

module.exports = routes;