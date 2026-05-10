
const generateAnonId = require('../utils/anonId')

describe('anonId Generator', () => {
  it('generates an ID matching the format Anon#XXXX', () => {
    const id = generateAnonId()
    expect(id).toMatch(/^Anon#\d{4}$/)
  })

  it('generates random IDs (not always the same)', () => {
    const id1 = generateAnonId()
    const id2 = generateAnonId()
    
    // There is a 1 in 10000 chance they are the same, but for tests this is fine
    // Or we just test multiple
    const ids = new Set()
    for (let i = 0; i < 100; i++) {
      ids.add(generateAnonId())
    }
    expect(ids.size).toBeGreaterThan(1)
  })
})
