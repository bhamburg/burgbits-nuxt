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
      src="/images/aurora-australis.jpg"
      alt="Aurora Australis © NASA. Photographed from the International Space Station. (NASA image: ISS072E574663)"
      class="jumbotron__bg"
      sizes="sm:100vw md:100vw lg:1600px"
      preload
      fetchpriority="high"
      loading="eager"
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
    rounded-none
    top-0
    left-0
    w-full
    h-full
    object-cover
    object-[center_55%]
    origin-[center_55%]
    dark:object-[center_18%]
    dark:origin-[center_18%]
    scale-[300%]
    sm:origin-center
    sm:scale-100
    transition-all
    duration-[2s];
  }
  .jumbotron__overlay {
    @apply
    absolute
    opacity-60
    dark:opacity-25
    h-full
    w-full
    bg-gradient-to-r 
    from-sky-500 
    to-emerald-400 
    dark:from-indigo-900 
    dark:to-black
    transition-all
    duration-[2s]
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