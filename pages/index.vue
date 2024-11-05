<template>
  <!-- <div class="m-8"> -->
  <div>
    <TheMainHeader />

    <div class="container px-4 md:px-0 max-w-6xl mx-auto">
      <div class="flex flex-wrap justify-between">
        <ArticleCard
          v-for="article of articles"
          :key="article.slug"
          :article="article"
        />
      </div>
      <Subscribe v-if="false" />
    </div>

    <TheFooter />
    <!-- <footer class="flex justify-center border-gray-500 border-t-2">
      <p class="mt-4">
        Created by HUAHUAHUAHU
      </p>
    </footer> -->
  </div>
</template>

<script>
import metatags from '~/common/metatags'

export default {
  async asyncData({ $content, params }) {
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'desc')
      .fetch()
    const tags = await $content('tags')
      .only(['name', 'description', 'img', 'slug'])
      .sortBy('createdAt', 'asc')
      .fetch()
    return {
      articles,
      tags,
    }
  },
  head: metatags.metatags(),
}
</script>

<style class="postcss">
.article-card {
  border-radius: 8px;
}
.article-card a {
  background-color: #fff;
  border-radius: 8px;
}
.article-card img div {
  border-radius: 8px 0 0 8px;
}
</style>
