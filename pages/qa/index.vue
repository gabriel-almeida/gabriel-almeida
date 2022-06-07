<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <div class="container mx-auto min-h-full">
      <div class="flex flex-row flex-wrap py-4">
        <div class="w-full px-2">
          <div class="sticky top-0 p-4 w-full">
            <!-- navigation -->
            <div
              class="alert shadow-lg mb-2"
              :class="{
                'alert-error shake-horizontal': !currentStatus,
                'alert-success': currentStatus,
                'shake-vertical': currentStatus && !specialFeedback,
                'text-xl': combo >=3 && !specialFeedback,
                'shake-crazy text-3xl': specialFeedback,
                'shake-constant': animation,
                invisible: currentStatus === null,
              }"
            >
              <template v-if="combo > 1">{{ combo }}x </template>
              {{ currentStatus ? 'Correto!' : 'Errado!' }}
            </div>
            <div class="card w-auto shadow-xl bg-neutral text-neutral-content">
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
                  <span class="text-green-200">Corretas: {{ correct }} </span>
                  <span class="text-red-400"> Erradas: {{ wrong }} </span>
                  Faltam: {{ questionOrder.length }}
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
    <!-- TODO extrair como funcao -->
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
import ExcelUpload from './ExcelUpload.vue'
const COMBO_ANIMATION = 5

export default {
  components: { ExcelUpload },
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
      wrong: 0,
      combo: 0,
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
    specialFeedback() {
      return this.combo >= COMBO_ANIMATION
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

      this.startFeedback()
      return result
    },
    startFeedback() {
      this.animation = true
      const animationTime = this.specialFeedback ? 1300 : 500

      setTimeout(() => {
        this.animation = false
        this.$refs.guitarAudio.muted = true
      }, animationTime)

      // tenho que dar essa volta toda para garantir que o audio esta carregado e evitar que aconteça delay no clique do botão
      if (this.specialFeedback) {
        const audio = this.$refs.guitarAudio
        audio.muted = false
        audio.currentTime = 0
      }
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
