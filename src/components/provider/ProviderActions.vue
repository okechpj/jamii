<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <div
    class="bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 sticky bottom-0 z-50 flex items-center justify-end space-x-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
  >
    <button
      class="h-12 w-12 rounded-xl border border-slate-200 text-brand-indigo flex items-center justify-center hover:bg-slate-50 focus:outline-none transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    </button>

    <button
      class="h-12 w-12 rounded-xl border border-slate-200 text-brand-indigo flex items-center justify-center hover:bg-slate-50 focus:outline-none transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    </button>

    <router-link :to="'/provider/' + ($route.params.id || '1') + '/track'">
      <BaseButton variant="primary" class="px-8 shadow-md" type="button">
        Book Service
      </BaseButton>
    </router-link>
  </div>
</template>
