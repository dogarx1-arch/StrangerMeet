const MAX_MESSAGE_LENGTH = 1000
const URL_PATTERN = /https?:\/\/|www\./i
const PHONE_PATTERN = /\b\d{7,}\b/

const RATE_LIMIT_WINDOW_MS = 10_000
const RATE_LIMIT_MAX_MESSAGES = 20

const messageTimestamps = new Map()

function isRateLimited(socketId) {
  const now = Date.now()
  const timestamps = (messageTimestamps.get(socketId) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  )

  timestamps.push(now)
  messageTimestamps.set(socketId, timestamps)

  return timestamps.length > RATE_LIMIT_MAX_MESSAGES
}

function clearRateLimit(socketId) {
  messageTimestamps.delete(socketId)
}

function validateMessage(rawText, socketId) {
  if (typeof rawText !== 'string') {
    return { ok: false, reason: 'invalid_type' }
  }

  const text = rawText.trim().slice(0, MAX_MESSAGE_LENGTH)

  if (!text) {
    return { ok: false, reason: 'empty' }
  }

  if (isRateLimited(socketId)) {
    return { ok: false, reason: 'rate_limited' }
  }

  const looksLikeSpam = URL_PATTERN.test(text) || PHONE_PATTERN.test(text)

  return { ok: true, text, flagged: looksLikeSpam }
}

module.exports = {
  validateMessage,
  clearRateLimit,
  MAX_MESSAGE_LENGTH,
}
