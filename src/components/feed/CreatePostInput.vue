<script setup lang="ts">
import { useModal } from '@/composables/useModal'

const { openCreatePostModal } = useModal()
</script>

<template>
  <div class="bg-white px-4 py-4 border-b border-gray-100">
    <h2 class="text-sm font-bold text-gray-900 mb-3">Ungana na Jamii</h2>
    <div class="flex items-center space-x-3">
      <!-- Input box -->
      <div
        @click="openCreatePostModal"
        class="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-100 transition-colors cursor-text"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span class="text-sm text-gray-400">Create a post....</span>
      </div>

      <!-- Image Upload Icon -->
      <button
        @click="openCreatePostModal"
        class="p-2 text-gray-500 hover:text-teal-600 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
