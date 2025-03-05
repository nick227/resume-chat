const WebSocket = require('ws');
const crypto = require('crypto');
const { AUTO_MESSAGES, SECTIONS } = require('./config/autoMessages');

class SocketServer {
    constructor(server) {
        this.wss = new WebSocket.Server({ server });
        this.clients = new Map(); // client -> sessionId
        this.messageQueue = this.prepareMessageQueue();
        this.initialize();
    }

    prepareMessageQueue() {
        // Track used messages to prevent duplicates
        const usedDelays = new Set();

        const queue = Object.entries(SECTIONS).flatMap(([sectionName, section]) => {
            return section.messages.map((messageKey, index) => {
                const delay = section.start + index * section.gap;
                const message = AUTO_MESSAGES.find(m => m.delay === delay);

                // Skip if message already used or not found
                if (!message || usedDelays.has(delay)) {
                    return null;
                }

                usedDelays.add(delay);
                return {
                    message,
                    delay: section.gap,
                    sectionName,
                    messageKey // Add for debugging
                };
            });
        }).filter(item => item !== null);

        return queue;
    }

    initialize() {
        this.wss.on('connection', ws => {
            const sessionId = `session-${crypto.randomUUID()}`;
            this.clients.set(ws, sessionId);

            this.startMessages(ws);

            ws.on('close', () => {
                this.clients.delete(ws);
            });
        });
    }

    async startMessages(ws) {
        for (const item of this.messageQueue) {
            if (!this.isClientConnected(ws)) break;

            await this.sendWithTyping(ws, item.message);
            await this.delay(item.delay);
        }
    }

    async sendWithTyping(ws, message) {
        if (!this.isClientConnected(ws)) return;

        ws.send(JSON.stringify({ type: 'typing' }));
        await this.delay(500);
        ws.send(JSON.stringify({ type: 'done_typing' }));

        ws.send(JSON.stringify({
            ...message,
            sessionId: this.clients.get(ws)
        }));
    }

    isClientConnected(ws) {
        return ws.readyState === WebSocket.OPEN && this.clients.has(ws);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Simplified API handler
    async handleApiRequest(sessionId) {
        return; // Currently disabled
    }
}

module.exports = SocketServer;