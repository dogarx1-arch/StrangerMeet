const express = require('express')
const router = express.Router()
const sessionManager = require('../socket/sessionManager')
const matchmaking = require('../socket/matchmaking')

router.get('/', (req, res) => {
  const stats = sessionManager.getStats(matchmaking.getWaitingCount())
  res.json(stats)
})

module.exports = router
