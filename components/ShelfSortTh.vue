<script setup lang="ts">
defineProps<{
  column: string
  active: string
  direction: 'asc' | 'desc'
}>()

const emit = defineEmits<{ sort: [column: string] }>()
</script>

<template>
  <th class="p-2 cursor-pointer select-none whitespace-nowrap" @click="emit('sort', column)">
    <slot />
    <span v-if="active === column" class="ml-1 text-xs text-zinc-400">
      {{ direction === 'asc' ? '▲' : '▼' }}
    </span>
  </th>
</template>