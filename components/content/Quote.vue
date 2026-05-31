<script setup lang="ts">
const props = defineProps<{
  author?: string,
  text: string
}>()
</script>

<template>
<blockquote>
  <p>
    “{{ text }}”
    <em v-if="props.author" class="text-nowrap">— {{ author }}</em>
  </p>
</blockquote>
</template>
