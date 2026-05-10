const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
  reportedAnonId: { type: String, required: true },
  reporterAnonId: { type: String, required: true },
  reason: { type: String, required: true },
  sessionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.models.Report || mongoose.model('Report', reportSchema)
