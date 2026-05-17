<script setup lang="ts">
import { formatDate } from '~/utils/contentHelpers'

const { path } = useRoute()

const { data: doc } = await useAsyncData(path, () =>
  queryContent(path).findOne()
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useSeo({
  title:       doc.value?.title       ?? 'Brian Hamburg',
  description: doc.value?.description ?? doc.value?.subtitle ?? '',
  image:       doc.value?.featuredImage
    ? `https://burgbits.com${doc.value._path}/${doc.value.featuredImage}`
    : undefined,
  type:        doc.value?._path?.startsWith('/posts') ? 'article' : 'website',
  publishedAt: doc.value?.date,
})
</script>

<template>

  <!-- Found -->
  <template v-if="doc">
    <Jumbotron>
      <div class="flex flex-col">
        <p v-if="doc.date" class="text-sm font-mono text-zinc-100 mb-2">
          {{ formatDate(doc.date) }}
        </p>
        <p v-if="doc.updated" class="text-sm font-mono text-zinc-100 mb-2">
          Last updated: {{ formatDate(doc.updated) }}
        </p>
        <h2>{{ doc.title }}</h2>
        <p v-if="doc.subtitle" class="text-2xl text-zinc-200">
          {{ doc.subtitle }}
        </p>
      </div>
    </Jumbotron>
    <Section>
      <div class="flex flex-col lg:flex-row-reverse">
        <OnThisPage :links="doc?.body?.toc?.links" :isPost="doc?._path?.startsWith('/posts')" />
        <article class="lg:w-[75%] lg:mr-auto mt-4">
          <img v-if="doc.featuredImage" class="lg:mt-10 mb-4" :src="doc._path + '/' + doc.featuredImage" :alt="doc.title" />
          <ContentRenderer :value="doc" />
        </article>
      </div>
    </Section>
  </template>

  <!-- Not found -->
  <template v-else>
    <Jumbotron>
      <h1>404 Error</h1>
    </Jumbotron>
    <Section class="text-center">
      <article class="pt-4">
        <h2>Page Not Found</h2>
        <p>These aren&rsquo;t the bits you&rsquo;re looking for.</p>
        <Button to="/" class="solid mt-10">Go to Home</Button>
      </article>
    </Section>
  </template>

</template>