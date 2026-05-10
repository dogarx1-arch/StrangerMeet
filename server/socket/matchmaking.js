const sessionManager = require('./sessionManager')

class Matchmaking {
  constructor() {
    // Array of { socket, anonId }
    this.queue = []
    this.recentMatches = []
  }

  joinQueue(socket, anonId, io) {
    // Make sure user isn't already in queue
    const existingIndex = this.queue.findIndex(item => item.socket.id === socket.id)
    if (existingIndex === -1) {
      this.queue.push({ socket, anonId })
      socket.emit('queue:waiting', { position: this.queue.length })
      this.tryPair(io)
    }
  }

  leaveQueue(socket) {
    const index = this.queue.findIndex(item => item.socket.id === socket.id)
    if (index !== -1) {
      this.queue.splice(index, 1)
    }
  }

  tryPair(io) {
    if (this.queue.length >= 2) {
      // Dequeue first two
      const user1 = this.queue.shift()
      const user2 = this.queue.shift()

      // Create session
      const sessionId = sessionManager.createSession(
        user1.socket, user2.socket, user1.anonId, user2.anonId
      )

      // Emit queue:paired to both
      user1.socket.emit('queue:paired', { sessionId, partnerAnonId: user2.anonId })
      user2.socket.emit('queue:paired', { sessionId, partnerAnonId: user1.anonId })

      // Add to recent matches
      this.recentMatches.unshift({
        id1: user1.anonId,
        id2: user2.anonId,
        time: Date.now()
      })
      
      // Keep only last 3
      if (this.recentMatches.length > 3) {
        this.recentMatches.pop()
      }

      // Broadcast new matches to everyone
      io.emit('matches:recent', this.recentMatches)

      // Try to pair more if needed
      this.tryPair(io)
    }
  }

  getWaitingCount() {
    return this.queue.length
  }
}

module.exports = new Matchmaking()
