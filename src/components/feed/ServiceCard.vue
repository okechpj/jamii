<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  service: {
    id: number
    title: string
    category: string
    providerName: string
    providerAvatar: string
    rating: number
    verified: boolean
    image: string
    review: string
  }
}>()

function openProfile() {
  router.push(`/provider/${props.service.id}`)
}
</script>

<template>
  <div
    class="flex-shrink-0 w-64 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col cursor-pointer"
    @click="openProfile"
  >
    <!-- Image with Rating Badge -->
    <div class="relative h-36 w-full">
      <img :src="service.image" :alt="service.title" class="w-full h-full object-cover" />
      <div
        class="absolute top-2 right-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-md flex items-center shadow-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3 text-yellow-400 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
        {{ service.rating.toFixed(1) }}
      </div>
    </div>

    <!-- Details -->
    <div class="p-3 flex-1 flex flex-col">
      <div class="flex justify-between items-start mb-1">
        <h3 class="font-bold text-brand-indigo text-sm truncate pr-2">{{ service.title }}</h3>
        <svg
          v-if="service.verified"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-brand-indigo flex-shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <p class="text-xs text-brand-slate mb-3">{{ service.category }}</p>

      <!-- Provider Info & Review snippet -->
      <div class="mt-auto flex items-center space-x-2 border-t border-slate-100 pt-2">
        <div class="h-6 w-6 rounded-full overflow-hidden flex-shrink-0 bg-slate-100">
          <img
            :src="service.providerAvatar"
            :alt="service.providerName"
            class="w-full h-full object-cover"
          />
        </div>
        <p class="text-[11px] text-brand-slate italic truncate" :title="service.review">
          {{ service.review }}
        </p>
      </div>
    </div>
  </div>
</template>
