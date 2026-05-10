
const sessionManager = require('../socket/sessionManager')

describe('Session Manager', () => {
  let socketA
  let socketB

  beforeEach(() => {
    sessionManager.sessions.clear()
    sessionManager.onlineCount = 0
    socketA = { id: 'sock-a' }
    socketB = { id: 'sock-b' }
  })

  it('creates a session successfully', () => {
    const sessionId = sessionManager.createSession(socketA, socketB, 'Anon#1111', 'Anon#2222')
    
    expect(sessionId).toBeDefined()
    expect(sessionManager.sessions.size).toBe(1)
    
    const session = sessionManager.getSession(sessionId)
    expect(session.anonA).toBe('Anon#1111')
    expect(session.anonB).toBe('Anon#2222')
  })

  it('ends a session successfully', () => {
    const sessionId = sessionManager.createSession(socketA, socketB, 'Anon#1111', 'Anon#2222')
    const ended = sessionManager.endSession(sessionId)

    expect(ended).toBeDefined()
    expect(sessionManager.sessions.size).toBe(0)
  })

  it('returns correct stats', () => {
    sessionManager.incrementOnline()
    sessionManager.incrementOnline()
    sessionManager.createSession(socketA, socketB, 'Anon#1111', 'Anon#2222')

    const stats = sessionManager.getStats(5) // 5 waiting
    expect(stats.onlineCount).toBe(2)
    expect(stats.inChatCount).toBe(2)
    expect(stats.waitingCount).toBe(5)
    expect(stats.totalSessions).toBe(1)
  })
})
