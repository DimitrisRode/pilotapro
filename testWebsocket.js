import WebSocket from 'ws';
const ws = new WebSocket('ws://localhost:3001/socket.io/?EIO=4&transport=websocket');

ws.on('open', () => {
  console.log('WebSocket connection established');
  ws.close();
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});

ws.on('close', () => {
  console.log('WebSocket connection closed');
});