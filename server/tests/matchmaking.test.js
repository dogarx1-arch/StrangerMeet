
const matchmaking = require('../socket/matchmaking')
const sessionManager = require('../socket/sessionManager')

describe('Matchmaking Queue', () => {
  let mockIo
  let socketA
  let socketB
  let socketC

  beforeEach(() => {
    // Reset state
    matchmaking.queue = []
    matchmaking.recentMatches = []
    sessionManager.sessions.clear()

    mockIo = {
      emit: vi.fn()
    }

    socketA = { id: 'sock-a', emit: vi.fn() }
    socketB = { id: 'sock-b', emit: vi.fn() }
    socketC = { id: 'sock-c', emit: vi.fn() }
  })

  it('adds user to queue and emits waiting position', () => {
    matchmaking.joinQueue(socketA, 'Anon#1111', mockIo)
    expect(matchmaking.queue.length).toBe(1)
    expect(socketA.emit).toHaveBeenCalledWith('queue:waiting', { position: 1 })
  })

  it('pairs two users when queue has 2 users', () => {
    matchmaking.joinQueue(socketA, 'Anon#1111', mockIo)
    matchmaking.joinQueue(socketB, 'Anon#2222', mockIo)

    // Queue should be empty after pairing
    expect(matchmaking.queue.length).toBe(0)
    
    // Session should be created
    expect(sessionManager.sessions.size).toBe(1)
    
    // Both sockets should receive queue:paired
    expect(socketA.emit).toHaveBeenCalledWith('queue:paired', expect.any(Object))
    expect(socketB.emit).toHaveBeenCalledWith('queue:paired', expect.any(Object))

    // io should broadcast recent matches
    expect(mockIo.emit).toHaveBeenCalledWith('matches:recent', expect.any(Array))
  })

  it('allows user to leave the queue', () => {
    matchmaking.joinQueue(socketA, 'Anon#1111', mockIo)
    expect(matchmaking.queue.length).toBe(1)

    matchmaking.leaveQueue(socketA)
    expect(matchmaking.queue.length).toBe(0)
  })
})
