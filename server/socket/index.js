const { Server } = require('socket.io')
const env = require('../config/env')
const sessionManager = require('./sessionManager')
const matchmaking = require('./matchmaking')
const { handleChatEvents, handleDisconnect } = require('./chatHandler')
const generateAnonId = require('../utils/anonId')

function attachSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: env.CLIENT_ORIGIN,
      methods: ['GET', 'POST'],
      credentials: true
    }
  })

  io.on('connection', (socket) => {
    // Generate unique anonId
    let anonId
    do {
      anonId = generateAnonId()
    } while (sessionManager.isAnonIdActive(anonId))

    // Send init event to assign anonId to client
    socket.emit('session:init', { anonId })

    // Increment online count
    sessionManager.incrementOnline()
    io.emit('stats:update', sessionManager.getStats(matchmaking.getWaitingCount()))

    // Matchmaking events
    socket.on('queue:join', ({ anonId }) => {
      matchmaking.joinQueue(socket, anonId, io)
      io.emit('stats:update', sessionManager.getStats(matchmaking.getWaitingCount()))
    })

    socket.on('queue:leave', () => {
      matchmaking.leaveQueue(socket)
      io.emit('stats:update', sessionManager.getStats(matchmaking.getWaitingCount()))
    })

    // Bind chat events
    handleChatEvents(socket, io)

    // Disconnect event
    socket.on('disconnect', () => {
      handleDisconnect(socket, io)
    })
  })

  // Broadcast stats every 5 seconds
  setInterval(() => {
    io.emit('stats:update', sessionManager.getStats(matchmaking.getWaitingCount()))
  }, 5000)

  return io
}

module.exports = attachSocket
