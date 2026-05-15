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
        <ul @click="isOpen = false" class="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-5 rtl:space-x-reverse md:flex-row md:mt-0">
          <li>
            <NuxtLink to="/about" aria-current="page" class="block p-3 md:p-0 md:inline text-center rounded-full md:rounded-none">
              /about
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/now" aria-current="page" class="block p-3 md:p-0 md:inline text-center rounded-full md:rounded-none">
              /now
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/posts" aria-current="page" class="block p-3 md:p-0 md:inline text-center rounded-full md:rounded-none">
              /posts
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/shelves" aria-current="page" class="block p-3 md:p-0 md:inline text-center rounded-full md:rounded-none">
              /shelves
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/uses" aria-current="page" class="block p-3 md:p-0 md:inline text-center rounded-full md:rounded-none">
              /uses
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="https://github.com/bhamburg" aria-current="page" target="_blank" class="hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-[24px] fill-black dark:fill-white" viewBox="0 0 98 96" fill="currentColor">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
              </svg>
            </NuxtLink>
          </li>
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
    @apply
      text-sky-700
      dark:text-indigo-300
      bg-slate-300
      dark:bg-zinc-900
      md:bg-transparent
      md:dark:bg-transparent
  }
  &.router-link-active {
    @apply text-white
      dark:text-indigo-300
      bg-sky-700
      dark:bg-black
      md:text-sky-700
      md:bg-transparent
      md:dark:bg-transparent;
  }
}
</style>