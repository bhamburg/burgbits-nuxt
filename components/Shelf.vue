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

const tableStates = ref<Record<string, boolean>>({})

const isTable = (shelf: any) => {
  if (props.alwaysTable || props.table) return true
  if (props.alwaysGrid) return false
  // Default to whatever the prop says; lazy-init on first access
  return tableStates.value[shelf.title] ?? (props.table ?? false)
}

const toggleTable = (shelf: any) => {
  if (!props.alwaysGrid && !props.alwaysTable) {
    tableStates.value[shelf.title] = !isTable(shelf)
  }
}

// ── Shelf type helpers ────────────────────────────────────────────────────────

const shelfIs = (shelf: any, ...keywords: string[]) =>
  keywords.some(kw => shelf.title.toLowerCase().includes(kw))

const isCurrent  = (s: any) => shelfIs(s, 'current');
const isFinished = (s: any) => shelfIs(s, 'finished')
const isGaming   = (s: any) => shelfIs(s, 'play', 'finished');
const isParades  = (s: any) => shelfIs(s, 'theme');
const isReading  = (s: any) => shelfIs(s, 'read');
const isVideo    = (s: any) => shelfIs(s, 'watch');
const showRating = (s: any) => shelfIs(s, 'finished', 'read', 'watch') && !isCurrent(s);

// ── Sorting ───────────────────────────────────────────────────────────────────

const sortColumn    = ref('dateFinished')
const sortDirection = ref<'asc' | 'desc'>('desc')

const sortByColumn = (column: string) => {
  sortDirection.value = sortColumn.value === column && sortDirection.value === 'asc' ? 'desc' : 'asc'
  sortColumn.value = column
}

const comparators: Record<string, (a: any, b: any) => number> = {
  title:        (a, b) => a.title.localeCompare(b.title),
  author:       (a, b) => (a.author   ?? '').localeCompare(b.author   ?? ''),
  dateFinished: (a, b) => new Date(a.dateFinished).getTime() - new Date(b.dateFinished).getTime(),
  rating:       (a, b) => a.rating - b.rating,
  platform:     (a, b) => (a.platform ?? '').localeCompare(b.platform ?? ''),
  band:         (a, b) => (a.band     ?? '').localeCompare(b.band     ?? ''),
  prize:        (a, b) => a.prize - b.prize,
  suit:         (a, b) => (a.suit     ?? '').localeCompare(b.suit     ?? ''),
  time:         (a, b) => {
    const toSeconds = (t: string) => t.split(':').reduce((acc, part) => acc * 60 + +part, 0)
    return toSeconds(a.time ?? '0') - toSeconds(b.time ?? '0')
  },
  pace:         (a, b) => {
    const toSeconds = (t: string) => t.split(':').reduce((acc, part) => acc * 60 + +part, 0)
    return toSeconds(a.pace ?? '0') - toSeconds(b.pace ?? '0')
  },
}

const TABLE_MAX = 50
const GRID_MAX  = 23

const sortedItems = (shelf: any) => {
  const cmp = comparators[sortColumn.value] ?? (() => 0)
  const items = shelf.items.slice(0, TABLE_MAX).sort(cmp)
  return sortDirection.value === 'desc' ? items.reverse() : items
}

const filteredItems = (item: any) => [
  item.title,
  item.author,
  item.dateFinished        && `Finished ${item.dateFinished}`,
  item.platform,
  item.firstTime === 'yes' && 'First Playthrough',
  item.completed === 'yes' && '100% Completion',
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
          :aria-pressed="isTable(shelf)"
          class="flex items-center gap-1 p-1 mt-3 rounded-full bg-zinc-100 dark:bg-zinc-800
                border border-zinc-200 dark:border-zinc-700"
          @click="toggleTable(shelf)"
        >
          <span class="toggle-option" :class="{ 'toggle-option--active': !isTable(shelf) }">Covers</span>
          <span class="toggle-option" :class="{ 'toggle-option--active': isTable(shelf) }">Table</span>
        </button>
      </div>

      <!-- Grid view -->
      <div v-show="!isTable(shelf) && shelf.items[0].coverSrc" class="flex flex-row flex-wrap items-end justify-center md:justify-start">
        <NuxtLink
          v-for="item in shelf.items.slice(0, GRID_MAX)"
          :key="`${item.title}-${item.dateFinished}`"
          :title="filteredItems(item)"
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
            v-if="item.coverSrc"
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
          v-if="shelf.items.length > GRID_MAX"
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
      <div v-show="isTable(shelf)" class="mb-4 overflow-x-auto">
        <table class="w-full min-w-[540px] text-sm">
          <thead>
            <tr class="text-left border-b border-zinc-200 dark:border-zinc-800">
              <ShelfSortTh v-if="!isCurrent(shelf)"
                column="dateFinished"
                class="text-right w-32"
                :active="sortColumn"
                :direction="sortDirection"
                @sort="sortByColumn"
              >
                Date
              </ShelfSortTh>
              <ShelfSortTh v-if="isFinished(shelf) || isGaming(shelf) || isReading(shelf) || isVideo(shelf) || isParades(shelf)"
                column="title"
                :active="sortColumn"
                :direction="sortDirection"
                @sort="sortByColumn"
              >
                Title
              </ShelfSortTh>
              <ShelfSortTh v-if="isGaming(shelf)"
                column="platform"
                :active="sortColumn"
                :direction="sortDirection"
                @sort="sortByColumn"
              >
                Platform
              </ShelfSortTh>
              <ShelfSortTh v-if="isReading(shelf)"
                column="author"
                :active="sortColumn"
                :direction="sortDirection"
                @sort="sortByColumn"
              >
                Author
              </ShelfSortTh>
              <!-- Gaming -->
              <th v-if="isFinished(shelf)" class="p-2">New</th>
              <th v-if="isFinished(shelf)" class="p-2">100%</th>
              <ShelfSortTh v-if="showRating(shelf)"
                column="rating"
                class="w-24 text-center"
                :active="sortColumn"
                :direction="sortDirection"
                @sort="sortByColumn"
              >
                Rating
              </ShelfSortTh>
              <!-- Parades -->
              <ShelfSortTh v-if="isParades(shelf)"
                class="p-2 text-center"
                column="band"
                :active="sortColumn"
                :direction="sortDirection"
                @sort="sortByColumn"
              >
                Band
              </ShelfSortTh>
              <ShelfSortTh v-if="isParades(shelf)"
                class="p-2 text-center"
                column="prize"
                :active="sortColumn"
                :direction="sortDirection"
                @sort="sortByColumn"
              >
                Prize
              </ShelfSortTh>
              <ShelfSortTh v-if="isParades(shelf)" 
                class="p-2 text-center" column="suit"
                :active="sortColumn"
                :direction="sortDirection"
                @sort="sortByColumn"
              >
                Suit
              </ShelfSortTh>
              <!-- Concerts
              <th v-if="shelfIs(shelf, 'concert')" class="p-2 text-center">Artist</th>
              <th v-if="shelfIs(shelf, 'concert')" class="p-2 text-center">Venue</th>
              <th v-if="shelfIs(shelf, 'concert')" class="p-2 text-center">City</th>
              -->
              <!-- Runs -->
              <th v-if="shelfIs(shelf, 'run')" class="p-2 text-center">Name</th>
              <th v-if="shelfIs(shelf, 'run')" class="p-2 text-center">Time</th>
              <th v-if="shelfIs(shelf, 'run')" class="p-2 text-center">Pace</th>
              <th v-if="shelfIs(shelf, 'run')" class="p-2 text-center">Miles</th>
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
              <!-- Parades -->
              <td v-if="item.band" class="p-2 text-center text-zinc-500 dark:text-zinc-400">{{ item.band }}</td>
              <td v-if="item.prize" class="p-2 text-center text-zinc-500 dark:text-zinc-400">{{ item.prize }}</td>
              <td v-if="item.suit" class="p-2 text-center text-xl text-emerald-500">
                <span v-if="item.suit.toLowerCase() === 'yes'" title="paraded in costume" class="cursor-help">✔</span>
              </td>
              <!-- Runs -->
              <td v-if="item.name" class="p-2 text-zinc-500 dark:text-zinc-400">{{ item.name }}</td>
              <td v-if="item.time" class="p-2 text-center text-zinc-500 dark:text-zinc-400">{{ item.time }}</td>
              <td v-if="item.pace" class="p-2 text-center text-zinc-500 dark:text-zinc-400">{{ item.pace }}</td>
              <td v-if="item.miles" class="p-2 text-center text-zinc-500 dark:text-zinc-400">{{ item.miles }}</td>
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