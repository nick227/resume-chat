const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const dotenv = require('dotenv');
const expressStaticGzip = require('express-static-gzip');
dotenv.config();
//const SocketServer = require('./socketServer');

const app = express();
const server = http.createServer(app);

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Import API routes
const apiRoutes = require('./routes');

// Initialize WebSocket server
//const socketServer = new SocketServer(server);
/*
// Add socket server to route context
app.use((req, res, next) => {
    req.socketServer = socketServer;
    next();
});
*/
app.use('/api', apiRoutes);

const distPath = path.join(__dirname, 'dist');

const setStaticHeaders = (res, filePath) => {
    const normalizedPath = filePath.replace(/\\/g, '/');
    const sourcePath = normalizedPath.replace(/\.br$|\.gz$/, '');
    const relativePath = path.relative(distPath, sourcePath).replace(/\\/g, '/');

    res.setHeader('Vary', 'Accept-Encoding');

    if (relativePath.endsWith('.woff2')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        res.setHeader('Access-Control-Allow-Origin', '*');
        return;
    }

    if (relativePath.startsWith('assets/')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        return;
    }
};

app.use('/', expressStaticGzip(distPath, {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
    index: false,
    setHeaders: setStaticHeaders
}));

app.get('*', (_, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 3001;

// Start HTTP server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});