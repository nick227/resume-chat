const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
//const SocketServer = require('./socketServer');

const app = express();
const server = http.createServer(app);

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Import routes array
const routes = require('./routes');

// Initialize WebSocket server
//const socketServer = new SocketServer(server);
/*
// Add socket server to route context
app.use((req, res, next) => {
    req.socketServer = socketServer;
    next();
});
*/
// Load routes dynamically
routes.forEach(route => {
    app[route.method.toLowerCase()](route.endpoint, async(req, res) => {
        try {
            // Basic parameter validation
            const params = route.params;
            if (params) {
                for (const [param, type] of Object.entries(params)) {
                    const value = req.query[param] || req.body[param];
                    if (value && typeof value !== type) {
                        throw new Error(`Invalid parameter type for ${param}. Expected ${type}`);
                    }
                }
            }

            // Call the route handler
            const result = await route.handler(req);
            res.json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    });
});

const PORT = process.env.PORT || 3001;

// Start HTTP server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});