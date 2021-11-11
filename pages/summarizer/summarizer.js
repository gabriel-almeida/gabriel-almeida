function tokenizer(sentence) {
  return sentence
    .split(/[\s,.!?;:([\]'"¡¿)/]+|[-'](?=[a-zA-Z])/)
    .filter((x) => x)
}

function normalize(text) {
  return text
    .normalize('NFD')
    /* eslint unicorn/escape-case: "off" */
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function segmentSentences(text) {
  return text.split(/\n|(?:[.?!]\s)/).filter((x) => x && x.match(/[A-Za-z]/))
}

function beginsWithUppercase(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .match(/^[A-Z]/)
}

function calculateFrequencies(tokens) {
  const result = {}
  tokens.forEach((token) => {
    if (!(token in result)) {
      result[token] = 0
    }
    result[token]++
  })
  return result
}

function sum(a, b) {
  return a + b
}

function sumFrequencies(obj1, obj2) {
  const result = { ...obj1 }
  Object.entries(obj2).forEach(
    (entry) =>
      (result[entry[0]] = result[entry[0]]
        ? result[entry[0]] + entry[1]
        : entry[1])
  )
  return result
}

function preproc(document) {
  const { sentences } = document
  const nSentences = sentences.length

  const tokens = sentences.map(tokenizer)

  const frequencies = tokens
    .map((toks) => toks.map(normalize))
    .map(calculateFrequencies)

  const sizes = tokens.map((toks) => toks.length)

  const avgSize = sizes.reduce(sum) / nSentences

  const globalFrequencies = frequencies.reduce(sumFrequencies)

  const documentFrequencies = calculateFrequencies(
    frequencies.flatMap((f) => Object.keys(f))
  )

  return {
    tokens,
    frequencies,
    documentFrequencies,
    globalFrequencies,
    sizes,
    avgSize,
    nSentences,
  }
}

function uppercaseCount(sentIdx, procData) {
  const toks = procData.tokens[sentIdx]
  return toks.length < 5
    ? 0
    : toks.filter(beginsWithUppercase).length / toks.length
}

function wordFrequency(sentIdx, procData) {
  return Object.keys(procData.frequencies[sentIdx])
    .map((tok) => procData.globalFrequencies[tok])
    .reduce(sum)
}

function bm25(sentIdx, procData) {
  const [k1, b] = [1.2, 0.75]
  const { frequencies, documentFrequencies, sizes, avgSize, nSentences } =
    procData
  const termFrequencies = frequencies[sentIdx]
  const sentSize = sizes[sentIdx]
  const scoreFn = (token) =>
    (Math.log(1 + nSentences / documentFrequencies[token]) *
      (termFrequencies[token] * (k1 + 1))) /
    (termFrequencies[token] + k1 * (1 - b + (b * sentSize) / avgSize))
  return Object.keys(termFrequencies).map(scoreFn).reduce(sum)
}

function normalizeScore(score, min, max) {
  return (score - min) / (max - min)
}

function scorer(document) {
  const procData = preproc(document)
  const scores = procData.frequencies.map((_, idx) => ({
    bm25: bm25(idx, procData),
    upper: uppercaseCount(idx, procData),
    freq: wordFrequency(idx, procData),
  }))
  const maxVals = scores.reduce((a, b) => ({
    bm25: Math.max(a.bm25, b.bm25),
    upper: Math.max(a.upper, b.upper),
    freq: Math.max(a.freq, b.freq),
  }))
  const minVals = scores.reduce((a, b) => ({
    bm25: Math.min(a.bm25, b.bm25),
    upper: Math.min(a.upper, b.upper),
    freq: Math.min(a.freq, b.freq),
  }))
  const normalizedScores = scores.map((score) => ({
    bm25: normalizeScore(score.bm25, minVals.bm25, maxVals.bm25),
    upper: 0*normalizeScore(score.upper, minVals.upper, maxVals.upper),
    freq: normalizeScore(score.freq, minVals.freq, maxVals.freq),
  }))
  return { ...document, ...procData, normalizedScores }
}

function summarize(text, targetSize) {
  if (!text || !text.trim()) {
      return "";
  }
  
  const doc = {
    sentences: segmentSentences(text),
  }
  const scores = scorer(doc)
  const result = Object.entries(scores.normalizedScores).map((entry) => [
    parseInt(entry[0]),
    doc.sentences[entry[0]],
    entry[1],
    Object.values(entry[1]).reduce((a, b) => a + b),
  ])
  result.sort((i, j) => i[3] - j[3])

  const finalSize = Math.trunc(scores.nSentences*targetSize)
  return result.slice(-finalSize).sort((i, j) => i[0] - j[0])
}

export default {
  summarize,
}
