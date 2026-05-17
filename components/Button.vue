<script setup lang="ts">
const props = defineProps<{
  href?: string
  download?: string
}>()

const isExternal = computed(() =>
  !!props.href && (props.href.startsWith('http') || props.href.startsWith('//'))
)
</script>

<template>
  <a
    v-if="isExternal || download"
    :href="href"
    :download="download"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="nuxt-link"
  >
    <slot />
  </a>
  <NuxtLink
    v-else
    :to="href"
    class="nuxt-link"
  >
    <slot />
  </NuxtLink>
</template>

<style lang="postcss" scoped>
.nuxt-link {
  @apply inline-flex
      items-center
      gap-1.5
      bg-transparent
      no-underline 
      font-mono
      text-sky-700
      hover:text-white 
      dark:text-white
      hover:bg-sky-700
      dark:hover:bg-indigo-300
      outline 
      outline-sky-700 
      dark:outline-indigo-300 
      mt-4
      mx-2
      py-2 
      px-4 
      rounded-full 
      transition-colors
      shadow;
  }
  .solid {
    @apply text-white !outline-none bg-sky-600 hover:bg-sky-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 py-3 px-5
  }
  .jumbotron a {
    @apply text-white outline-white hover:text-sky-800 hover:bg-white dark:hover:text-indigo-900
  }
  .jumbotron a.solid {
    @apply text-sky-800 dark:text-indigo-900 !outline-none bg-white hover:bg-gray-200 py-3 px-5
  }
</style>