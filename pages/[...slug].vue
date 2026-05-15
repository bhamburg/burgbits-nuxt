<script setup lang="ts">
import { formatDate } from '~/utils/contentHelpers';
</script>

<template>
  <ContentDoc>
    <template v-slot="{ doc }">
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
            <img v-if="doc.featuredImage" class="lg:mt-10 mb-4" :src="doc._path + '/' + doc.featuredImage" :alt="doc.title"></img>
            <ContentRenderer :value="doc" />
          </article>
        </div>
      </Section>
    </template>
    <template #not-found>
      <Jumbotron>
        <h1>404 Error</h1>
      </Jumbotron>
      <Section class="text-center">
        <article class="pt-4">
          <h2>Page Not Found</h2>
          <p>These aren&rsquo;t the bits you're looking for.</p>
          <Button to="/" class="solid mt-10">Go to Home</Button>
        </article>
      </Section>
    </template>
  </ContentDoc>
</template>