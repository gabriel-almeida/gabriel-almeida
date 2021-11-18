<template>
    <div class="w-full md:w-1/2 p-6 flex flex-col flex-grow flex-shrink">
        <div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
            <img :src="require(`~/assets/images/${article.img}`)" :alt="article.alt" class="h-96 object-cover w-full rounded-t pb-6">
            <p class="w-full text-gray-600 text-xs md:text-sm px-6">{{article.serie}}</p>
            <div class="w-full font-bold text-xl text-gray-900 px-6">
                <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }"> {{article.title}}. </NuxtLink>
            </div>
            <p class="text-gray-800 font-serif text-base px-6 mb-5">
                {{article.description}}
            </p>
        </div>
        <div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
            <div class="flex items-center justify-between">
                <img class="w-8 h-8 rounded-full mr-4 avatar" :src="require(`~/assets/images/${article.author.img}`)" :alt="article.author.name">
                <!-- <p class="text-gray-600 text-xs md:text-sm">1 MIN READ</p> -->
            </div>
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