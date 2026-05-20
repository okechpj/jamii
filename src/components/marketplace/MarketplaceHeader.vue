<script setup lang="ts">
import { ref } from 'vue'
import { useSearch } from '@/composables/useSearch'

const { globalSearchQuery } = useSearch()
</script>

<template>
  <div class="px-4 pt-4 pb-2 bg-white">
    <!-- User Info Row -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div class="h-10 w-10 rounded-full overflow-hidden bg-gray-200 border border-gray-100">
          <img
            src="https://i.pravatar.cc/150?u=chidi"
            alt="Profile"
            class="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 class="text-lg font-bold text-amber-900 leading-tight">Habari, Chidi</h1>
          <div class="flex items-center text-xs text-gray-500 mt-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3 mr-1 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Kilimani, Nairobi
          </div>
        </div>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="relative mb-3">
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
        class="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-white text-sm focus:ring-teal-500 focus:border-teal-500 shadow-sm"
        placeholder="What service do you need today?"
      />
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <button class="text-teal-600 focus:outline-none">
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
  </div>
</template>
