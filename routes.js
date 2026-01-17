const express = require('express');
const chatController = require('./controllers/chatController');

const router = express.Router();

const validateParams = (req, params) => {
    if (!params) {
        return;
    }

    for (const [param, type] of Object.entries(params)) {
        const value = req.query[param] || req.body[param];
        if (value && typeof value !== type) {
            throw new Error(`Invalid parameter type for ${param}. Expected ${type}`);
        }
    }
};

router.post('/chat', async(req, res) => {
    try {
        validateParams(req, {
            message: 'string',
            userId: 'string',
            sessionId: 'string'
        });
        const { message, userId, sessionId } = req.body;
        const result = await chatController.sendChatMessage(message, userId, sessionId, req);
        res.json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

router.get('/chat/random', async(req, res) => {
    try {
        validateParams(req, {});
        const { userId, sessionId } = req.body;
        const result = await chatController.getRandomMessage(userId, sessionId, req);
        res.json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

router.get('/chat/auto', async(req, res) => {
    try {
        validateParams(req, {});
        const userId = req.query.userId;
        const sessionId = req.query.sessionId;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const result = await chatController.getAutoMessage(userId, sessionId, startIndex, req);
        res.json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;