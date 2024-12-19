import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { setupSocketHandlers } from './handlers/socketHandlers.js';
import { setupCors } from './middleware/cors.middleware.js';
import { healthRoutes } from './routes/health.routes.js';
import { SERVER_CONFIG } from './config/server.config.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { testRoutes } from './routes/test.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);

// Setup middleware
setupCors(app);

// Setup routes
app.use('/api', healthRoutes);
app.use('/api', testRoutes);

// Setup Socket.IO with explicit configuration
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true
  },
  transports: ['websocket'],
  path: '/socket.io/',
  pingTimeout: 60000,
  pingInterval: 25000,
  allowEIO3: true // Enable Engine.IO v3 compatibility
});

// Add connection logging
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

setupSocketHandlers(io);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist');
  app.use(express.static(distPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

server.listen(SERVER_CONFIG.port, () => {
  console.log(`Server running on port ${SERVER_CONFIG.port}`);
});