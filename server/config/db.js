const mongoose = require('mongoose')
const { MONGODB_URI } = require('./env')

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('[db] MongoDB connected')
  } catch (err) {
    console.error('[db] MongoDB connection error:', err.message)
    // Don't exit — app can run without DB (reports won't work)
  }
}

module.exports = connectDB
