<template>
  <div>
    <!--Title-->
    <div class="text-center pt-16 md:pt-32">
      <p class="text-sm md:text-base text-green-500 font-bold uppercase">
        {{ publishDate }}
        <span v-if="article.serie">
          <span class="text-gray-900"> / </span>
          {{ article.serie }}
        </span>
      </p>
      <h1 class="font-bold break-normal text-3xl md:text-5xl">
        {{ article.title }}
      </h1>
    </div>

    <!--image-->
    <div
      class="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded"
      :style="{ backgroundImage: `url(${article.img})`, height: '75vh' }"
    />

    <!--Container-->
    <div class="container max-w-5xl mx-auto -mt-32">
      <div class="mx-0 sm:mx-6">
        <div
          class="
            bg-white
            w-full
            p-8
            md:p-24
            text-xl
            md:text-2xl
            text-gray-800
            leading-normal
          "
          style="font-family: Georgia, serif"
        >
          <nuxt-content :document="article" tag="article" />
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
      return new Date(this.article.createdAt).toLocaleDateString('en', options)
    },
  },
}
</script>