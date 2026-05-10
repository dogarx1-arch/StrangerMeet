import request from 'supertest'
import express from 'express'
import reportRoute from '../routes/report.js'
import Report from '../models/Report.js'

vi.spyOn(Report.prototype, 'save').mockResolvedValue()

const app = express()
app.use(express.json())
app.use('/api/report', reportRoute)

describe('POST /api/report', () => {
  it('fails if required fields are missing', async () => {
    const res = await request(app).post('/api/report').send({
      reportedAnonId: 'Anon#1111'
    })
    
    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
  })

  it('saves report successfully if valid', async () => {
    const res = await request(app).post('/api/report').send({
      reportedAnonId: 'Anon#1111',
      reporterAnonId: 'Anon#2222',
      reason: 'spam',
      sessionId: 'test-session-123'
    })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
  })

  it('rate limits after 3 reports per session', async () => {
    const payload = {
      reportedAnonId: 'Anon#1111',
      reporterAnonId: 'Anon#RateLimit',
      reason: 'spam',
      sessionId: 'test-session-limit'
    }

    // 3 allowed
    await request(app).post('/api/report').send(payload)
    await request(app).post('/api/report').send(payload)
    const res3 = await request(app).post('/api/report').send(payload)
    expect(res3.status).toBe(200)

    // 4th blocked
    const res4 = await request(app).post('/api/report').send(payload)
    expect(res4.status).toBe(429)
    expect(res4.body.success).toBe(false)
  })
})
