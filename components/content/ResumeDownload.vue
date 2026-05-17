<template>
  <section
    class="not-prose bg-white dark:bg-zinc-900
           border border-zinc-200 dark:border-zinc-800
           rounded-xl p-5 shadow-sm"
  >
    <div
      class="mx-auto text-center flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
    >
      <!-- Identity -->
      <div class="flex flex-col w-full md:w-2/3 items-center md:items-start gap-2">
        <p class="text-xs text-zinc-400 font-mono font-bold uppercase tracking-widest dark:text-zinc-500 mb-3.5 block">
          Résumé &amp; CV
        </p>
        <p class="text-5xl font-bold tracking-tight pb-1 
          bg-gradient-to-r from-sky-500 to-emerald-400 dark:from-indigo-700  dark:to-purple-500 
          bg-clip-text text-transparent">
          {{ name }}
        </p>
        <p class="text-base text-zinc-500 font-normal mb-6 dark:text-zinc-400">
          {{ title }}&nbsp;&nbsp;·&nbsp;&nbsp;{{ company }}
        </p>
        <div class="flex flex-wrap items-center md:items-start gap-2">
          <span
            v-for="tag in tags"
            :key="tag"
            class="text-[11px] px-3 py-[3px] rounded-full 
            border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- CTA -->
      <div class="w-full md:w-auto flex flex-1 flex-col mt-4 md:mt-0 items-center gap-2 shrink-0">
        <Button
          class="solid"
          :href="resumeUrl"
          :download="downloadFilename"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-[17px] h-[17px] transition-transform duration-200 group-hover:translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download PDF
        </Button>
        <p class="text-xs mx-auto text-center text-zinc-400 dark:text-zinc-500 tracking-wide">
          {{ updatedLabel }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    name?: string
    title?: string
    company?: string
    tags?: string[]
    resumeUrl?: string
    downloadFilename?: string
    updatedLabel?: string
  }>(),
  {
    name: 'Brian Hamburg',
    title: 'Senior Software Engineer',
    company: 'The Walt Disney Company',
    tags: () => ['Philadelphia, PA', 'Vue · React · AEM', '20+ yrs experience'],
    resumeUrl: '/files/brian-hamburg-resume.pdf',
    downloadFilename: 'brian-hamburg-resume.pdf',
    updatedLabel: 'Updated May 2026',
  }
)
</script>