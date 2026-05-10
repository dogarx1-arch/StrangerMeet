/**
 * generateAnonId - Creates a unique "Anon#XXXX" identifier
 */
function generateAnonId() {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `Anon#${num}`
}

module.exports = generateAnonId
