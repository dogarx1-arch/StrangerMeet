const sessionManager = require('./sessionManager')
const matchmaking = require('./matchmaking')

function handleChatEvents(socket, io) {
  socket.on('chat:message', ({ text, sessionId }) => {
    if (!text || !sessionId) return

    const session = sessionManager.getSession(sessionId)
    if (!session) return

    const isUserA = session.socketA.id === socket.id
    const partnerSocket = isUserA ? session.socketB : session.socketA
    const senderAnonId = isUserA ? session.anonA : session.anonB

    if (!partnerSocket.connected) return

    partnerSocket.emit('chat:message', {
      text,
      from: senderAnonId,
      time: Date.now(),
    })
  })

  socket.on('chat:typing', ({ sessionId }) => {
    if (!sessionId) return

    const session = sessionManager.getSession(sessionId)
    if (!session) return

    const partnerSocket =
      session.socketA.id === socket.id ? session.socketB : session.socketA

    if (partnerSocket.connected) {
      partnerSocket.emit('chat:typing')
    }
  })

  socket.on('chat:skip', ({ sessionId, requeue = false }) => {
    if (!sessionId) return

    const session = sessionManager.endSession(sessionId)
    if (!session) return

    const currentSocket = socket
    const partnerSocket =
      session.socketA.id === socket.id ? session.socketB : session.socketA

    if (partnerSocket.connected) {
      partnerSocket.emit('chat:skipped')
    }

    if (requeue && currentSocket.connected) {
      matchmaking.joinQueue(
        currentSocket,
        currentSocket.data?.anonId,
        io
      )
    }

    io.emit(
      'stats:update',
      sessionManager.getStats(matchmaking.getWaitingCount())
    )
  })

  socket.on('chat:report', ({ sessionId, reason }) => {
    console.log('[chat:report]', {
      socketId: socket.id,
      sessionId,
      reason,
    })
  })
}

function handleDisconnect(socket, io) {
  matchmaking.leaveQueue(socket)

  const sessionInfo = sessionManager.findSessionBySocketId(socket.id)

  if (sessionInfo) {
    const { sessionId, session } = sessionInfo

    sessionManager.endSession(sessionId)

    const partnerSocket =
      session.socketA.id === socket.id ? session.socketB : session.socketA

    if (partnerSocket.connected) {
      partnerSocket.emit('chat:partner-disconnected')
    }
  }

  sessionManager.decrementOnline()

  io.emit(
    'stats:update',
    sessionManager.getStats(matchmaking.getWaitingCount())
  )
}

module.exports = {
  handleChatEvents,
  handleDisconnect,
}
