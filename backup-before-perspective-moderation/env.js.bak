require('dotenv').config()

const validateEnv = () => {
  const required = ['PORT', 'MONGODB_URI', 'CLIENT_ORIGIN']
  const missing = required.filter(key => !process.env[key])
  if (missing.length > 0) {
    console.warn(`[env] Warning: Missing env vars: ${missing.join(', ')}. Using defaults.`)
  }
}

validateEnv()

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/strangermeet',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  NODE_ENV: process.env.NODE_ENV || 'development',
}
