<script setup>
import { ref, onMounted } from 'vue'

const isLoaded = ref(false)
const bgImg = ref(null)

onMounted(() => {
  // On return navigation, the cached image loads before @load is attached.
  // img.complete catches that case.
  const el = bgImg.value?.$el
  if (el?.complete && el?.naturalWidth > 0) {
    isLoaded.value = true
  }
})
</script>

<template>
  <section class="jumbotron">
    <div class="jumbotron__overlay"></div>
    <NuxtImg
      ref="bgImg"
      src="/images/zen-cyberpunk.png"
      alt="Zen Garden in a Cyberpunk Cityscape Background Image"
      @load="isLoaded = true"
      class="jumbotron__bg"
      :class="isLoaded ? 'opacity-100' : 'opacity-0'"
    />
    <div class="jumbotron__content">
      <slot />
    </div>
  </section>
</template>

<style lang="postcss">
.jumbotron {
    @apply 
    bg-emerald-400
    dark:bg-black
    relative
    mt-16
    shadow-inner
    transition
    duration-200
    overflow-hidden;
  }
  .jumbotron h1, 
  .jumbotron h2 {
    @apply font-black text-4xl md:text-5xl m-0;
  }
  .jumbotron__bg {
    @apply 
    absolute 
    top-0 
    left-0 
    w-full 
    h-full 
    object-cover
    object-bottom
    dark:object-[center_20%]
    scale-150
    dark:scale-125
    transition-all
    duration-700;
  }
  .jumbotron__overlay {
    @apply
    absolute
    opacity-90
    dark:opacity-70
    h-full
    w-full
    bg-gradient-to-r 
    from-sky-500 
    to-emerald-400 
    dark:from-indigo-900 
    dark:to-black
    z-10;
  }
  .jumbotron__content {
    @apply
    flex 
    flex-col-reverse 
    sm:flex-row 
    justify-center 
    items-center 
    mx-auto 
    p-5 
    text-white 
    text-center
    relative
    z-20;
  }
</style>