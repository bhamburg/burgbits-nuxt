<script setup lang="ts">
useHead({
  title: 'Blog',
})

import { formatDate } from '~/utils/contentHelpers';

const { data: posts } = await useAsyncData('posts', () =>
  queryContent('posts')
    .sort({ date: -1 })
    .without('body')
    .find()
)
</script>

<template>
  <Jumbotron>
    <div class="flex flex-col">
      <h2>Blog Posts</h2>
    </div>
  </Jumbotron>
  <Section>
    <div class="mt-8 px-2">
      <ul v-if="posts && posts.length" class="space-y-8 list-none ml-0">
        <li
          v-for="post in posts.filter((p) => { 
            return !p.draft && p.published;
          })"
          :key="post._path"
          class="group border-b border-zinc-200 dark:border-zinc-700 pb-4 last:border-b-0"
        >
          <NuxtLink
            :to="post._path"
            class="no-underline text-inherit hover:text-inherit flex flex-col sm:flex-row-reverse sm:items-start gap-5"
          >
            <img
              v-if="post.thumbnail ?? post.featuredImage"
              :src="post._path + '/' + (post.thumbnail ?? post.featuredImage)"
              :alt="post.title"
              class="w-full sm:w-44 sm:flex-shrink-0 h-44 sm:h-[130px] object-cover rounded-lg shadow"
            />
            <article class="flex-1 min-w-0">
              <time
                v-if="post.date"
                :datetime="post.date"
                class="block text-sm font-mono text-zinc-500 dark:text-zinc-400 mb-2"
              >
                {{ formatDate(post.date) }}
              </time>
  
              <h2
                class="font-black text-2xl md:text-3xl mb-3 mt-0 scroll-mt-0 text-zinc-900 dark:text-white group-hover:text-sky-800 dark:group-hover:text-indigo-300 transition-colors"
              >
                {{ post.title }}
              </h2>
  
              <p
                v-if="post.description"
                class="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4"
              >
                {{ post.description }}
              </p>
  
              <ul
                v-if="post.tags && post.tags.length"
                class="flex flex-wrap gap-2 list-none ml-0 mb-0"
              >
                <li
                  v-for="tag in post.tags"
                  :key="tag"
                  class="text-xs font-mono px-2 py-1 rounded bg-sky-100 text-sky-800 dark:bg-indigo-950 dark:text-indigo-300"
                >
                  {{ tag }}
                </li>
              </ul>
            </article>
          </NuxtLink>
        </li>
      </ul>

      <p v-else class="text-zinc-500 dark:text-zinc-400">
        No posts yet — check back soon!
      </p>
    </div>
  </Section>
</template>