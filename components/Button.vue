<template>
  <NuxtLink 
    type="button" 
    class="
      inline-block
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
      shadow
    ">
    <slot />
  </NuxtLink>
</template>

<style lang="postcss" scoped>
  .solid {
    @apply text-white !outline-none bg-sky-600  hover:bg-sky-500 dark:bg-black dark:hover:bg-zinc-900 py-3 px-5
  }
  .jumbotron a {
    @apply text-white outline-white hover:text-sky-800 hover:bg-white dark:hover:text-indigo-900
  }
  .jumbotron a.solid {
    @apply text-sky-800 dark:text-indigo-900 !outline-none bg-white hover:bg-gray-200 py-3 px-5
  }
</style>