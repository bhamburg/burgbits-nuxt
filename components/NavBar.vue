<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const isOpen = ref(false)
const nav    = ref(null)

onClickOutside(nav, () => isOpen.value = false)
</script>

<template>
  <nav ref="nav" class="w-full fixed top-0 z-50 bg-white dark:bg-zinc-800 shadow-xl transition bg-opacity-70 dark:bg-opacity-70 backdrop-blur-xl">
    <div class="flex flex-wrap font-mono items-center justify-between mx-auto p-4">
      <a href="/" id="brand" class="flex items-center space-x-3 rtl:space-x-reverse dark:text-white !bg-transparent border-none">
        <svg version="1.1" alt="burgbits Logo" class="h-8 fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 155 155" xml:space="preserve">
          <polygon points="120,65 120,75 110,75 110,65 100,65 100,55 100,45 100,35 90,35 90,45 80,45 80,35 70,35 70,45 60,45 
            60,35 50,35 50,45 50,55 50,65 40,65 40,75 30,75 30,65 20,65 20,75 20,85 20,95 20,105 20,115 30,115 40,115 50,115 60,115 60,105 
            60,95 70,95 70,85 80,85 80,95 90,95 90,105 90,115 100,115 110,115 120,115 130,115 130,105 130,95 130,85 130,75 130,65 "/>
        </svg>
        <span class="self-center text-xl whitespace-nowrap">burgbits</span>
      </a>
      <div class="flex md:hidden ml-auto justify-items-center">
        <DarkMode />
      </div>
      <button @click="isOpen = !isOpen" data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 w-10 h-8 justify-center text-sm rounded-lg md:hidden focus:outline-none hover:text-sky-600 hover:dark:text-indigo-300" aria-controls="navbar-dropdown" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>
      <div :class="{ hidden: !isOpen }" class="w-full md:block md:w-auto" id="navbar-dropdown">
        <ul @click="isOpen = false" class="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-5 rtl:space-x-reverse md:flex-row md:mt-0">
          <li>
            <NuxtLink to="/about" aria-label="About Brian Hamburg" aria-current="page" class="block p-3 md:p-0 md:inline text-center rounded-full md:rounded-none">
              /about
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/now" aria-label="What Brian is up to lately" aria-current="page" class="block p-3 md:p-0 md:inline text-center rounded-full md:rounded-none">
              /now
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/posts" aria-label="Blog posts" aria-current="page" class="block p-3 md:p-0 md:inline text-center rounded-full md:rounded-none">
              /posts
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/shelves" aria-label="media consumed and recent events" aria-current="page" class="block p-3 md:p-0 md:inline text-center rounded-full md:rounded-none">
              /shelves
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/uses" aria-label="Hardware and software Brian uses" aria-current="page" class="block p-3 md:p-0 md:inline text-center rounded-full md:rounded-none">
              /uses
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="https://github.com/bhamburg" title="GitHub" aria-current="page" target="_blank" class="hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-[24px] fill-black dark:fill-white" viewBox="0 0 98 96" fill="currentColor">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
              </svg>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="https://www.threads.com/@burgbits" title="Threads" target="_blank" class="hidden md:block">
              <svg aria-label="Threads" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" class="h-[24px] fill-black dark:fill-white">
                <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"/>
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