<template>
  <div class="bg-gray-700">
    <!--Title-->
    <div class="text-center pt-16 break-words p-2">
      <p class="text-sm md:text-base text-indigo-300 font-bold uppercase">
        {{ publishDate }}
      </p>
      <h1 class="font-bold break-normal text-3xl md:text-5xl text-white">
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
          class="w-full p-4 md:p-12 text-xl md:text-2xl leading-normal"
          style="font-family: Georgia, serif"
        >
          <nuxt-content
            :document="article"
            tag="article"
            class="prose-green prose-xl break-words text-white"
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
