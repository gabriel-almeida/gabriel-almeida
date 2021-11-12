<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <div class="container mx-auto min-h-full">
      <div class="flex flex-row flex-wrap py-4">
        <div class="w-full md:w-1/4 px-2">
          <div class="sticky top-0 p-4 w-full">
            <!-- navigation -->
            <div class="flex flex-col overflow-hidden">
              <div class="form-control">
                <textarea
                  v-model="text"
                  class="textarea h-36 w-full textarea-bordered"
                  placeholder="Text to summarize"
                />
              </div>
              <div class="p-4">
                {{ percentage }} % - {{ nSentences }} fragment(s)
                <input
                  v-model="percentage"
                  type="range"
                  max="100"
                  :min="step"
                  class="range"
                  :step="step"
                />
              </div>
            </div>
          </div>
        </div>
        <div role="main" class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
          <p v-for="sentence of summary" :key="sentence.idx">
            <span
              :class="{ 'bg-yellow-200': sentence.highlight }"
              :title="humanizeMetrics(sentence.scores)"
            >
              {{ sentence.sent }}
            </span>
          </p>
          <div
            v-if="mostFrequent"
            class="
              collapse
              w-96
              border
              rounded-box
              border-base-300
              collapse-arrow
            "
          >
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium">Stats</div>
            <div class="collapse-content">
              <p v-for="pair of mostFrequent" :key="pair">
                {{ pair }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>
<script>
import summarizer from './summarizer'
import metatags from '~/common/metatags'

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
    step() {
      return !this.scores
        ? 1
        : Math.max(Math.trunc(100 / this.scores.nSentences), 1)
    },
    nSentences() {
      return !this.scores
        ? 0
        : 1 + Math.trunc((this.scores.nSentences * this.percentage) / 100)
    },
    summary() {
      if (!this.scores) return
      return this.scores.sentences.map((sent, idx) => ({
        sent,
        idx,
        highlight: this.scores.importanceRank[idx] < this.nSentences,
        scores: this.scores.normalizedScores[idx],
      }))
    },
    mostFrequent() {
      if (!this.scores) return
      return Object.entries(this.scores.globalFrequencies)
        .filter(([word]) => this.scores.documentFrequencies[word] > 10)
        .sort(([, freq1], [, freq2]) => freq2 - freq1)
        .map(
          ([word, freq]) =>
            `${word}: ${freq} occ. / ${this.scores.documentFrequencies[word]} fragments`
        )
    },
  },
  methods: {
    humanizeMetrics(normizedScores) {
      const humanizedNames = Object.entries({
        bm25: "Most 'Relevant'",
        freq: 'Most Frequents',
        upper: 'Capitalized Letters',
        // position: 'Position'
      })
      return (
        'Metrics: \n' +
        humanizedNames
          .map(
            ([scoreName, humanName]) =>
              `${humanName}: ${Math.trunc(100 * normizedScores[scoreName])}`
          )
          .join('\n')
      )
    },
    head: metatags.metatags()
  },
}
</script>
