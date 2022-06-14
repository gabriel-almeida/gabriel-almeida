<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <div class="container mx-auto min-h-full flex-grow">
      <div class="flex flex-row flex-wrap py-4">
        <div class="w-full px-2">
          <div class="sticky top-0 p-4 w-full">
            <!-- navigation -->
            <answer-feedback :combo="combo" :text="feedbackText" />
            <comment-card
              v-if="currentStatus === false"
              :current-question="currentQuestion"
            />
            <div
              class="card w-auto shadow-xl bg-neutral text-neutral-content mb-2"
            >
              <div class="card-body">
                <text-content
                  v-if="currentQuestion.type === 'boolean'"
                  :current-question="currentQuestion"
                />
                <multi-select-content
                  v-if="currentQuestion.type === 'multiselect'"
                  :current-question="currentQuestion"
                  :show-answer="showAnswer"
                  @input="inputMultiSelect"
                />
                {{currentAnswer}}
                <a class="btn bg-yellow-500" @click="showAnswer = !showAnswer">Toggle</a>
                <div class="card-actions justify-end">
                  <template v-if="currentQuestion && currentStatus === null">
                    <a class="btn bg-green-500" @click="answer(true)">Certo</a>
                    <a class="btn bg-red-500" @click="answer(false)">Errado</a>
                  </template>
                  <a
                    v-if="temProxima"
                    class="btn bg-gray-500"
                    @click="nextQuestion()"
                  >
                    Próxima
                  </a>
                </div>
                <div>
                  <span class="text-green-200 inline-block"
                    >Corretas: {{ correct }}
                  </span>
                  <span class="text-red-400 inline-block">
                    Erradas: {{ wrong }}
                  </span>
                  <span class="inline-block">
                    Faltam: {{ questionOrder.length }}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <a class="underline cursor-pointer" @click="reset()">RESET</a>
              <excel-upload @input="getQuestions" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>
<script>
import AnswerFeedback from './AnswerFeedback.vue'
import CommentCard from './CommentCard.vue'
import ExcelUpload from './ExcelUpload.vue'
import TextContent from './TextContent.vue'
import MultiSelectContent from './MultiSelectContent.vue'

export default {
  components: {
    ExcelUpload,
    CommentCard,
    AnswerFeedback,
    TextContent,
    MultiSelectContent,
  },
  data() {
    return {
      questions: [
        { content: 'Questao 1', expected: true, type: 'boolean' },
        {
          content: 'Questao 2 - Lorem {{slot1}} dolor {{slot2}} amet.',
          type: 'multiselect',
          options: {
            slot1: [
              { text: 'ipsum', correct: true },
              { text: 'consectetur' },
              { text: 'vivamus' },
            ],
            slot2: [
              { text: 'sit', correct: true },
              { text: 'adipiscing' },
              { text: 'elit' },
            ],
          },
        },
        // { content: 'Questao 3', expected: true },
        // { content: 'Questao 4', expected: false },
        // { content: 'Questao 5', expected: true },
        // { content: 'Questao 6', expected: false },
        // { content: 'Questao 7', expected: true },
        // { content: 'Questao 8', expected: false },
      ],
      correct: 0,
      wrong: 0,
      combo: 0,
      currentPosition: 0,
      questionOrder: [],
      currentStatus: null,
      currentQuestion: null,
      currentAnswer: null,
      showAnswer: false
    }
  },
  computed: {
    temProxima() {
      return this.questionOrder.length > 1
    },
    feedbackText() {
      if (this.currentStatus === null) return null
      return this.currentStatus ? 'Correto!' : 'Errado!'
    },
  },
  created() {
    this.reset()
  },
  methods: {
    reset() {
      this.correct = 0
      this.wrong = 0
      this.combo = 0
      this.currentPosition = 0
      this.currentStatus = null
      this.createOrder()
      this.updateQuestion()
    },
    nextQuestion() {
      if (!this.questionOrder) return

      if (this.currentStatus != null) {
        this.currentStatus = null
        this.questionOrder.splice(this.currentPosition, 1)
      } else {
        this.currentPosition += 1
      }

      this.currentPosition %= this.questionOrder.length
      this.updateQuestion()
    },
    answer(response) {
      const result = response === this.currentQuestion.expected
      if (result) {
        this.correct += 1
        this.currentStatus = true
        this.combo += 1
      } else {
        this.currentStatus = false
        this.wrong += 1
        this.combo = 0
      }

      return result
    },
    inputMultiSelect(answer) {
        this.currentAnswer = answer
    },
    updateQuestion() {
      if (!this.questionOrder) {
        this.currentQuestion = null
      } else {
        this.currentQuestion =
          this.questions[this.questionOrder[this.currentPosition]]
      }
    },
    getQuestions(data) {
      this.questions = data
      this.reset()
    },
    createOrder() {
      this.questionOrder = this.shuffle(this.questions.map((_, i) => i))
    },
    shuffle(array) {
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
    },
  },
}
</script>
