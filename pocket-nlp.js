const nlp = require('compromise')
const { items } = require('./_data/pocket.json')

main()

async function main () {
  const last10 = items // .slice(0, 100)
  const topics = new Set()
  const nouns = new Set()
  const acronyms = new Set()

  for (const item of last10) {
    const doc = nlp(item.title)
    doc.normalize().acronyms().out('array').forEach(t => acronyms.add(t))
    doc.normalize().topics().out('array').forEach(t => topics.add(t))
    doc.normalize().nouns().out('array').forEach(t => nouns.add(t))
  }

  console.log(JSON.stringify({
    topics: [...topics],
    acronyms: [...acronyms],
    nouns: [...nouns]
  }, null, 2))
}
