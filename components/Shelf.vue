<script setup lang="ts">
import { formatDate } from '~/utils/contentHelpers'

const props = defineProps({
  alwaysGrid:  Boolean,
  alwaysTable: Boolean,
  dataPath:    String,
  grid:        Boolean,
  table:       Boolean,
})

// ── Data ─────────────────────────────────────────────────────────────────────

const { status, data } = useFetch<any>(props.dataPath!, { server: false, lazy: true })

// ── View toggle ───────────────────────────────────────────────────────────────

const isTable = ref(props.alwaysTable || props.table)

watchEffect(() => {
  if (props.alwaysTable || props.table) isTable.value = true
})

const toggleTable = () => {
  if (!props.alwaysGrid && !props.alwaysTable) isTable.value = !isTable.value
}

// ── Shelf type helpers ────────────────────────────────────────────────────────

const shelfIs = (shelf: any, ...keywords: string[]) =>
  keywords.some(kw => shelf.title.toLowerCase().includes(kw))

const isCurrent  = (s: any) => shelfIs(s, 'current')
const isGaming   = (s: any) => shelfIs(s, 'play', 'finished')
const isReading  = (s: any) => shelfIs(s, 'read')
const isFinished = (s: any) => shelfIs(s, 'finished')
const showRating = (s: any) => !shelfIs(s, 'current', 'run')

// ── Sorting ───────────────────────────────────────────────────────────────────

const sortColumn    = ref('dateFinished')
const sortDirection = ref<'asc' | 'desc'>('desc')

const sortByColumn = (column: string) => {
  sortDirection.value = sortColumn.value === column && sortDirection.value === 'asc' ? 'desc' : 'asc'
  sortColumn.value = column
}

const comparators: Record<string, (a: any, b: any) => number> = {
  dateFinished: (a, b) => new Date(a.dateFinished).getTime() - new Date(b.dateFinished).getTime(),
  title:        (a, b) => a.title.localeCompare(b.title),
  author:       (a, b) => (a.author   ?? '').localeCompare(b.author   ?? ''),
  platform:     (a, b) => (a.platform ?? '').localeCompare(b.platform ?? ''),
  rating:       (a, b) => a.rating - b.rating,
}

const TABLE_MAX = 17
const GRID_MAX  = 23

const sortedItems = (shelf: any) => {
  const cmp = comparators[sortColumn.value] ?? (() => 0)
  const items = shelf.items.slice(0, TABLE_MAX).sort(cmp)
  return sortDirection.value === 'desc' ? items.reverse() : items
}

const itemTitle = (item: any) => [
  item.title,
  item.author              && item.author,
  item.platform            && item.platform,
  item.firstTime === 'yes' && 'First Playthrough',
  item.completed === 'yes' && '100% Completion',
  item.dateFinished        && `Finished ${item.dateFinished}`,
  item.rating              && `${item.rating}/5 stars`,
].filter(Boolean).join(' · ')
</script>

<template>

  <!-- Loading -->
  <div
    v-if="status === 'pending'"
    class="text-sm text-center text-zinc-400 dark:text-zinc-500 p-6 mb-4
           bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800
           rounded-xl font-mono animate-pulse"
  >
    Loading shelf...
  </div>

  <!-- Loaded -->
  <div
    v-else
    class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800
           rounded-xl p-5 mb-4 font-mono"
  >
    <div v-for="shelf in data?.shelves" :key="shelf.title">

      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
        <h3 class="font-sans mt-3 mb-3 md:mb-0">{{ shelf.title }}</h3>

        <button
          v-if="!props.alwaysTable && !props.alwaysGrid"
          :aria-pressed="isTable"
          class="flex items-center gap-1 p-1 rounded-full bg-zinc-100 dark:bg-zinc-800
                 border border-zinc-200 dark:border-zinc-700"
          @click="toggleTable"
        >
          <span class="toggle-option" :class="{ 'toggle-option--active': !isTable }">Covers</span>
          <span class="toggle-option" :class="{ 'toggle-option--active':  isTable }">Table</span>
        </button>
      </div>

      <!-- Grid view -->
      <div v-show="!isTable" class="flex flex-row flex-wrap items-end justify-center md:justify-start">
        <NuxtLink
          v-for="item in shelf.items.slice(0, GRID_MAX)"
          :key="`${item.title}-${item.dateFinished}`"
          :title="itemTitle(item)"
          :to="item.url"
          class="mx-3 mb-6 relative no-underline overflow-hidden
                 drop-shadow-md hover:drop-shadow-lg hover:scale-105 transition-transform"
          target="_blank"
        >
          <!-- Date ribbon -->
          <div
            v-if="item.dateFinished && !isCurrent(shelf)"
            class="absolute top-[8px] right-[14px] translate-x-1/2 rotate-45
                   bg-black text-white text-[0.5rem] px-10 w-[max-content] shadow-md text-center"
          >
            {{ item.dateFinished.split(',')[0] }}
          </div>

          <img
            :alt="item.title"
            :src="item.coverSrc"
            class="w-[94px] rounded-none border-none shadow transition-opacity" 
          />

          <!-- NEW / 100% badges -->
          <template v-if="!isCurrent(shelf)">
            <div class="flex overflow-hidden w-24 absolute bottom-6">
              <div
                v-if="item.firstTime === 'yes'"
                class="bg-emerald-500 text-white text-[0.5rem] text-center"
                :class="item.completed === 'yes' ? 'w-1/2' : 'w-full'"
              >NEW</div>
              <div
                v-if="item.completed === 'yes' && item.firstTime === 'yes'"
                class="absolute bottom-[-3.5px] left-10 h-5 rotate-45
                       border-l-emerald-500 border-l-[8px] border-r-sky-600 border-r-[8px]"
              />
              <div
                v-if="item.completed === 'yes'"
                class="bg-sky-600 text-white text-[0.5rem] text-center"
                :class="item.firstTime === 'yes' ? 'w-1/2' : 'w-full'"
              >100%</div>
            </div>
            <div v-if="item.rating" class="text-center text-black dark:text-white">
              <span v-for="star in item.rating" :key="star">★</span>
            </div>
          </template>
        </NuxtLink>

        <!-- View all -->
        <NuxtLink
          v-if="shelf.items.length > TABLE_MAX"
          :to="shelf.viewAll"
          target="_blank"
          class="flex items-center justify-center text-center font-bold capitalize
                 h-[144px] w-24 mx-3 mb-12 no-underline
                 bg-gradient-to-l hover:bg-gradient-to-r
                 text-white hover:text-white
                 from-sky-600 to-emerald-400 dark:from-indigo-900 dark:to-black
                 drop-shadow-md hover:drop-shadow-lg hover:scale-105"
        >View all</NuxtLink>
      </div>

      <!-- Table view -->
      <div v-show="isTable" class="overflow-x-auto">
        <table class="w-full min-w-[540px] text-sm">
          <thead>
            <tr class="text-left border-b border-zinc-200 dark:border-zinc-800">
              <ShelfSortTh v-if="!isCurrent(shelf)" column="dateFinished" class="w-32" :active="sortColumn" :direction="sortDirection" @sort="sortByColumn">Date</ShelfSortTh>
              <ShelfSortTh column="title" :active="sortColumn" :direction="sortDirection" @sort="sortByColumn">Title</ShelfSortTh>
              <ShelfSortTh v-if="isGaming(shelf)" column="platform" :active="sortColumn" :direction="sortDirection" @sort="sortByColumn">Platform</ShelfSortTh>
              <ShelfSortTh v-if="isReading(shelf)" column="author" :active="sortColumn" :direction="sortDirection" @sort="sortByColumn">Author</ShelfSortTh>
              <th v-if="isFinished(shelf)" class="p-2">New</th>
              <th v-if="isFinished(shelf)" class="p-2">100%</th>
              <ShelfSortTh v-if="showRating(shelf)" column="rating" class="w-24 text-center" :active="sortColumn" :direction="sortDirection" @sort="sortByColumn">Rating</ShelfSortTh>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in sortedItems(shelf)"
              :key="`${item.title}-${item.dateFinished}`"
              class="h-14 border-b border-zinc-100 dark:border-zinc-800
                     hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <td v-if="!isCurrent(shelf) && item.dateFinished" class="p-2 w-32 text-right text-zinc-400 dark:text-zinc-500">{{ item.dateFinished }}</td>
              <td v-if="item.title"    class="p-2"><NuxtLink :to="item.url" target="_blank">{{ item.title }}</NuxtLink></td>
              <td v-if="item.platform" class="p-2 text-zinc-500 dark:text-zinc-400">{{ item.platform }}</td>
              <td v-if="item.author"   class="p-2 text-zinc-500 dark:text-zinc-400">{{ item.author }}</td>
              <td v-if="isFinished(shelf)" class="p-2 text-center text-xl text-emerald-500">
                <span v-if="item.firstTime === 'yes'" title="first playthrough" class="cursor-help">✔</span>
              </td>
              <td v-if="isFinished(shelf)" class="p-2 text-center text-xl text-sky-600">
                <span v-if="item.completed === 'yes'" title="100% completion"  class="cursor-help">✔</span>
              </td>
              <td v-if="showRating(shelf)" class="p-2 text-center text-lg">
                <span v-for="star in item.rating" :key="star">★</span>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="shelf.items.length > TABLE_MAX" class="flex justify-center my-4 text-sm">
          <NuxtLink :to="shelf.viewAll" target="_blank">View all</NuxtLink>
        </div>
      </div>
    </div>

    <p class="my-2 text-sm text-center text-zinc-400 dark:text-zinc-500">
      Last updated: {{ formatDate(data?.lastUpdated) }}
    </p>
  </div>
</template>

<style scoped>
.toggle-option {
  @apply px-4 py-1 text-xs font-medium rounded-full text-zinc-400 dark:text-zinc-500 transition-colors;
}
.toggle-option--active {
  @apply bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 shadow-sm;
}
</style>