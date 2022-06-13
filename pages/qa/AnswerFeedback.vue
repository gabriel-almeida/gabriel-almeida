<template>
  <div
    class="alert shadow-lg mb-2 min-h-6"
    :class="{
      'alert-error shake-horizontal': combo == 0,
      'alert-success': combo > 0,
      'shake-vertical': combo > 0 && combo < 5,
      'text-xl': combo >= 3 && combo < 5,
      uppercase: combo >= 4,
      'shake-crazy text-3xl': combo >= 5,
      'shake-constant': animation,
      invisible: invisible,
    }"
  >
    <template v-if="combo > 1">{{ combo }}x </template>
    {{ text }}
  </div>
</template>
<script>
export default {
  props: {
    combo: { type: Number, default: 0 },
    text: { type: String, default: null },
  },
  data() {
    return { animation: false, invisible: true, guitar: null }
  },
  watch: {
    text(newText) {
      this.invisible = newText === null
    },
    async combo(newCombo) {
      if (this.text === null) return

      if (newCombo >= 5) {
        // tentando sincronizar o audio c/ a animação
        await this.guitar.play()
        this.startAnimation()
        this.guitar.onended = this.stopAnimation
      } else {
        this.startAnimation()
        setTimeout(this.stopAnimation, 500)
      }
    },
  },
  mounted() {
    const guitarPath = require('~/assets/sounds/guitar.ogg').default
    this.guitar = new Audio(guitarPath)
    this.guitar.load()
  },
  methods: {
    startAnimation() {
      this.animation = true
      this.invisible = false
      window.scrollTo(0, 0)
    },
    stopAnimation() {
      this.animation = false
    },
  },
}
</script>