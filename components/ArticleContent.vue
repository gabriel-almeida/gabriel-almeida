<template>
  <div>
    <!--Title-->
    <div class="text-center pt-16 break-words p-2">
      <p class="text-sm md:text-base text-indigo-300 font-bold uppercase">
        {{ publishDate }}
      </p>
      <h1 class="font-bold break-normal text-3xl md:text-5xl">
        {{ article.title }}
      </h1>
      <h2 class="pt-5 text-gray-400 font-semibold text-xl">
        {{ article.description }}
      </h2>
      <p class="pt-5 text-indigo-300 font-semibold text-xl">
        {{ article.tags.join(', ') }}
      </p>
    </div>

    <!--Container-->
    <div class="container max-w-6xl mx-auto">
      <div class="mx-0 sm:mx-6">
        <div
          class="w-full p-8 md:p-24 text-xl md:text-2xl leading-normal"
          style="font-family: Georgia, serif"
        >
          <nuxt-content
            :document="article"
            tag="article"
            class="prose-blue prose-xl break-words"
          />
        </div>
        <Author :author="article.author" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    publishDate() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(this.article.createdAt).toLocaleDateString('pt', options)
    },
  },
}
</script>
