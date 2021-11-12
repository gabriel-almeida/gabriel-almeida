<template>
  <div class="flex w-full items-center font-sans p-8 md:p-24">
        <img class="w-20 h-20 rounded-full mr-4" :src="author.img" :alt="author.name">
        <div class="flex-1">
            <p class="text-base font-bold md:text-xl leading-none">
                {{author.name}}
            </p>
            <p class="text-gray-600 text-xs md:text-base">{{author.bio}}</p>
        </div>
  </div>
</template>

<script>
export default {
  props: {
    author: {
      type: Object,
      required: true
    }
  }
}
</script>