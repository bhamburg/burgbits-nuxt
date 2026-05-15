<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isPost: Boolean,
  links: Array
})

const activeId = ref(props.links?.[0]?.id ?? null)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
          break
        }
      }
    },
    { rootMargin: '0px 0px -70% 0px', threshold: 0 }
  )

  props.links?.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <nav
    aria-label="On this page"
    class="toc lg:fixed flex flex-col lg:w-[210px] mt-6 lg:mt-14 mx-2 mb-0 z-10
           bg-white dark:bg-zinc-900
           border border-zinc-200 dark:border-zinc-800
           rounded-xl p-5 shadow-sm"
  >
    <span class="toc__label">On This Page</span>

    <ul class="flex flex-col gap-px list-none m-0 p-0">
      <li v-for="link in props.links" :key="link.id">
        <a
          :href="`#${link.id}`"
          class="toc__link"
          :class="[
            link.depth === 3 ? 'toc__link--h3' : '',
            activeId === link.id ? 'toc__link--active' : ''
          ]"
        >
          {{ link.text }}
        </a>
      </li>
    </ul>

    <div v-if="props.isPost" class="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
      <a href="/posts" class="toc__back">
        <i class="ti ti-arrow-left text-sm" aria-hidden="true" />
        Back to the blog
      </a>
    </div>
  </nav>
</template>

<style scoped>
.toc__label {
  @apply text-xs text-zinc-400 font-mono font-bold uppercase tracking-widest dark:text-zinc-500 mb-3.5 block;
}

.toc__link {
  @apply block text-[0.9rem] leading-[1.45]
         pt-[5px] pb-[5px] pr-2 pl-[10px]
         border-l-2 border-l-transparent rounded-r
         no-underline transition-colors duration-150
         text-zinc-500 dark:text-zinc-400;
}

.toc__link:hover {
  @apply text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800;
}

.toc__link--h3 {
  @apply pl-5 text-xs;
}

.toc__link--active {
  @apply font-medium
         text-sky-600 dark:text-indigo-300
         bg-zinc-100 dark:bg-zinc-800
         border-l-sky-600 dark:border-l-indigo-300;
}

.toc__back {
  @apply inline-flex items-center gap-[5px]
         text-[0.9rem] font-medium no-underline
         transition-all duration-150
         text-zinc-400 dark:text-zinc-500;
}

.toc__back:hover {
  @apply gap-[3px] text-zinc-700 dark:text-zinc-300;
}
</style>