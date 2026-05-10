const sessionManager = require('./sessionManager')
const matchmaking = require('./matchmaking')

function handleChatEvents(socket, io) {
  // Sending a message
  socket.on('chat:message', ({ text, sessionId }) => {
    const session = sessionManager.getSession(sessionId)
    if (!session) return

    // Determine partner
    const isUserA = session.socketA.id === socket.id
    const partnerSocket = isUserA ? session.socketB : session.socketA
    const senderAnonId = isUserA ? session.anonA : session.anonB

    partnerSocket.emit('chat:message', {
      text,
      from: senderAnonId,
      time: Date.now()
    })
  })

  // Typing indicator
  socket.on('chat:typing', ({ sessionId }) => {
    const session = sessionManager.getSession(sessionId)
    if (!session) return

    const partnerSocket = session.socketA.id === socket.id ? session.socketB : session.socketA
    partnerSocket.emit('chat:typing')
  })

  // Skip partner
  socket.on('chat:skip', ({ sessionId }) => {
    const session = sessionManager.endSession(sessionId)
    if (session) {
      const partnerSocket = session.socketA.id === socket.id ? session.socketB : session.socketA
      partnerSocket.emit('chat:skipped')
      
      // Broadcast updated stats immediately
      io.emit('stats:update', sessionManager.getStats(matchmaking.getWaitingCount()))
    }
  })

  // Report handled via REST API, but event might be fired depending on client implementation
  socket.on('chat:report', ({ sessionId, reason }) => {
    // Optional: Can just rely on REST API instead as defined in the prompt.
    // If the frontend emits it via socket as a fallback:
    // ...
  })
}

function handleDisconnect(socket, io) {
  // Leave queue if in it
  matchmaking.leaveQueue(socket)

  // End session if in one
  const sessionInfo = sessionManager.findSessionBySocketId(socket.id)
  if (sessionInfo) {
    const { sessionId, session } = sessionInfo
    sessionManager.endSession(sessionId)
    
    // Notify partner
    const partnerSocket = session.socketA.id === socket.id ? session.socketB : session.socketA
    partnerSocket.emit('chat:skipped')
  }

  // Update overall online count
  sessionManager.decrementOnline()
  io.emit('stats:update', sessionManager.getStats(matchmaking.getWaitingCount()))
}

module.exports = {
  handleChatEvents,
  handleDisconnect
}
