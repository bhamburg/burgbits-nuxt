<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) =>
    titleChunk ? `${titleChunk} - Brian Hamburg` : 'Brian Hamburg | Software Engineer, Designer, Musician',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap' },
  ],
})

useSeoMeta({
  description:        'burgbits is Brian Hamburg\'s personal portfolio and blog, showcasing his work as a software engineer, designer, and musician based in the Philadelphia area.',
  ogSiteName:         'burgbits',
  ogType:             'website',
  ogUrl:              useRequestURL().href,
  ogImage:            'https://burgbits.com/images/home.jpg',
  ogImageWidth:       1200,
  ogImageHeight:      630,
  ogImageAlt:         'Brian Hamburg — Software Engineer, Designer, Musician',
  twitterCard:        'summary_large_image',
  twitterTitle:       'burgbits',
  twitterDescription: 'burgbits is Brian Hamburg\'s personal portfolio and blog, showcasing his work as a software engineer, designer, and musician based in the Philadelphia area.',
  twitterImage:       'https://burgbits.com/images/home.jpg',
})
</script>

<template>
  <NuxtLayout class="flex flex-col justify-between">
    <AppHeader />
    <NuxtPage />
    <AppFooter class="mt-auto" />
  </NuxtLayout>
</template>

<style lang="postcss">

/* ── Design tokens ──────────────────────────────────────────────────────────── */

:root {
  --font-display: 'DM Serif Display', serif;
  --font-code:    'JetBrains Mono', monospace;
  --accent:       #378ADD;
  --accent-hover: #2d7bc4;
}

/* ── Base ───────────────────────────────────────────────────────────────────── */

html {
  @apply scroll-smooth;
}

/* ── Content regions ────────────────────────────────────────────────────────── */

section, footer {

  article {
    @apply mx-2;
    p:first-child { @apply mt-4 md:mt-10; }
  }

  /* Headings — shared rules first, then per-level overrides */
  h1, h2, h3, h4, h5, h6 {
    @apply font-black scroll-mt-20;
    a { @apply text-inherit hover:text-inherit no-underline; }
  }
  h1 { @apply text-4xl md:text-5xl mb-6 mt-8 md:mt-10; }
  h2 { @apply text-3xl  md:text-4xl mb-6 mt-8 md:mt-10; }
  h3 { @apply text-2xl  mb-6; }
  h4 { @apply text-xl   mb-4; }

  /* Flow spacing */
  p, ul, blockquote, pre { @apply mb-6; }

  /* Links */
  a {
    @apply underline transition-colors duration-150
           text-sky-700 hover:text-sky-600
           dark:text-indigo-300 dark:hover:text-indigo-200;
  }

  /* Lists */
  ul {
    @apply list-disc ml-4;
    ul { @apply my-0 list-[circle]; }
  }
  ol { @apply list-decimal ml-4; }

  /* Blockquote */
  blockquote {
    font-family: var(--font-code);
    @apply p-6 rounded-xl text-center md:text-xl
      bg-gradient-to-l
      dark:from-indigo-900 
      dark:to-black
      from-sky-200 
      to-emerald-100 
      shadow-sm
      text-black dark:text-white;
    p, p:first-child { @apply m-0; }
  }

  /* Images + captions */
  img {
    @apply rounded-lg w-full shadow;
  }
  img + em {
    @apply block mt-1 mb-6 italic text-sm text-zinc-400 dark:text-zinc-500;
  }

  /* Inline code */
  code:not(pre code) {
    font-family: var(--font-code);
    @apply text-[0.85em] px-1.5 py-0.5 rounded
           bg-zinc-100 dark:bg-zinc-900
           border border-zinc-200 dark:border-zinc-700
           text-zinc-900 dark:text-zinc-100;
  }

  /* Code blocks */
  pre {
    font-family: var(--font-code);
    @apply text-sm leading-relaxed
           p-5 rounded-xl overflow-auto shadow
           bg-zinc-950 text-zinc-100;
  }

  /* Cards (markdown-embeddable, mirrors component styles) */
  .card {
    @apply relative overflow-hidden rounded-xl p-6
      bg-white dark:bg-zinc-900
      border border-zinc-200 dark:border-zinc-900
      transition-transform duration-200 hover:-translate-y-1;
    &::before {
      content: '';
      @apply absolute top-0 left-0 right-0 h-[3px] rounded-t-xl;
    }
    h3 { @apply text-base font-medium mb-2.5; }
    p  { @apply text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 mb-4; }
  }

  /* Video embeds */
  .video-container {
    @apply relative mb-6 pb-[56.25%] h-0 overflow-hidden shadow;
    embed, iframe, object {
      @apply absolute top-0 left-0 w-full h-full;
    }
  }
}
</style>