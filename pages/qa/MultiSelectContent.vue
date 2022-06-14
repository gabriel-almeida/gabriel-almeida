<template>
  <div>
    <template v-for="part in questionParts">
      <span v-if="part.type === 'text'" :key="part.id">
        {{ part.content }}
      </span>
      <template v-if="part.type === 'select' && showAnswer">
        <span
          :key="part.id"
          :class="{
            'text-green-500': evaluation[part.id].correct,
            'text-red-500 line-through': !evaluation[part.id].correct,
          }"
          class="font-bold"
        >
          {{ evaluation[part.id].given }}
        </span>
        <span
          v-if="!evaluation[part.id].correct"
          :key="part.id"
          class="font-bold underline text-green-500"
        >
          {{ evaluation[part.id].allowed.join(' ou ') }}
        </span>
      </template>
      <select
        v-if="part.type === 'select' && !showAnswer"
        :key="part.id"
        class="select select-primary select-sm ml-1 mr-1 text-neutral-content"
        @change="changeAnswers($event, part)"
      >
        <option disabled :selected="!answers[part.id]" :value="null">
          Selecione
        </option>
        <option
          v-for="(option, optionIdx) in part.options"
          :key="optionIdx"
          :value="option"
          :selected="option === answers[part.id]"
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
      evaluation: {},
    }
  },
  computed: {
    questionParts() {
      const { content } = this.currentQuestion
      if (content == null) return []

      // parseia o conteudo, quebrando entre elementos 'text' e 'select'
      const matches = [...content.matchAll(BLANK_REGEXP)]
      const parts = []
      let lastIdx = 0

      for (const match of matches) {
        const text = content.substring(lastIdx, match.index)
        const id = match[1]

        if (text.length > 0) parts.push({ type: 'text', content: text })

        const questionOptions = this.currentQuestion.options[id] || []
        const options = questionOptions.map((o) => o.text).sort()
        const allowed = questionOptions
          .filter((o) => o.correct)
          .map((o) => o.text)

        parts.push({ type: 'select', options, id, allowed })

        lastIdx = match.index + match[0].length
      }

      if (lastIdx < content.length) {
        const text = content.substring(lastIdx)
        parts.push({ type: 'text', content: text })
      }

      return parts
    },
  },
  watch: {
    currentQuestion() {
      this.answers = {}
    },
    showAnswer() {
      this.makeEvaluation()
    },
  },
  methods: {
    changeAnswers(event, part) {
      this.answers[part.id] = event.target.value
      this.$emit('input', { ...this.answers })
    },
    makeEvaluation() {
      const pairs = this.questionParts
        .filter((part) => part.type === 'select')
        .map((part) => [part.id, this.evaluate(part)])

      this.evaluation = Object.fromEntries(pairs)
    },
    evaluate(part) {
      const given = this.answers[part.id]
      const allowed = part.allowed
      const correct = allowed.includes(given)
      return { given, allowed, correct }
    },
  },
}
</script>