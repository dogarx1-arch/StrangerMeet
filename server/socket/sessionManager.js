const sessionManager = require('./sessionManager')

class Matchmaking {
  constructor() {
    this.queue = []
    this.recentMatches = []
  }

  joinQueue(socket, anonId, io) {
    if (!socket || !socket.connected) {
      console.log('[matchmaking] ignored disconnected socket')
      return
    }

    const safeAnonId = anonId || socket.data?.anonId

    if (!safeAnonId) {
      socket.emit('queue:error', {
        message: 'Anon ID not ready. Please try again.',
      })
      console.log('[matchmaking] missing anonId for socket:', socket.id)
      return
    }

    const existingSession = sessionManager.findSessionBySocketId(socket.id)
    if (existingSession) {
      socket.emit('queue:error', {
        message: 'You are already in a chat session.',
      })
      return
    }

    this.removeDisconnectedSockets()

    const alreadyQueued = this.queue.some(
      (item) => item.socket.id === socket.id
    )

    if (!alreadyQueued) {
      this.queue.push({
        socket,
        anonId: safeAnonId,
        joinedAt: Date.now(),
      })

      console.log(`[matchmaking] joined queue: ${socket.id} / ${safeAnonId}`)
    }

    this.emitQueuePositions()
    this.tryPair(io)
  }

  leaveQueue(socket) {
    const before = this.queue.length

    this.queue = this.queue.filter(
      (item) => item.socket.id !== socket.id
    )

    if (before !== this.queue.length) {
      console.log('[matchmaking] left queue:', socket.id)
    }

    this.emitQueuePositions()
  }

  removeDisconnectedSockets() {
    const before = this.queue.length

    this.queue = this.queue.filter(
      (item) => item.socket && item.socket.connected
    )

    const removed = before - this.queue.length

    if (removed > 0) {
      console.log(`[matchmaking] removed ${removed} stale socket(s)`)
    }
  }

  emitQueuePositions() {
    this.queue.forEach((item, index) => {
      if (item.socket.connected) {
        item.socket.emit('queue:waiting', {
          position: index + 1,
          waitingCount: this.queue.length,
        })
      }
    })
  }

  tryPair(io) {
    this.removeDisconnectedSockets()

    while (this.queue.length >= 2) {
      const user1 = this.queue.shift()
      const user2 = this.queue.shift()

      if (!user1.socket.connected || !user2.socket.connected) {
        console.log('[matchmaking] skipped stale pair')
        continue
      }

      const sessionId = sessionManager.createSession(
        user1.socket,
        user2.socket,
        user1.anonId,
        user2.anonId
      )

      console.log(
        `[matchmaking] paired ${user1.anonId} with ${user2.anonId} in session ${sessionId}`
      )

      user1.socket.emit('queue:paired', {
        sessionId,
        partnerAnonId: user2.anonId,
      })

      user2.socket.emit('queue:paired', {
        sessionId,
        partnerAnonId: user1.anonId,
      })

      this.recentMatches.unshift({
        id1: user1.anonId,
        id2: user2.anonId,
        time: Date.now(),
      })

      if (this.recentMatches.length > 3) {
        this.recentMatches.pop()
      }

      io.emit('matches:recent', this.recentMatches)
      io.emit('stats:update', sessionManager.getStats(this.getWaitingCount()))
    }

    this.emitQueuePositions()
  }

  getWaitingCount() {
    this.removeDisconnectedSockets()
    return this.queue.length
  }
}

module.exports = new Matchmaking()
