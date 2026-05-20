<script setup lang="ts">
defineProps<{
  projects: { id: number; title: string; location: string; date: string; image: string }[]
}>()
</script>

<template>
  <div class="mb-6">
    <div class="flex items-center justify-between mb-4 px-2">
      <h2 class="text-lg font-bold text-amber-900">Recent Projects</h2>
      <button class="text-xs font-bold text-teal-600 hover:text-teal-700">View All</button>
    </div>

    <!-- Horizontal scroll for projects -->
    <div class="flex overflow-x-auto space-x-4 pb-4 px-2 scrollbar-hide">
      <div
        v-for="project in projects"
        :key="project.id"
        class="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
      >
        <div class="h-32 w-full bg-gray-200">
          <img :src="project.image" :alt="project.title" class="w-full h-full object-cover" />
        </div>
        <div class="p-4 flex flex-col flex-1">
          <h3 class="text-sm font-bold text-gray-900 mb-1 line-clamp-1">{{ project.title }}</h3>
          <p class="text-[10px] font-medium text-gray-500 mt-auto">
            {{ project.location }} • {{ project.date }}
          </p>
        </div>
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
