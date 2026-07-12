const sessionManager = require('./sessionManager')
const matchmaking = require('./matchmaking')
const { validateMessage, clearRateLimit } = require('../utils/messageFilter')
const { moderateMessage } = require('../utils/moderation')

function handleChatEvents(socket, io) {
  socket.on('chat:message', async ({ text, sessionId }) => {
    if (!sessionId) return

    const result = validateMessage(text, socket.id)
    if (!result.ok) return

    const session = sessionManager.getSession(sessionId)
    if (!session) return

    const isUserA = session.socketA.id === socket.id
    const partnerSocket = isUserA ? session.socketB : session.socketA
    const senderAnonId = isUserA ? session.anonA : session.anonB

    if (!partnerSocket.connected) return

    if (result.flagged) {
      console.log('[chat:message] flagged spam pattern', {
        socketId: socket.id,
        sessionId,
      })
    }

    const moderation = await moderateMessage(result.text)

    if (moderation.blocked) {
      console.log('[chat:message] blocked by moderation', {
        socketId: socket.id,
        sessionId,
        reason: moderation.reason,
      })

      socket.emit('chat:message-blocked', {
        reason: 'Your message was blocked for violating our community guidelines.',
      })

      return
    }

    const stillActive = sessionManager.getSession(sessionId)
    if (!stillActive || !partnerSocket.connected) return

    partnerSocket.emit('chat:message', {
      text: result.text,
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
      partnerSocket.emit('chat:skipped', { reason: 'Chat ended. The stranger skipped the chat.' })
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
    if (!sessionId) return

    console.log('[chat:report]', {
      socketId: socket.id,
      sessionId,
      reason,
    })

    const session = sessionManager.endSession(sessionId)
    if (!session) return

    const partnerSocket =
      session.socketA.id === socket.id ? session.socketB : session.socketA

    if (partnerSocket.connected) {
      partnerSocket.emit('chat:partner-disconnected', {
        reason: 'Chat ended. The stranger has left the chat.'
      })
    }

    io.emit(
      'stats:update',
      sessionManager.getStats(matchmaking.getWaitingCount())
    )
  })
}

function handleDisconnect(socket, io) {
  clearRateLimit(socket.id)
  matchmaking.leaveQueue(socket)

  const sessionInfo = sessionManager.findSessionBySocketId(socket.id)

  if (sessionInfo) {
    const { sessionId, session } = sessionInfo

    sessionManager.endSession(sessionId)

    const partnerSocket =
      session.socketA.id === socket.id ? session.socketB : session.socketA

    if (partnerSocket.connected) {
      partnerSocket.emit('chat:partner-disconnected', { reason: 'Chat ended. The stranger disconnected.' })
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
