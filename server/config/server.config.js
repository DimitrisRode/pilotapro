export const SERVER_CONFIG = {
  port: process.env.PORT || 3001,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  },
  socket: {
    transports: ['websocket'],
    pingTimeout: 60000,
    pingInterval: 25000
  }
};