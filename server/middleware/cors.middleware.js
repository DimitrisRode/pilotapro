import cors from 'cors';
import { SERVER_CONFIG } from '../config/server.config.js';

export const setupCors = (app) => {
  app.use(cors(SERVER_CONFIG.cors));
};