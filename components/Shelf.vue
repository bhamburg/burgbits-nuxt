<script setup lang="ts">
import { formatDate } from '~/utils/contentHelpers';

const props = defineProps({
  alwaysGrid: Boolean,
  alwaysTable: Boolean,
  dataPath: String,
  grid: Boolean,
  table: Boolean
})

const source = props.dataPath
const { status, data: data } = useFetch<any>(source!, {
  server: false,
  lazy: true,
})

const isTable = ref(false)
const sortColumn = ref('dateFinished')
const sortDirection = ref('desc')

const sortByColumn = (column: string) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

const sortedShelf = (shelf: any) => {
  return {
    ...shelf,
    __sortedItems: shelf.items.slice(0, 17).sort((a: any, b: any) => {
      if (sortColumn.value === 'dateFinished') {
        return sortDirection.value === 'asc' 
          ? new Date(a.dateFinished).getTime() - new Date(b.dateFinished).getTime() 
          : new Date(b.dateFinished).getTime() - new Date(a.dateFinished).getTime()
      }
      if (sortColumn.value === 'title') {
        return sortDirection.value === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title)
      }
      if (sortColumn.value === 'author') {
        return sortDirection.value === 'asc' 
          ? a.author.localeCompare(b.author) 
          : b.author.localeCompare(a.author)
      }
      if (sortColumn.value === 'platform') {
        return sortDirection.value === 'asc' 
          ? a.platform?.localeCompare(b.platform) 
          : b.platform?.localeCompare(a.platform)
      }
      if (sortColumn.value === 'rating') {
        return sortDirection.value === 'asc' 
          ? a.rating - b.rating 
          : b.rating - a.rating
      }
      return 0
    })
  }
}

const toggleTable = () => {
  if (!props.alwaysGrid || !props.alwaysTable) {
    isTable.value = !isTable.value
  }
}

watchEffect(() => {
  if (props.alwaysTable || props.table) {
    isTable.value = true
  }
})
</script>

<template>
  <div v-if="status === 'pending'" class=" font-mono bg-zinc-100 dark:bg-zinc-700 text-zinc-500 text-center p-4 mb-4 rounded-lg shadow">
    Loading shelf...
  </div>
  <div v-else class=" font-mono bg-zinc-100 dark:bg-zinc-700 p-4 mb-4 rounded-lg shadow">
    <div v-for="shelf in data.shelves">
      <div class="flex flex-col justify-between items-center mb-4 md:flex-row">
        <h3 class="font-sans mt-3 mb-3">{{ shelf.title }}</h3>
        <div v-if="!props.alwaysTable && !props.alwaysGrid">
          <button 
            @click="toggleTable"
            title="toggle table"
            class="relative mb-4"
          >
            <div 
              id="switch-toggle" 
              class="flex items-center bg-zinc-200 dark:bg-zinc-600 rounded-full p-1 after:absolute after:left-1 after: after:h-6 after:w-20 after:rounded-full after:bg-black/10 dark:after:bg-white/20 after:transition-all after:content-['']"
              :class="isTable ? 'after:translate-x-full' : ''">
              <div class="w-20">Covers</div>
              <div class="w-20">Table</div>
            </div>
            <span class="sr-only">toggle table</span>
          </button>
        </div>
      </div>

      <!-- grid view -->
      <div v-show="!isTable" class="flex flex-row flex-wrap items-end justify-center md:justify-start no-underline">
        <NuxtLink v-for="item in shelf.items.slice(0, 23)" :key="item.title+'-'+item.dateFinished" :title="
            item.title  
            + (item.author ? ` - ${item.author}` : '') 
            + (item.platform ? ` - ${item.platform}` : '')
            + (item.firstTime ? ' - First Playthrough' : '')
            + (item.completed ? ' - 100% Completion' : '')
            + (item.dateFinished ? ` - Finished on ${item.dateFinished}` : '')
            + (item.rating ? ` - ${item.rating} out of 5 stars` : '')
          " :to="item.url" 
          class="mx-[12.3px] 
            mb-6 
            drop-shadow-md 
            hover:drop-shadow-lg 
            hover:scale-105 
            relative
            no-underline 
            overflow-hidden" 
          target="_blank"
        >
          <div v-if="item.dateFinished && !shelf.title.toLowerCase().includes('current')" 
            class="
              bg-black 
              text-white 
              text-[0.5rem]
              absolute
              px-10
              w-[max-content]
              top-[8px]
              right-[14px]
              shadow-md
              text-center
              translate-x-1/2
              rotate-45"
          >
            {{ item.dateFinished?.split(",")[0] }}
          </div>
          <img :alt="item.title" 
            :src="item.coverSrc" 
            class="w-24 
              rounded-none 
              border-none 
              transition-opacity
              shadow" 
          />
          <div v-if="!shelf.title.toLowerCase().includes('current')">
            <div class="flex overflow-hidden w-24 absolute bottom-6">
              <div v-if="item.firstTime" :class="item.completed ? 'w-1/2' : 'w-full'" class="
                bg-emerald-500 
                text-white 
                text-[0.5rem] 
                text-center 
                w-1/2"
              >
                NEW
              </div>
              <div 
                v-if="item.completed && item.firstTime" 
                class="
                  border-t-0
                  border-b-0
                  border-l-emerald-500 
                  border-l-[8px] 
                  border-r-sky-600 
                  border-r-[8px] 
                  h-5
                  rotate-45
                  absolute
                  bottom-[-3.5px]
                  left-10"
              />
              <div v-if="item.completed === 'A'" :class="item.firstTime ? 'w-1/2' : 'w-full'" class="
                  bg-sky-600 
                  text-white 
                  text-[0.5rem] 
                  text-center 
                ">
                100%
              </div>
            </div>
          </div>
          <div v-if="item.rating && !shelf.title.toLowerCase().includes('current')" class="text-center text-black dark:text-white">
            <span v-for="star in item.rating" :key="star">★</span>
          </div>
        </NuxtLink>
        <NuxtLink v-if="shelf.items.length > 17" :to="shelf.viewAll" target="_blank" 
          class="flex items-center text-center font-bold capitalize justify-center h-[144px] w-24 mx-3 mb-12
            bg-gradient-to-l hover:bg-gradient-to-r text-white hover:text-white from-sky-600 to-emerald-400 dark:from-indigo-900 dark:to-black 
            drop-shadow-md hover:drop-shadow-lg no-underline hover:scale-105">
          View all
        </NuxtLink>
      </div>
      
      <!-- table view -->
      <div v-show="isTable" class="overflow-x-auto">
        <table class="w-full min-w-[540px] text-sm">
          <thead>
            <tr class="text-left">
              <th 
                v-if="!shelf.title.toLowerCase().includes('current')"  
                class="p-2 cursor-pointer w-32"
                @click="sortByColumn('dateFinished')"
              >
                Date 
                <span v-if="sortColumn === 'dateFinished'">
                  <span v-if="sortDirection === 'asc'" title="sorted ascending by date">▲</span>
                  <span v-else title="sorted descending by date">▼</span>
                </span>
              </th>
              <th 
                class="p-2 cursor-pointer"
                @click="sortByColumn('title')"
              >
                Title
                <span v-if="sortColumn === 'title'">
                  <span v-if="sortDirection === 'asc'" title="sorted ascending by title">▲</span>
                  <span v-else title="sorted descending by title">▼</span>
                </span>
              </th>
              <th 
                v-if="shelf.title.toLowerCase().includes('play') || shelf.title.toLowerCase().includes('finished')" 
                class="p-2 cursor-pointer"
                @click="sortByColumn('platform')">
                Platform
                <span v-if="sortColumn === 'platform'">
                  <span v-if="sortDirection === 'asc'" title="sorted ascending by platform">▲</span>
                  <span v-else title="sorted descending by platform">▼</span>
                </span>
              </th>
              <th 
                v-if="shelf.title.toLowerCase().includes('read')" 
                class="p-2 cursor-pointer"
                @click="sortByColumn('author')"
              >
                Author
                <span v-if="sortColumn === 'author'">
                  <span v-if="sortDirection === 'asc'" title="sorted ascending by author">▲</span>
                  <span v-else title="sorted descending by author">▼</span>
                </span>
              </th>
              <th v-if="shelf.title.toLowerCase().includes('finished')" class="p-2">
                New
              </th>
              <th v-if="shelf.title.toLowerCase().includes('finished')" class="p-2">
                100%
              </th>
              <th 
                v-if="!shelf.title.toLowerCase().includes('current') && !shelf.title.toLowerCase().includes('run')" 
                class="p-2 w-24 text-center cursor-pointer"
                @click="sortByColumn('rating')"
              >
                Rating
                <span v-if="sortColumn === 'rating'" class="text-sm">
                  <span v-if="sortDirection === 'asc'" title="sorted ascending by rating">▲</span>
                  <span v-else title="sorted descending by rating">▼</span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in sortedShelf(shelf).__sortedItems" 
              :key="item.title+'-'+item.dateFinished" 
              class="h-14 odd:bg-zinc-200 dark:odd:bg-zinc-600"
            >
              <td 
                v-if="!shelf.title.toLowerCase().includes('current') && item.dateFinished" 
                class="p-2 text-right w-32"
              >
                {{ item.dateFinished }}
              </td>
              <td v-if="item.title" class="p-2">
                <NuxtLink :to="item.url" target="_blank">{{ item.title }}</NuxtLink>
              </td>
              <td v-if="item.platform" class="p-2">{{ item.platform }}</td>
              <td v-if="item.author" class="p-2">{{ item.author }}</td>
              <td v-if="!shelf.title.toLowerCase().includes('current') && shelf.title.toLowerCase().includes('finished')" 
                class="text-emerald-500 text-center text-2xl p-2">
                <span v-if="item.firstTime" class="cursor-help" title="first playthrough">✔</span>
              </td>
              <td v-if="!shelf.title.toLowerCase().includes('current') && shelf.title.toLowerCase().includes('finished')" 
                class="text-sky-600 text-center text-2xl p-2">
                <span v-if="item.completed === 'A'" class="cursor-help" title="100% completion">✔</span>
              </td>
              <td v-if="!shelf.title.toLowerCase().includes('current')" class="p-2 text-xl text-center">
                <span v-for="star in item.rating" :key="star">★</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="isTable" class="flex justify-center my-4 text-sm">
        <NuxtLink 
          v-if="shelf.items.length > 17" 
          :to="shelf.viewAll" 
          target="_blank"
        >
          View all
        </NuxtLink>
      </div>
    </div>
    <p class="my-2 text-sm text-center text-zinc-500">
        Last updated: {{ formatDate(data.lastUpdated) }}
    </p>
  </div>
</template>