<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <div class="flex-1">
      <textarea cols="100" rows="10" v-model="text" />

      {{ percentage }} %
      <input
        type="range"
        max="100"
        min="1"
        class="range"
        v-model="percentage"
      />
      <p v-for="sentence of summary" :key="sentence.idx">
        <span
          :class="{ 'bg-yellow-200': sentence.highlight }"
          :title="JSON.stringify(sentence.scores)"
        >
          {{ sentence.sent }}
        </span>
      </p>
      <!-- {{scores}} -->
    </div>
    <TheFooter />
  </div>
</template>
<script>
import summarizer from './summarizer'

export default {
  data() {
    return {
      text: '',
      percentage: 10,
    }
  },
  computed: {
    scores() {
      return summarizer.summarize(this.text)
    },
    summary() {
      if (!this.scores) return
      const size = Math.trunc((this.scores.nSentences * this.percentage) / 100)
      return this.scores.sentences.map((sent, idx) => ({
        sent,
        idx,
        highlight: this.scores.importanceRank[idx] <= size,
        scores: this.scores.normalizedScores[idx],
      }))
    },
  },
}
</script>
