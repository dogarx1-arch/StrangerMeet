const env = require('../config/env')

const PERSPECTIVE_URL =
  'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze'

const ATTRIBUTES = {
  TOXICITY: {},
  SEVERE_TOXICITY: {},
  SEXUALLY_EXPLICIT: {},
  THREAT: {},
}

const BLOCK_THRESHOLDS = {
  TOXICITY: 0.85,
  SEVERE_TOXICITY: 0.8,
  SEXUALLY_EXPLICIT: 0.75,
  THREAT: 0.8,
}

let warnedMissingKey = false

async function moderateMessage(text) {
  if (!env.PERSPECTIVE_API_KEY) {
    if (!warnedMissingKey) {
      console.warn(
        '[moderation] PERSPECTIVE_API_KEY not set — messages are NOT being screened.'
      )
      warnedMissingKey = true
    }
    return { blocked: false }
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)

    const response = await fetch(
      `${PERSPECTIVE_URL}?key=${env.PERSPECTIVE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          comment: { text },
          languages: ['en'],
          requestedAttributes: ATTRIBUTES,
          doNotStore: true,
        }),
      }
    )

    clearTimeout(timeout)

    if (!response.ok) {
      console.error('[moderation] Perspective API error:', response.status)
      return { blocked: false }
    }

    const data = await response.json()
    const scores = {}
    let blockedOn = null

    for (const attribute of Object.keys(ATTRIBUTES)) {
      const score =
        data.attributeScores?.[attribute]?.summaryScore?.value ?? 0

      scores[attribute] = score

      if (score >= BLOCK_THRESHOLDS[attribute] && !blockedOn) {
        blockedOn = attribute
      }
    }

    return {
      blocked: Boolean(blockedOn),
      reason: blockedOn,
      scores,
    }
  } catch (err) {
    console.error('[moderation] request failed:', err.message)
    return { blocked: false }
  }
}

module.exports = { moderateMessage }
