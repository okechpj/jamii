<script setup lang="ts">
import ServiceCard from './ServiceCard.vue'

defineProps<{
  services: Array<{
    id: number
    title: string
    category: string
    providerName: string
    providerAvatar: string
    rating: number
    verified: boolean
    image: string
    review: string
  }>
}>()
</script>

<template>
  <div class="bg-brand-offwhite py-4">
    <div class="px-4 flex justify-between items-center mb-3">
      <h2 class="text-base font-bold text-brand-indigo">Book with Confidence</h2>
      <button class="text-sm text-brand-indigo font-bold flex items-center hover:text-brand-indigo/80">
        View all
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </div>

    <!-- Carousel -->
    <div class="flex overflow-x-auto space-x-4 px-4 pb-2 scrollbar-hide">
      <ServiceCard v-for="service in services" :key="service.id" :service="service" />
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
