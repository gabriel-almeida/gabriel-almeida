<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <div class="container mx-auto min-h-full">
      <div class="flex flex-row flex-wrap py-4">
        <div class="w-full md:w-1/4 px-2">
          <div class="sticky top-0 p-4 w-full">
            <!-- navigation -->
            <div
              class="alert shadow-lg mb-2"
              :class="{
                'alert-error': !currentStatus,
                'alert-success': currentStatus,
                invisible: currentStatus === null,
              }"
            >
              <span>{{ this.currentStatus ? 'Correto!' : 'Errado!' }}</span>
            </div>
            <div class="card w-96 shadow-xl bg-neutral text-neutral-content">
              <div class="card-body">
                <p v-if="this.currentQuestion">
                  {{ this.currentQuestion.content }}
                </p>
                <div class="card-actions justify-end">
                  <span v-if="currentQuestion && currentStatus === null">
                    <a @click="answer(true)" class="btn bg-green-500">Certo</a>
                    <a @click="answer(false)" class="btn bg-red-500">Errado</a>
                  </span>
                  <a
                    @click="nextQuestion()"
                    v-if="temProxima"
                    class="btn bg-gray-500"
                  >
                    Próxima
                  </a>
                </div>
                <div>
                  {{ correct }} / {{ answered }} (Faltam
                  {{ this.questionOrder.length }})
                </div>
              </div>
            </div>
            <div>
              <a @click="reset()" class="underline cursor-pointer">RESET</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>
<script>
export default {
  data() {
    return {
      questions: [
        { content: 'Questao 1', expected: true },
        { content: 'Questao 2', expected: false },
        { content: 'Questao 3', expected: true },
        { content: 'Questao 4', expected: false },
        { content: 'Questao 5', expected: true },
        { content: 'Questao 6', expected: false },
        { content: 'Questao 7', expected: true },
        { content: 'Questao 8', expected: false },
      ],
      correct: 0,
      answered: 0,
      currentPosition: 0,
      questionOrder: [],
      currentStatus: null,
      currentQuestion: null,
    }
  },
  created() {
    this.reset()
  },
  computed: {
    temProxima() {
      return this.questionOrder.length > 1
    },
  },
  methods: {
    reset() {
      this.correct = 0
      this.answered = 0
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
      } else {
        this.currentStatus = false
      }
      this.answered += 1

      return result
    },
    updateQuestion() {
      if (!this.questionOrder) {
        this.currentQuestion = null
      } else {
        this.currentQuestion =
          this.questions[this.questionOrder[this.currentPosition]]
      }
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
