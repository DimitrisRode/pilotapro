const isDevelopment = import.meta.env.DEV;
const protocol = window.location.protocol;
const wsProtocol = protocol === 'https:' ? 'wss:' : 'ws:';

export const API_CONFIG = {
  baseUrl: isDevelopment ? 'http://localhost:3001' : '',
  wsUrl: isDevelopment 
    ? `${wsProtocol}//localhost:3001`
    : `${wsProtocol}//${window.location.host}`,
};

console.log('API Configuration:', {
  ...API_CONFIG,
  currentProtocol: protocol,
  wsProtocol: wsProtocol
});