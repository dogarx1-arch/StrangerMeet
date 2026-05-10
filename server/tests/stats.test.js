
const request = require('supertest')
const express = require('express')
const statsRoute = require('../routes/stats')
const sessionManager = require('../socket/sessionManager')

const app = express()
app.use('/api/stats', statsRoute)

describe('GET /api/stats', () => {
  it('returns current stats shape', async () => {
    // We expect it to call sessionManager.getStats()
    const res = await request(app).get('/api/stats')
    
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('onlineCount')
    expect(res.body).toHaveProperty('inChatCount')
    expect(res.body).toHaveProperty('waitingCount')
    expect(res.body).toHaveProperty('totalSessions')
  })
})
