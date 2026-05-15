<template>
  <div
    @click="flip"
    :class="['flip-card lg:w-80 lg:h-80 w-64 h-64', { active: flipped }]"
    title="Click me!"
  >
    <div class="flip-card-inner">
      <div class="flip-card-front rounded-full bg-slate-700 border-8 border-white shadow-inner">
        <ClientOnly>
          <NuxtImg
            src="/images/brian-hamburg-profile-photo-DICE2019.jpeg"
            alt="Brian Hamburg"
            class="rounded-full w-full transition-opacity duration-1000"
            :class="heroLoaded ? 'opacity-100' : 'opacity-0'"
            @load="heroLoaded = true"
          />
        </ClientOnly>
      </div>
      <div class="flip-card-back rounded-full bg-white border-8 border-white">
        <ClientOnly>
          <NuxtImg
            class="rounded-full w-full"
            :src="photos[photoIndex]"
            alt="Brian Hamburg"
          />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
const imageModules = import.meta.glob('/public/images/flipper/*', { eager: true })
const photos = Object.keys(imageModules).map(k => k.replace('/public', ''))

const heroLoaded = ref(false)
const flipped = ref(false)
const flipping = ref(false)
const photoIndex = ref(Math.floor(Math.random() * photos.length))

onMounted(() => {
  photos.forEach(src => { new Image().src = src })
  setInterval(flip, 10000)
})

function flip() {
  if (flipping.value) return
  flipping.value = true
  flipped.value = !flipped.value
  if (!flipped.value) {
    setTimeout(() => {
      photoIndex.value = Math.floor(Math.random() * photos.length)
    }, 800)
  }
  setTimeout(() => { flipping.value = false }, 1000)
}
</script>

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