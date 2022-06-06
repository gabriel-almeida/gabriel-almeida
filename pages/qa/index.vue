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
                'alert-error shake-horizontal': !currentStatus,
                'alert-success shake-crazy': currentStatus,
                'shake-constant': animation,
                invisible: currentStatus === null,
              }"
            >
              <span>{{ currentStatus ? 'Correto!' : 'Errado!' }}</span>
            </div>
            <div class="card w-96 shadow-xl bg-neutral text-neutral-content">
              <div class="card-body">
                <p v-if="currentQuestion">
                  {{ currentQuestion.content }}
                </p>
                <div class="card-actions justify-end">
                  <span v-if="currentQuestion && currentStatus === null">
                    <a class="btn bg-green-500" @click="answer(true)">Certo</a>
                    <a class="btn bg-red-500" @click="answer(false)">Errado</a>
                  </span>
                  <a
                    v-if="temProxima"
                    class="btn bg-gray-500"
                    @click="nextQuestion()"
                  >
                    Próxima
                  </a>
                </div>
                <div>
                  {{ correct }} / {{ answered }} (Faltam
                  {{ questionOrder.length }})
                </div>
              </div>
            </div>
            <div>
              <a class="underline cursor-pointer" @click="reset()">RESET</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheFooter />
    <audio
      ref="guitarAudio"
      :src="require('@/assets/sounds/guitar.ogg').default"
      preload="auto"
      loop="true"
      muted="true"
      autoplay
    />
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
      animation: false,
    }
  },
  computed: {
    temProxima() {
      return this.questionOrder.length > 1
    },
  },
  created() {
    this.reset()
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

      this.animation = true
      const animationTime = result ? 1300 : 500
      setTimeout(() => {
        this.animation = false
        this.$refs.guitarAudio.muted = true
      }, animationTime)

      // tenho que dar essa volta toda para garantir que o audio esta carregado e evitar que aconteça delay no clique do botão
      if (result) {
        const audio = this.$refs.guitarAudio
        audio.muted = false
        audio.currentTime = 0
      }

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
