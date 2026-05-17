<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="font-mono text-xs text-center p-10 text-zinc-500">
    &copy; {{ year }} Brian Hamburg <br />
    Hand-crafted with ❤️ using <NuxtLink to="https://vuejs.org" target="_blank">Vue</NuxtLink>, 
    <NuxtLink to="https://nuxt.com/" target="_blank">Nuxt</NuxtLink>, 
    and <NuxtLink to="https://tailwindcss.com/" target="_blank">Tailwind CSS</NuxtLink>
  </footer>
</template>