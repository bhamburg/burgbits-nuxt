<script setup>
const imageModules = import.meta.glob('/public/images/flipper/*', { eager: true })
const photos = Object.keys(imageModules).map(k => k.replace('/public', ''))

const heroLoaded = ref(false)
const flipped = ref(false)
const flipping = ref(false)
const hasFlipped = ref(false)
const photoIndex = ref(Math.floor(Math.random() * photos.length))

onMounted(() => {
  setInterval(flip, 10000)
})

function flip() {
  if (flipping.value) return
  flipping.value = true
  flipped.value = !flipped.value
  hasFlipped.value = true
  if (!flipped.value) {
    const nextIndex = Math.floor(Math.random() * photos.length)
    new Image().src = photos[nextIndex]
    setTimeout(() => { photoIndex.value = nextIndex }, 800)
  }
  setTimeout(() => { flipping.value = false }, 1000)
}
</script>

<template>
  <div @click="flip" :class="['flip-card lg:w-80 lg:h-80 w-64 h-64', { active: flipped }]" title="Click me!">
    <div class="flip-card-inner">
      <div class="flip-card-front rounded-full bg-slate-700 border-4 border-white shadow-inner">
        <NuxtImg
          src="/images/brian-hamburg-profile-photo.jpg"
          alt="Brian Hamburg"
          width="320"
          height="320"
          sizes="(max-width: 1024px) 256px, 320px"
          fetchpriority="high"
          class="rounded-full w-full transition-opacity duration-300"
          :class="heroLoaded ? 'opacity-100' : 'opacity-0'"
          @load="heroLoaded = true"
        />
      </div>
      <div class="flip-card-back rounded-full bg-white border-4 border-white">
        <NuxtImg
          v-if="hasFlipped"
          class="rounded-full w-full"
          :src="photos[photoIndex]"
          alt="Brian Hamburg"
          width="320"
          height="320"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>

<style>
  /* flip card styles */
  .flip-card {
    background-color: transparent;
    cursor: pointer;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
  }

  /* This container is needed to position the front and back side */
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card.active .flip-card-inner {
    transform: rotateY(540deg);
  }

  /* Position the front and back side */
  .flip-card-front, .flip-card-back {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }

  /* Style the back side */
  .flip-card-back {
    transform: rotateY(180deg);
  }
</style>