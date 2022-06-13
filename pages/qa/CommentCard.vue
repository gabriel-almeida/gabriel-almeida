<template>
  <div
    class="
      card
      w-auto
      shadow-xl
      bg-indigo-900 bg-opacity-30
      text-neutral-content
      mb-2
    "
  >
    <div class="card-body">
      <p>
        <span class="font-bold">
          Resposta: {{ currentQuestion.expected ? 'Certo' : 'Errado' }}
        </span>
      </p>
      <p v-if="currentQuestion.comment">
        {{ currentQuestion.comment }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: { currentQuestion: { type: Object, default: () => ({}) } },
}
</script>