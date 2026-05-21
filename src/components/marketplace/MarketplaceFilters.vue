<script setup lang="ts">
import { ref } from 'vue'

const filters = ['Most trusted in your area', 'Trusted by friends', 'Highly Rated', 'Available Now']
const activeFilter = ref(filters[0])
</script>

<template>
  <div class="bg-white pb-3 pt-1">
    <div class="flex overflow-x-auto space-x-3 pb-1 scrollbar-hide px-4">
      <button
        v-for="filter in filters"
        :key="filter"
        @click="activeFilter = filter"
        class="whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-colors flex-shrink-0 flex items-center border"
        :class="
          activeFilter === filter
            ? 'bg-brand-indigo text-white border-brand-indigo'
            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
        "
      >
        <svg
          v-if="activeFilter === filter"
          xmlns="http://www.w3.org/2000/svg"
          class="h-3.5 w-3.5 mr-1.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        {{ filter }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
