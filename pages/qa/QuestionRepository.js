import * as questionsJson from './questions.json'

function shuffle(array) {
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = array.length

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      const randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }
    return array
}

function sampleNonAdjacents(array, n) {
    const indexes = array.map((_, i) => i)
    const shuffled = shuffle(indexes)
    const used = new Set()
    const result = new Set()

    for (const i of shuffled) {
        if (used.has(i - 1) || used.has(i + 1)) {
            continue
        }
        used.add(i)
        result.add(array[i])
        if (result.size === n) break
    }
    return result
}

function repopulate(question, n) {
  const slots = Object.keys(question.options)
  const nSlots = Math.min(slots.length, n)
  const selectedSlots = sampleNonAdjacents(slots, nSlots)
  const options = {}
  let content = question.content

  for (const slot of slots) {
    const selected = question.options[slot]

    if (selectedSlots.has(slot)) {
      options[slot] = selected
    } else {
      const correct = selected.find((opt) => opt.correct)
      content = content.replace(`{{${slot}}}`, correct.text)
    }
  }
  return { type: question.type, options, content }
}

function getQuestions() {
  const questions = questionsJson.default
  return questions.map(q => repopulate(q, 2))
}

export default { getQuestions }
