<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
  <nav class="w-full fixed top-0 z-10 bg-white dark:bg-zinc-800 shadow-xl transition bg-opacity-70 dark:bg-opacity-70 backdrop-blur-xl">
    <div class="flex flex-wrap font-mono items-center justify-between mx-auto p-4">
      <a href="/" id="brand" class="flex items-center space-x-3 rtl:space-x-reverse dark:text-white !bg-transparent border-none">
        <svg version="1.1" alt="burgbits Logo" class="h-[35px] fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 155 155" xml:space="preserve">
          <polygon points="120,65 120,75 110,75 110,65 100,65 100,55 100,45 100,35 90,35 90,45 80,45 80,35 70,35 70,45 60,45 
            60,35 50,35 50,45 50,55 50,65 40,65 40,75 30,75 30,65 20,65 20,75 20,85 20,95 20,105 20,115 30,115 40,115 50,115 60,115 60,105 
            60,95 70,95 70,85 80,85 80,95 90,95 90,105 90,115 100,115 110,115 120,115 130,115 130,105 130,95 130,85 130,75 130,65 "/>
        </svg>
        <span class="self-center text-2xl whitespace-nowrap">bhamburg.com</span>
      </a>
      <div class="flex md:hidden ml-auto justify-items-center">
        <DarkMode />
      </div>
      <button @click="isOpen = !isOpen" data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none hover:text-sky-600 hover:dark:text-indigo-300" aria-controls="navbar-dropdown" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>
      <div :class="{ hidden: !isOpen }" class="w-full md:block md:w-auto" id="navbar-dropdown">
        <ul @click="isOpen = false" class="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
          <li>
            <NuxtLink to="/about" aria-current="page" class="block p-3 md:p-0 md:inline text-center rounded-full md:rounded-none">
              About
            </NuxtLink>
          </li>
          <li class="hidden">
            <NuxtLink to="/posts" aria-current="page" class="block p-3 md:p-0 md:inline text-center rounded-full md:rounded-none">
              Blog
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/now" aria-current="page" class="block p-3 md:p-0 md:inline text-center rounded-full md:rounded-none">
              Now
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/shelves" aria-current="page" class="block p-3 md:p-0 md:inline text-center rounded-full md:rounded-none">
              Shelves
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/uses" aria-current="page" class="block p-3 md:p-0 md:inline text-center rounded-full md:rounded-none">
              Uses
            </NuxtLink>
          </li>
          <!-- <li class="hidden md:block">
            <NuxtLink to="/contact" aria-current="page" class="block p-3 md:p-0 md:inline text-center rounded-full md:rounded-none">
              Contact
            </NuxtLink>
          </li> -->
          <li class="hidden md:flex">
            <DarkMode />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="postcss" scoped>
a {
  &:hover {
    @apply bg-slate-300 
      dark:bg-zinc-900 
      md:bg-transparent 
      md:dark:bg-transparent 
      md:border-b-2 
      md:border-sky-800 
      md:dark:border-indigo-300;
  }
  &.router-link-active {
    @apply text-white 
      dark:text-indigo-300
      bg-sky-800 
      dark:bg-black 
      md:text-sky-800
      md:bg-transparent 
      md:dark:bg-transparent;
  }
}
</style>