function tokenizer(sentence) {
  return sentence
    .split(/[\s,.!?;:([\]'"¡¿)/]+|[-'](?=[a-zA-Z])/)
    .filter((x) => x && x.length > 2)
}

function normalize(text) {
  return (
    text
      .normalize('NFD')
      /* eslint unicorn/escape-case: "off" */
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  )
}

/* eslint no-unused-vars: "off" */
function ngrams(str, n) {
  if (str.length <= n) return [str]
  const result = []
  for (let i = 0; i < str.length - n + 1; i++) {
    result.push(str.substring(i, i + n))
  }
  return result
}

function segmentSentences(text) {
  // return text.split(/\n|(?:[.?!]\s)/).filter((x) => x && x.match(/[A-Za-z]/))
  return text.split(/\n/).filter((x) => x && x.match(/[A-Za-z]/))
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

  //   const frequencies = tokens
  //     .map((toks) => toks.map(normalize))
  //     .map(calculateFrequencies)

  const frequencies = sentences
    .map(normalize)
    .map((sent) => ngrams(sent, 5))
    .map(calculateFrequencies)

  const sizes = tokens.map((toks) => toks.length)

  const avgSize = sizes.reduce(sum, 0) / nSentences

  const globalFrequencies = frequencies.reduce(sumFrequencies, 0)

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
  const proportion = toks.filter(beginsWithUppercase).length / toks.length
  return toks.length < 5 || proportion > 0.9 ? 0 : proportion
}

function wordFrequency(sentIdx, procData) {
  return (
    Object.keys(procData.frequencies[sentIdx])
      .map((tok) => procData.globalFrequencies[tok])
      .reduce(sum, 0) / procData.sizes[sentIdx]
  )
}

// function positionCounter(sentIdx) {
//     return -sentIdx
// }

function bm25(sentIdx, procData) {
  //   const [k1, b] = [1.2, 0.75]
  const [k1, b] = [1.2, 1]
  const { frequencies, documentFrequencies, sizes, avgSize, nSentences } =
    procData
  const termFrequencies = frequencies[sentIdx]
  const sentSize = sizes[sentIdx]
  const scoreFn = (token) =>
    (Math.log(1 + nSentences / documentFrequencies[token]) *
      (termFrequencies[token] * (k1 + 1))) /
    (termFrequencies[token] + k1 * (1 - b + (b * sentSize) / avgSize))
  return Object.keys(termFrequencies).map(scoreFn).reduce(sum, 0)
}

function minMaxNormalization(score, min, max) {
  return (score - min) / (max - min)
}

function importanceRanking(arr) {
  // [9, 1, 4, 10] => [1, 3, 2, 0]
  const sorted = arr
    .map((item, idx) => [item, idx])
    .sort(([item1], [item2]) => item2 - item1)
  const result = []
  sorted.forEach(([, originalIdx], rank) => {
    result[originalIdx] = rank
  })
  return result
}

function groupByFirstElement(list) {
  const map = {}
  list.forEach(([key, val]) => {
    const collection = map[key]
    if (!collection) {
      map[key] = [val]
    } else {
      collection.push(val)
    }
  })
  return map
}
function scoresStatistics(scores) {
  const scoresByName = groupByFirstElement(scores.flatMap(Object.entries))
  const result = {}
  Object.keys(scoresByName).forEach((scoreName) => {
    result[scoreName] = {
      min: scoresByName[scoreName].reduce((a, b) => (a > b ? b : a)),
      max: scoresByName[scoreName].reduce((a, b) => (a < b ? b : a)),
    }
  })
  return result
}

function normalizeScore(score, stats) {
  const result = {}
  Object.keys(score).forEach((scoreName) => {
    result[scoreName] = minMaxNormalization(
      score[scoreName],
      stats[scoreName].min,
      stats[scoreName].max
    )
  })
  return result
}

function scorer(document) {
  const procData = preproc(document)
  const scores = procData.frequencies.map((_, idx) => ({
    bm25: bm25(idx, procData),
    upper: uppercaseCount(idx, procData),
    freq: wordFrequency(idx, procData),
    // position: positionCounter(idx)
  }))

  const stats = scoresStatistics(scores)
  const normalizedScores = scores.map((score) => normalizeScore(score, stats))
  const finalScores = normalizedScores.map((s) => Object.values(s).reduce(sum))
  const importanceRank = importanceRanking(finalScores)

  return {
    ...document,
    ...procData,
    normalizedScores,
    finalScores,
    importanceRank,
  }
}

function summarize(text) {
  if (!text || !text.trim()) {
    return
  }

  const doc = {
    sentences: segmentSentences(text),
  }
  //   if (!doc.sentences || doc.sentences.length < 2) {
  //       return
  //   }
  return scorer(doc)
}

export default {
  summarize,
}
