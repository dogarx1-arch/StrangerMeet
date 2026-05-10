const express = require('express')
const router = express.Router()
const sessionManager = require('../socket/sessionManager')

router.get('/', (req, res) => {
  const stats = sessionManager.getStats()
  res.json(stats)
})

module.exports = router
