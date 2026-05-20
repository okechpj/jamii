<script setup lang="ts">
import FeedCTA from './FeedCTA.vue'
</script>

<template>
  <div
    class="hidden lg:block w-80 sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto px-4 py-4"
  >
    <h3 class="text-gray-500 font-semibold text-lg mb-4 px-2">Sponsored</h3>

    <!-- Using the FeedCTA component natively as a sidebar widget -->
    <div class="rounded-xl overflow-hidden shadow-sm mb-6">
      <FeedCTA class="!my-0 !shadow-none" />
    </div>

    <hr class="border-gray-200 my-4" />

    <div class="flex items-center justify-between px-2 mb-4">
      <h3 class="text-gray-500 font-semibold text-lg">Your Friends</h3>
      <div class="flex space-x-3 text-gray-400">
        <button class="hover:text-gray-600 focus:outline-none"></button>
        <button class="hover:text-gray-600 focus:outline-none">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button class="hover:text-gray-600 focus:outline-none">
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
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
      </div>
    </div>

    <ul class="space-y-1">
      <li v-for="i in 8" :key="i">
        <a
          href="#"
          class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 transition-colors relative"
        >
          <div class="h-9 w-9 rounded-full overflow-hidden bg-gray-300">
            <img
              :src="`https://i.pravatar.cc/150?u=contact${i}`"
              alt="Contact"
              class="h-full w-full object-cover"
            />
          </div>
          <span
            class="absolute bottom-2 left-8 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"
          ></span>
          <span class="font-medium text-gray-800 text-sm">Local Contact {{ i }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Hide scrollbar but keep functionality */
div::-webkit-scrollbar {
  width: 8px;
}
div::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 4px;
}
div:hover::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
}
</style>
