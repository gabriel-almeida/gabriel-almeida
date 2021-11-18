<template>
  <div>
      <TheHeader />
      <ArticleContent :article="article" />
      <Subscribe v-if="false" />
      <TheFooter />
  </div>
  <!-- <article
    class="flex lg:h-screen w-screen lg:overflow-hidden xs:flex-col lg:flex-row"
  >
    <div class="relative lg:w-1/2 xs:w-full xs:h-84 lg:h-full post-left">
      <img
        :src="article.img"
        :alt="article.alt"
        class="absolute h-full w-full object-cover"
      />
      <div class="overlay"></div>
      <div class="absolute top-32 left-32 text-white">
        <NuxtLink to="/"><Logo /></NuxtLink>
        <div class="mt-16 -mb-3 flex uppercase text-sm">
          <p class="mr-3">
            {{ formatDate(article.updatedAt) }}
          </p>
          <span class="mr-3">•</span>
          <p>{{ article.author.name }}</p>
        </div>
        <h1 class="text-6xl font-bold">{{ article.title }}</h1>
        <span v-for="(tag, id) in article.tags" :key="id">
          <NuxtLink :to="`/blog/tag/${tags[tag].slug}`">
            <span
              class="
                truncate
                uppercase
                tracking-wider
                font-medium
                text-ss
                px-2
                py-1
                rounded-full
                mr-2
                mb-2
                border border-light-border
                dark:border-dark-border
                transition-colors
                duration-300
                ease-linear
              "
            >
              {{ tags[tag].name }}
            </span>
          </NuxtLink>
        </span>
      </div>
      <div class="flex absolute top-3rem right-3rem">
        <NuxtLink
          to="/"
          class="mr-8 self-center text-white font-bold hover:underline"
        >
          All articles
        </NuxtLink>
        <AppSearchInput />
      </div>
    </div>
    <div
      class="
        relative
        xs:py-8 xs:px-8
        lg:py-32 lg:px-16 lg:w-1/2
        xs:w-full
        h-full
        overflow-y-scroll
        markdown-body
        post-right
        custom-scroll
      "
    >
      <h1 class="font-bold text-4xl">{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <p class="pb-4">Post last updated: {{ formatDate(article.updatedAt) }}</p>
      <nav class="pb-6">
        <ul>
          <li
            v-for="link of article.toc"
            :key="link.id"
            :class="{
              'font-semibold': link.depth === 2,
            }"
          >
            <nuxtLink
              :to="`#${link.id}`"
              class="hover:underline"
              :class="{
                'py-2': link.depth === 2,
                'ml-2 pb-2': link.depth === 3,
              }"
              >{{ link.text }}</nuxtLink
            >
          </li>
        </ul>
      </nav>
      <nuxt-content :document="article" />
      <author :author="article.author" />
      <PrevNext :prev="prev" :next="next" class="mt-8" />
    </div>
  </article> -->
</template>
<script>
import ArticleContent from '~/components/ArticleContent.vue'
import metatags from '~/common/metatags'

export default {
  components: { ArticleContent },
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()
    let tags = {}
    if (article.tags) {
      const tagsList = await $content('tags')
        .only(['name', 'slug'])
        .where({ name: { $containsAny: article.tags } })
        .fetch()
      tags = Object.assign({}, ...tagsList.map((s) => ({ [s.name]: s })))
    }

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()
    return {
      article,
      tags,
      prev,
      next,
    }
  },
  head() {
    return metatags.blogPosting({ 
        title: this.article.title, 
        description: this.article.description, 
        author: this.article.author.name,
        tags: this.article.tags,
        canonical: this.$config.baseUrl + this.$route.path + "/",
        published: this.article.published,
        modified: this.article.modified,
        image: this.$config.baseUrl + require(`~/assets/images/${this.article.author.img}`)
    })
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>