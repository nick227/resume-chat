import { CONSTANTS } from '../constants.js';
import { MessageHandler } from './MessageHandler.js';
import { ChatButtons } from './ChatButtons.js';
import { utils } from '../utils.js';
import { scrollService } from '../services/ScrollService.js';

/**
 * Handles WebSocket connections and real-time messages
 */
export class SocketHandler {
    static RECONNECT_INTERVAL = 3000;
    static MAX_RECONNECT_ATTEMPTS = 5;

    constructor() {
        this.socket = null;
        this.reconnectAttempts = 0;
        this.isConnecting = false;
        this.wsUrl = null;
        this.init();
    }

    init() {
        try {
            this.wsUrl = `ws://${window.location.hostname}:3001`; // Explicitly set WebSocket port
            this.connect();
        } catch (error) {
            console.error('Socket initialization error:', error);
        }
    }

    /**
     * Establishes WebSocket connection
     */
    connect() {
        if (this.isConnecting || (this.socket && this.socket.readyState === WebSocket.OPEN)) {
            return;
        }

        try {
            this.isConnecting = true;
            this.socket = new WebSocket(this.wsUrl);
            this.setupEventListeners();
        } catch (error) {
            console.error('Socket connection error:', error);
            this.handleConnectionFailure();
        }
    }

    /**
     * Sets up WebSocket event listeners
     */
    setupEventListeners() {
        if (!this.socket) return;

        this.socket.addEventListener('open', () => {
            this.reconnectAttempts = 0;
            this.isConnecting = false;
        });

        this.socket.addEventListener('message', async(event) => {
            try {
                const data = JSON.parse(event.data);
                // Store session ID when received
                if (data.sessionId) {
                    localStorage.setItem('chatSessionId', data.sessionId);
                }
                await this.handleMessage(data);
            } catch (error) {
                console.error('Error handling socket message:', error);
            }
        });

        this.socket.addEventListener('close', () => {
            this.handleConnectionFailure();
        });

        this.socket.addEventListener('error', (error) => {
            console.error('Socket error:', error);
            this.handleConnectionFailure();
        });
    }

    /**
     * Handles incoming socket messages
     */
    async handleMessage(data) {
        if (!data) return;

        // Handle different message types
        if (data.type === 'chat') {
            try {
                // Display the message
                await MessageHandler.addMessage('bot', data.message);

                // Use scroll service
                scrollService.scrollToBottom();

                // Update chat buttons if options are available
                if (Array.isArray(data.options)) {
                    ChatButtons.updateButtons(data.options);
                } else {
                    ChatButtons.clearButtons();
                }
            } catch (error) {
                console.error('Error handling socket message:', error);
            }
        } else if (data.type === 'status') {
            console.log('Status update:', data.message);
        }

        // Dispatch event for other handlers
        document.dispatchEvent(new CustomEvent('socketMessage', {
            detail: data
        }));
    }

    /**
     * Handles reconnection attempts
     */
    handleConnectionFailure() {
        this.isConnecting = false;

        if (this.reconnectAttempts >= SocketHandler.MAX_RECONNECT_ATTEMPTS) {
            console.error('Max reconnection attempts reached');
            return;
        }

        this.reconnectAttempts++;
        console.log('Attempting to reconnect...');

        setTimeout(() => {
            this.connect();
        }, SocketHandler.RECONNECT_INTERVAL);
    }

    /**
     * Sends a message to the WebSocket server
     */
    send(message) {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            console.error('Socket is not connected');
            return false;
        }

        try {
            this.socket.send(JSON.stringify(message));
            return true;
        } catch (error) {
            console.error('Error sending message:', error);
            return false;
        }
    }

    /**
     * Closes the socket connection
     */
    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}