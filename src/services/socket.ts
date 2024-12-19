import { io } from 'socket.io-client';
import { API_CONFIG } from '../config/api.config';

console.log('Initializing WebSocket connection to:', API_CONFIG.wsUrl);

export const socket = io(API_CONFIG.wsUrl, {
  autoConnect: false,
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  path: '/socket.io/',
  forceNew: true,
  timeout: 10000
});

class SocketService {
  private static instance: SocketService;
  private isConnecting: boolean = false;
  
  private constructor() {
    this.setupListeners();
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  private setupListeners(): void {
    socket.on('connect', () => {
      console.log('Connected to server with socket ID:', socket.id);
      this.isConnecting = false;
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      console.log('Current socket state:', {
        connected: socket.connected,
        disconnected: socket.disconnected,
        auth: socket.auth,
        id: socket.id
      });
      this.isConnecting = false;
    });

    socket.on('disconnect', (reason) => {
      console.log('Disconnected:', reason);
      this.isConnecting = false;
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    socket.on('reconnect_attempt', (attemptNumber) => {
      console.log('Attempting to reconnect:', attemptNumber);
    });

    socket.on('reconnect_failed', () => {
      console.error('Failed to reconnect after all attempts');
    });
  }

  public connect(playerId: string): void {
    if (this.isConnecting) {
      console.log('Already attempting to connect...');
      return;
    }

    if (socket.connected) {
      console.log('Socket is already connected');
      return;
    }

    console.log('Attempting to connect with playerId:', playerId);
    this.isConnecting = true;
    socket.auth = { playerId };
    
    try {
      socket.connect();
    } catch (error) {
      console.error('Error during connect:', error);
      this.isConnecting = false;
    }
  }

  public disconnect(): void {
    if (!socket.connected) {
      console.log('Socket is already disconnected');
      return;
    }

    console.log('Disconnecting socket...');
    socket.disconnect();
  }

  public isConnected(): boolean {
    return socket.connected;
  }

  public getSocketId(): string | null {
    return socket.connected ? socket.id : null;
  }
}

export const socketService = SocketService.getInstance();
export const connectSocket = (playerId: string) => socketService.connect(playerId);
export const disconnectSocket = () => socketService.disconnect();
export const isSocketConnected = () => socketService.isConnected();
export const getSocketId = () => socketService.getSocketId();