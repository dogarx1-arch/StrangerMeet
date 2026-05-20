const { v4: uuidv4 } = require('uuid')

class SessionManager {
  constructor() {
    this.sessions = new Map()
    this.onlineCount = 0
  }

  createSession(socketA, socketB, anonA, anonB) {
    const sessionId = uuidv4()

    this.sessions.set(sessionId, {
      socketA,
      socketB,
      anonA,
      anonB,
      startTime: Date.now(),
    })

    return sessionId
  }

  getSession(sessionId) {
    return this.sessions.get(sessionId)
  }

  endSession(sessionId) {
    const session = this.sessions.get(sessionId)

    if (session) {
      this.sessions.delete(sessionId)
    }

    return session
  }

  incrementOnline() {
    this.onlineCount += 1
  }

  decrementOnline() {
    if (this.onlineCount > 0) {
      this.onlineCount -= 1
    }
  }

  getStats(waitingCount = 0) {
    return {
      onlineCount: this.onlineCount,
      inChatCount: this.sessions.size * 2,
      waitingCount,
      totalSessions: this.sessions.size,
    }
  }

  isAnonIdActive(anonId) {
    for (const session of this.sessions.values()) {
      if (session.anonA === anonId || session.anonB === anonId) {
        return true
      }
    }

    return false
  }

  findSessionBySocketId(socketId) {
    for (const [sessionId, session] of this.sessions.entries()) {
      if (
        session.socketA.id === socketId ||
        session.socketB.id === socketId
      ) {
        return {
          sessionId,
          session,
        }
      }
    }

    return null
  }
}

module.exports = new SessionManager()
