<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Brian Hamburg` : 'Brian Hamburg | Software Engineer, Designer, Musician'
  }
})
</script>

<template>
  <NuxtLayout class="min-h-screen flex flex-col justify-between">
    <AppHeader />
    <main>
      <NuxtPage />
    </main>
    <AppFooter class="mt-auto" />
  </NuxtLayout>
</template>

<style lang="postcss">
html {
  @apply scroll-smooth;
}
section, footer {
  article {
    @apply mx-2;
    p:first-child {
      @apply mt-4 md:mt-10
    }
  }
  h2 {
    @apply font-black text-3xl md:text-4xl mb-6 mt-8 md:mt-10 scroll-mt-20;
  }
  h3 {
    @apply font-black text-2xl scroll-mt-20;
  }
  h4 {
    @apply font-black text-xl scroll-mt-20;
  }
  h5, h6 {
    @apply font-black scroll-mt-20;
  }
  h3, p, ul, blockquote, pre  {
    @apply mb-6;
  }
  a {
    @apply text-sky-700
      hover:text-sky-600 
      dark:text-indigo-300
      dark:hover:text-indigo-500
      underline;
  }
  blockquote {
    @apply flex 
      flex-col 
      p-6 
      text-center 
      md:text-xl 
      rounded-lg
      font-mono
      bg-gradient-to-l
      text-black 
      dark:text-white 
      from-sky-200 
      to-emerald-100 
      dark:from-indigo-950 
      dark:to-black
      shadow;
      p, p:first-child {
        @apply m-0;
      }
  }
  ul {
    @apply list-disc ml-4;
    ul {
      @apply my-0 list-[circle];
    }
  }
  ol {
    @apply list-decimal;
  }
  h1, h2, h3, h4 {
    a {
      @apply text-inherit hover:text-inherit no-underline;
    }
  }
  img {
    @apply rounded-lg w-full shadow;
  }
  img + em {
    @apply italic text-zinc-500 text-sm;
  }
  pre {
    @apply bg-black text-white p-4 rounded-lg overflow-auto shadow;
  }
  .video-container {
    @apply relative mb-6 pb-[56.25%] h-0 overflow-hidden shadow;
    embed, iframe, object {
      @apply absolute top-0 left-0 w-full h-full;
    }
  }
}
</style>