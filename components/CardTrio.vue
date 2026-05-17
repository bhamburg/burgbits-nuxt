<template>
  <article class="card-trio">
    <!-- Default Slot for the regular text -->
    <slot name="default" />

    <!-- Clean named slot handling without collisions -->
    <div class="unwrapped-content">
      <slot name="unwrap" mdc-unwrap="p" />
    </div>
  </article>
</template>

<style scoped>
article {
  @apply grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-7 mt-4 lg:mt-10;
}

/* Card Highlights */
:slotted(.card) { @apply border-t-2 mb-2; }
:slotted(.card:nth-child(1)) { @apply border-t-sky-500 dark:border-t-indigo-500; }
:slotted(.card:nth-child(2)) { @apply border-t-orange-500 dark:border-t-blue-500; }
:slotted(.card:nth-child(3)) { @apply border-t-emerald-400 dark:border-t-purple-500; }

/* Fade-up entrance */
.fade-up {
  animation: fadeUp 0.45s ease both;
}
:slotted(.card:nth-child(1)) { animation: fadeUp 0.45s 0.1s ease both; }
:slotted(.card:nth-child(2)) { animation: fadeUp 0.45s 0.2s ease both; }
:slotted(.card:nth-child(3)) { animation: fadeUp 0.45s 0.3s ease both; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>