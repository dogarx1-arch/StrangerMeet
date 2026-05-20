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
      credentials: true,
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 20000,
    pingInterval: 25000,
  })

  io.on('connection', (socket) => {
    let anonId

    do {
      anonId = generateAnonId()
    } while (sessionManager.isAnonIdActive(anonId))

    socket.data.anonId = anonId

    socket.emit('session:init', { anonId })

    sessionManager.incrementOnline()

    console.log(`[socket] connected ${socket.id} as ${anonId}`)

    io.emit(
      'stats:update',
      sessionManager.getStats(matchmaking.getWaitingCount())
    )

    socket.on('queue:join', (payload = {}) => {
      const finalAnonId = socket.data.anonId || payload.anonId

      console.log(`[queue:join] ${socket.id} / ${finalAnonId}`)

      matchmaking.joinQueue(socket, finalAnonId, io)

      io.emit(
        'stats:update',
        sessionManager.getStats(matchmaking.getWaitingCount())
      )
    })

    socket.on('queue:leave', () => {
      matchmaking.leaveQueue(socket)

      io.emit(
        'stats:update',
        sessionManager.getStats(matchmaking.getWaitingCount())
      )
    })

    handleChatEvents(socket, io)

    socket.on('disconnect', (reason) => {
      console.log(`[socket] disconnected ${socket.id}: ${reason}`)
      handleDisconnect(socket, io)
    })
  })

  setInterval(() => {
    matchmaking.tryPair(io)

    io.emit(
      'stats:update',
      sessionManager.getStats(matchmaking.getWaitingCount())
    )
  }, 1000)

  return io
}

module.exports = attachSocket
