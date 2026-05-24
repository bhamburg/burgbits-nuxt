<script setup lang="ts">
const props = defineProps<{
  title?: string,
  src: string
}>()
</script>

<template>
  <div class="video-container">
    <iframe
      :title="title || 'YouTube video player'"
      :src="src"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>