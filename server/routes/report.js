const express = require('express')
const router = express.Router()
const Report = require('../models/Report')

// Rate limit tracking: socketId -> { count, sessionId }
const reportLimits = new Map()

router.post('/', async (req, res) => {
  try {
    const { reportedAnonId, reporterAnonId, reason, sessionId } = req.body

    // Validate required fields
    if (!reportedAnonId || !reporterAnonId || !reason || !sessionId) {
      return res.status(400).json({ success: false, error: 'Missing required fields' })
    }

    // Rate limit: max 3 reports per reporter per session
    const key = `${reporterAnonId}:${sessionId}`
    const current = reportLimits.get(key) || 0
    if (current >= 3) {
      return res.status(429).json({ success: false, error: 'Report limit reached for this session' })
    }
    reportLimits.set(key, current + 1)

    // Save report
    const report = new Report({ reportedAnonId, reporterAnonId, reason, sessionId })
    await report.save()

    res.json({ success: true })
  } catch (err) {
    console.error('[report] Error:', err.message)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

module.exports = router
