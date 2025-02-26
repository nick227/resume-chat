const WebSocket = require('ws');
const crypto = require('crypto');
const AUTO_MESSAGES = require('./config/autoMessages');

class SocketServer {
    constructor(server) {
        this.wss = new WebSocket.Server({ server });
        this.clients = new Set();
        this.clientStates = new Map(); // Single map for all client state
        this.autoMessages = AUTO_MESSAGES;

        this.initialize();
        process.on('SIGTERM', () => this.cleanup());
        process.on('SIGINT', () => this.cleanup());
    }

    generateSessionId() {
        // Match the format used by the HTTP client
        return `session-${crypto.randomUUID()}`;
    }

    initClientState(ws) {
        const state = {
            timers: new Map(), // Map of delay -> timer
            triggeredMessages: new Set(), // Track which messages have fired
        };
        this.clientStates.set(ws.sessionId, state);
        return state;
    }

    initialize() {
        this.wss.on('connection', async(ws) => {
            console.log('New client connected');
            this.clients.add(ws);
            ws.sessionId = this.generateSessionId();
            const state = this.initClientState(ws);

            await this.startAutoBroadcast(ws, state);

            ws.on('message', data => this.handleClientMessage(ws, data));
            ws.on('close', () => this.handleClientDisconnect(ws));
        });
    }

    async sendMessage(ws, message, showTyping = true) {
        try {
            if (showTyping) {
                await this.sendWithDelay(ws, { type: 'typing' }, 0);
                await this.sendWithDelay(ws, { type: 'done_typing' }, 500);
            }
            await this.sendWithDelay(ws, {
                ...message,
                sessionId: ws.sessionId
            }, 200);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    async startAutoBroadcast(ws, state) {
        console.log(`Starting broadcast for client: ${ws.sessionId}`);

        // Clear existing timers
        for (const timer of state.timers.values()) {
            clearTimeout(timer);
        }
        state.timers.clear();

        // Sort messages by delay and add minimum gap
        const MIN_GAP = 200;
        const sortedMessages = [...this.autoMessages]
            .map(msg => ({...msg })) // Clone messages
            .sort((a, b) => a.delay - b.delay)
            .map((msg, i, arr) => {
                if (i > 0 && msg.delay - arr[i - 1].delay < MIN_GAP) {
                    msg.delay = arr[i - 1].delay + MIN_GAP;
                }
                return msg;
            });

        // Start new timers for untriggered messages
        sortedMessages.forEach((message, index) => {
            if (state.triggeredMessages.has(index)) return;

            const timer = setTimeout(async() => {
                state.triggeredMessages.add(index);
                state.timers.delete(index);
                await this.sendMessage(ws, message);
            }, message.delay);

            state.timers.set(index, timer);
        });
    }

    async sendWithDelay(ws, data, delay) {
        await new Promise(resolve => setTimeout(resolve, delay));
        if (ws.readyState === WebSocket.OPEN) {
            this.sendToClient(ws, data);
        }
    }

    broadcast(data) {
        this.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                this.sendToClient(client, {
                    ...data,
                    sessionId: client.sessionId
                });
            }
        });
    }

    sendToClient(client, data) {
        try {
            client.send(JSON.stringify(data));
        } catch (error) {
            console.error('Error sending message to client:', error);
        }
    }

    async resetClientMessages(ws, state) {
        console.log(`Resetting messages for client: ${ws.sessionId}`);

        // Clear all pending timers
        for (const [delay, timer] of state.timers) {
            clearTimeout(timer);
            console.log(`Cleared timer for message at delay ${delay}`);
        }
        state.timers.clear();

        // Start new timers for remaining messages
        await this.startAutoBroadcast(ws, state);
    }

    handleClientDisconnect(ws) {
        console.log(`Client disconnected: ${ws.sessionId}`);
        const state = this.clientStates.get(ws.sessionId);
        if (state) {
            // Clear any pending timers
            for (const timer of state.timers.values()) {
                clearTimeout(timer);
            }
            this.clientStates.delete(ws.sessionId);
        }
        this.clients.delete(ws);
    }

    cleanup() {
        try {
            for (const [sessionId, state] of this.clientStates) {
                console.log(`Cleaning up client: ${sessionId}`);
                for (const timer of state.timers.values()) {
                    clearTimeout(timer);
                }
            }
            this.clientStates.clear();
            this.wss.close();
        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    }

    async handleClientMessage(ws, data) {
        try {
            const message = JSON.parse(data);
            const state = this.clientStates.get(ws.sessionId);

            await this.resetClientMessages(ws, state);
        } catch (error) {
            console.error('Error handling message:', error);
        }
    }

    // Handle HTTP API requests
    async handleApiRequest(sessionId) {
        console.log(`Received API request for session: ${sessionId}`);
        let found = false;

        for (const client of this.clients) {
            console.log(`Checking client session: ${client.sessionId}`);
            if (client.sessionId === sessionId) {
                found = true;
                const state = this.clientStates.get(sessionId);
                if (state) {
                    console.log(`Found client state with ${state.timers.size} active timers`);
                    // Just restart auto broadcast - it handles filtering internally
                    await this.startAutoBroadcast(client, state);
                } else {
                    console.log(`No state found for session: ${sessionId}`);
                }
                break;
            }
        }

        if (!found) {
            console.log(`No client found for session: ${sessionId}`);
        }
    }
}

module.exports = SocketServer;