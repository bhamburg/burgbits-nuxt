<template>
  <article class="card-trio">
    <slot name="default" />
  </article>
</template>

<style scoped>
article {
  @apply grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-7 mt-4 lg:mt-10;
}

/* Base card transition and hover effect */
:slotted(.card) {
  @apply transition-transform duration-300 ease-out;
}
:slotted(.card:hover) {
  @apply -translate-y-1.5; /* Shifts up by 6px. Use -translate-y-1 or -translate-y-2 to adjust amount */
}

/* Card Highlights - Ultra Subtle Ambient Glow */
:slotted(.card:nth-child(1)) { 
  @apply bg-gradient-to-b from-sky-500/15 to-transparent dark:from-indigo-500/10; 
}
:slotted(.card:nth-child(2)) { 
  @apply bg-gradient-to-b from-orange-500/15 to-transparent dark:from-blue-500/10;
}
:slotted(.card:nth-child(3)) { 
  @apply bg-gradient-to-b from-emerald-400/15 to-transparent dark:from-purple-500/10; 
}

/* Fade-up entrance */
.fade-up {
  animation: fadeUp 0.45s ease backwards;
}
:slotted(.card:nth-child(1)) { animation: fadeUp 0.45s 0.1s ease backwards; }
:slotted(.card:nth-child(2)) { animation: fadeUp 0.45s 0.2s ease backwards; }
:slotted(.card:nth-child(3)) { animation: fadeUp 0.45s 0.3s ease backwards; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>