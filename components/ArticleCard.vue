<template>
  <div class="w-full p-4 flex flex-col flex-grow flex-shrink">
    <div
      class="
        flex-1
        bg-gray-800
        rounded-t rounded-b-none
        overflow-hidden
        shadow-lg
      "
    >
      <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
        <div class="w-full font-bold text-xl text-gray-300 px-6 pt-5">
          {{ article.title }}.
        </div>
        <p class="text-gray-400 font-serif text-base px-6 mb-5">
          {{ article.description }}
        </p>
      </NuxtLink>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
}
</script>
