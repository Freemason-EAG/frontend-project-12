import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5002, // Vite слушает этот порт
    proxy: { // подменяем адрес, чтобы обойти CORS
      // Проксируем запрос к API
      '/api': { // если запрос начинается с /api
        target: 'http://localhost:5001', // отправляем на этот адрес
      },
      // Проксируем WebSocket соединения
      '/socket.io': {
        target: 'ws://localhost:5001',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
})
