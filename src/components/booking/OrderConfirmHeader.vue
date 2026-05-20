<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="px-4 py-3 bg-[#FCFAF8] sticky top-0 z-50">
    <!-- Top Nav -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center text-teal-800 font-bold">
        <button @click="router.back()" class="p-1 -ml-1 mr-2 focus:outline-none">
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        Jamii Sasa
      </div>
      <button class="text-teal-800 p-1 focus:outline-none">
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
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </button>
    </div>

    <!-- Header Text -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900 mb-1">Confirm Your Order</h1>
      <p class="text-[13px] font-medium text-gray-500">
        You're booking a trusted verified provider.
      </p>
    </div>
  </div>
</template>
