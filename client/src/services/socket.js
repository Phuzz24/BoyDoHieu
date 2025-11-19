// src/services/socket.js (Cập nhật env var cho local/prod)
import { io } from 'socket.io-client';

// Env var: Local localhost:5000, prod Render
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ['websocket', 'polling'],
  autoConnect: false  // Connect thủ công để tránh auto gọi sai URL prod
});

export default socket;