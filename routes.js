const chatController = require('./controllers/chatController');

const routes = [{
        endpoint: '/api/suggestions',
        method: 'GET',
        params: {
            q: 'string'
        },
        handler: async(req) => {
            return await chatController.getSuggestions(req.query.q);
        }
    },
    {
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
    }
];

module.exports = routes;