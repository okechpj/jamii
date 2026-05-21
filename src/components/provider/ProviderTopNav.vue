<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50">
    <div class="flex items-center">
      <button
        @click="router.back()"
        class="p-2 -ml-2 text-brand-indigo hover:text-brand-indigo/80 focus:outline-none"
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
      <h1 class="text-lg font-bold text-brand-indigo ml-2">Provider Profile</h1>
    </div>

    <div class="flex items-center space-x-4">
      <button class="text-brand-indigo hover:text-brand-indigo/80 focus:outline-none">
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
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
      <div class="h-8 w-8 rounded-full overflow-hidden border border-gray-200">
        <img
          src="https://i.pravatar.cc/150?u=current_user"
          alt="Profile"
          class="h-full w-full object-cover"
        />
      </div>
    </div>
  </div>
</template>
