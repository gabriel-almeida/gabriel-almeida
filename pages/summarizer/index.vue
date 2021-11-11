<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <div class="flex-1">
        <textarea cols="100" rows="10" v-model="text" />
        
        {{size}} %
        <input type="range" max="100" min="1" class="range" v-model="size"> 

        <p v-for="sentence of summary" :key="sentence[0]" >
        <span class="font-bold"> {{ sentence[1] }} </span>
        {{ sentence[2] }}
        </p>
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
      size: 10
    }
  },
  computed: {
    summary() {
      return summarizer.summarize(this.text, this.size/100.0)
    },
  },
}
</script>
