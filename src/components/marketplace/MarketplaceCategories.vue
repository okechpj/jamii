<script setup lang="ts">
defineProps<{
  categories: {
    id: string
    label: string
    iconPath: string
  }[]
}>()
</script>

<template>
  <div class="px-4 py-4 bg-white">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold text-gray-900">Service Categories</h2>
      <button class="text-sm font-bold text-teal-600 hover:text-teal-700 focus:outline-none">
        See All
      </button>
    </div>

    <div class="flex overflow-x-auto space-x-5 pb-2 scrollbar-hide -mx-4 px-4">
      <div
        v-for="(cat, index) in categories"
        :key="cat.id"
        class="flex flex-col items-center flex-shrink-0"
      >
        <button
          class="h-16 w-16 rounded-3xl flex items-center justify-center transition-colors shadow-sm border border-gray-50 mb-2"
          :class="
            index === 0
              ? 'bg-cyan-200 text-teal-900'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="cat.iconPath"
            />
          </svg>
        </button>
        <span class="text-xs font-semibold text-gray-800">{{ cat.label }}</span>
      </div>
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
