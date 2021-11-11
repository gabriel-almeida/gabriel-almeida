<template>
  <div
    class="flex lg:h-screen w-screen lg:overflow-hidden xs:flex-col lg:flex-row"
  >
    <div class="relative lg:w-1/2 xs:w-full xs:h-84 lg:h-full post-left">
      <img
        :src="articles[0].author.img"
        :alt="articles[0].author.name"
        class="absolute h-full w-full object-cover"
      />
    </div>

    <div class="overlay"></div>
    <div class="absolute top-32 left-32 text-white">
      <NuxtLink to="/"><Logo /></NuxtLink>
      <div class="mt-16 -mb-3 flex flex-col uppercase text-sm">
        <h1 class="text-4xl font-bold">
          {{ articles[0].author.name }}
        </h1>
        <p class="mb-4">{{ articles[0].author.bio }}</p>
      </div>
    </div>
    <div
      class="relative xs:py-8 xs:px-8 lg:py-32 lg:px-16 lg:w-1/2 xs:w-full h-full overflow-y-scroll markdown-body post-right custom-scroll"
    >
      <NuxtLink to="/"
        ><p class="hover:underline">Back to All Articles</p></NuxtLink
      >
      <h3 class="mb-4 font-bold text-4xl">
        Here are a list of articles by {{ articles[0].author.name }}:
      </h3>
      <div> 
          <ArticleCard v-for="article of articles" :key="article.slug" :article="article" /> 
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCard from '~/components/ArticleCard.vue'
export default {
  components: { ArticleCard },
  async asyncData({ $content, params }) {
    const articles = await $content('articles')
      .where({
        'author.name': {
          $regex: [params.author, 'i']
        }
      })
      .without('body')
      .sortBy('createdAt', 'asc')
      .fetch()
    return {
      articles
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>