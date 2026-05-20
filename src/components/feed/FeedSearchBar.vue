<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSearch } from '@/composables/useSearch'

const props = defineProps<{
  categories: string[]
  collapsed?: boolean
}>()
const emit = defineEmits<{
  (event: 'open-search'): void
}>()

const { globalSearchQuery } = useSearch()
const activeCategory = ref('All')

const showCompact = computed(() => props.collapsed === true)

function openSearch() {
  emit('open-search')
}
</script>

<template>
  <div class="bg-white transition-all duration-300">
    <div v-if="showCompact" class="px-4 pb-2">
      <button
        @click="openSearch"
        class="inline-flex w-full items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search Jamii Sasa
      </button>
    </div>

    <div v-else class="px-4 pb-4">
      <div class="relative mb-4">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          v-model="globalSearchQuery"
          type="text"
          class="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:ring-teal-500 focus:border-teal-500"
          placeholder="Discover local goods & services..."
        />
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button class="text-gray-400 hover:text-teal-600 focus:outline-none">
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
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex overflow-x-auto space-x-2 pb-1 scrollbar-hide -mx-4 px-4">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          class="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors shrink-0 flex items-center border"
          :class="
            activeCategory === cat
              ? 'bg-teal-700 text-white border-teal-700'
              : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
          "
        >
          <svg
            v-if="cat === 'All'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <svg
            v-if="cat === 'Business'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <svg
            v-if="cat === 'Art'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <svg
            v-if="cat === 'Construction'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          {{ cat }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
