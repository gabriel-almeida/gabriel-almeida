<template>
  <div>
    <TheHeader />
    <div class="mainheader">
      <div
        class="
          container
          max-w-4xl
          mx-auto
          pt-16
          md:pt-32
          text-center
          break-normal
        "
      >
        <p class="text-white font-extrabold text-3xl md:text-5xl">
          Gabriel Almeida
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.mainheader {
  height: 35vh;
}
@media (max-width: 768px) {
  .mainheader {
    height: 20vh;
  }
}
</style>
