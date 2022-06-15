<template>
  <div>
    <template v-for="part in questionParts">
      <span v-if="part.type === 'text'" :key="part.id">
        {{ part.content }}
      </span>
      <template v-if="part.type === 'select' && showAnswer">
        <span
          v-if="answers[part.id].given === null"
          :key="'blank_' + part.id"
          class="font-bold text-red-500 line-through"
        >
          (em branco)
        </span>
        <span
          v-if="answers[part.id].given !== null"
          :key="'given_' + part.id"
          :class="{
            'text-green-500': answers[part.id].correct,
            'text-red-500 line-through': !answers[part.id].correct,
          }"
          class="font-bold"
        >
          {{ answers[part.id].given }}
        </span>
        <span
          v-if="!answers[part.id].correct"
          :key="'correct_' + part.id"
          class="font-bold underline text-blue-500"
        >
          {{ answers[part.id].corrects.join(' ou ') }}
        </span>
      </template>
      <select
        v-if="part.type === 'select' && !showAnswer"
        :key="part.id"
        class="select select-primary select-sm ml-1 mr-1 text-neutral-content"
        @change="changeAnswers($event, part)"
      >
        <option
          disabled
          :selected="answers[part.id].given === null"
          :value="null"
        >
          Selecione
        </option>
        <option
          v-for="(option, optionIdx) in part.options"
          :key="optionIdx"
          :value="option"
          :selected="option === answers[part.id].given"
        >
          {{ option }}
        </option>
      </select>
    </template>
  </div>
</template>
<script>
const BLANK_REGEXP = /{{(\w+)}}/g

export default {
  props: {
    currentQuestion: { type: Object, default: () => ({}) },
    showAnswer: { type: Boolean, default: false },
  },
  data() {
    return {
      answers: {},
      questionParts: [],
    }
  },
  computed: {},
  watch: {
    currentQuestion() {
      this.initQuestion()
    },
  },
  mounted() {
    this.initQuestion()
  },
  methods: {
    initQuestion() {
      this.questionParts = []
      this.answers = {}

      const { content } = this.currentQuestion
      if (content == null) return

      // parseia o conteudo, quebrando entre elementos 'text' e 'select'
      const matches = [...content.matchAll(BLANK_REGEXP)]
      let lastIdx = 0

      for (const match of matches) {
        const text = content.substring(lastIdx, match.index)
        const id = match[1]

        if (text.length > 0)
          this.questionParts.push({ type: 'text', content: text })

        const questionOptions = this.currentQuestion.options[id] || []
        const options = questionOptions.map((o) => o.text).sort()

        const corrects = questionOptions
          .filter((o) => o.correct)
          .map((o) => o.text)

        this.questionParts.push({ type: 'select', options, id })
        this.answers[id] = { corrects, given: null, correct: false }

        lastIdx = match.index + match[0].length
      }

      if (lastIdx < content.length) {
        const text = content.substring(lastIdx)
        this.questionParts.push({ type: 'text', content: text })
      }
    },
    changeAnswers(event, part) {
      const given = event.target.value
      const answer = this.answers[part.id]
      const correct = answer.corrects.includes(given)

      this.answers[part.id].correct = correct
      this.answers[part.id].given = given

      this.$emit('input', { ...this.answers })
    },
  },
}
</script>