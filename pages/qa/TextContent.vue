<template>
  <p v-if="currentQuestion">
    {{ currentQuestion.content }}
  </p>
</template>
<script>
export default {
  props: { currentQuestion: { type: Object, default: () => ({}) } },
}
</script>