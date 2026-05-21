<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="px-4 py-4 bg-brand-indigo text-white sticky top-0 z-50 shadow-sm">
    <!-- Top Nav -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center text-white font-bold text-lg">
        <button @click="router.back()" class="p-1.5 -ml-1.5 mr-2 focus:outline-none hover:bg-white/10 rounded-full transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5.5 w-5.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        Jamii Sasa
      </div>
      <button class="text-white p-1.5 focus:outline-none hover:bg-white/10 rounded-full transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5.5 w-5.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </button>
    </div>

    <!-- Header Text -->
    <div>
      <h1 class="text-2xl font-extrabold text-white mb-1">Confirm Your Order</h1>
      <p class="text-[13px] font-medium text-slate-200">
        You're booking a trusted verified provider.
      </p>
    </div>
  </div>
</template>
