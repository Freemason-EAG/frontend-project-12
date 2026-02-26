import { io } from 'socket.io-client'

const socket = io({ // не ставим 'http://localhost:5001' чтобы работал прокси в обход CORS
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 5,
    timeout: 10000,
})

export default socket