<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()

const props = defineProps<{
  provider: {
    id: number
    serviceTitle: string
    providerName: string
    providerAvatar: string
    trustedCount: number
    verified: boolean
    rating: number
    reviewsCount: number
    experience: string
    responseSpeed: string
    reviewSnippet: string
    stats: {
      completed: string
      responseRate: string
      repeatRate: string
    }
    image: string
    saved: boolean
  }
}>()

function openProfile() {
  router.push(`/provider/${props.provider.id}`)
}
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col mx-4 my-4 cursor-pointer"
    @click="openProfile"
  >
    <!-- Image Header with Overlays -->
    <div class="relative h-48 w-full">
      <img :src="provider.image" :alt="provider.serviceTitle" class="w-full h-full object-cover" />

      <!-- Rating Badge -->
      <div
        class="absolute top-3 left-3 bg-white/95 backdrop-blur text-xs font-bold px-2.5 py-1.5 rounded-xl flex items-center shadow-sm text-brand-indigo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3.5 w-3.5 text-brand-gold mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
        {{ provider.rating.toFixed(1) }}
        <span class="text-brand-slate ml-1 font-medium">({{ provider.reviewsCount }} reviews)</span>
      </div>

      <!-- Save Button -->
      <button
        class="absolute top-3 right-3 bg-white h-8 w-8 rounded-xl flex items-center justify-center shadow-sm text-brand-indigo focus:outline-none hover:bg-brand-indigo/5 transition-colors"
        @click.stop
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          :fill="provider.saved ? 'currentColor' : 'none'"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      </button>
    </div>

    <!-- Details Section -->
    <div class="p-5">
      <!-- Provider Header -->
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-full overflow-hidden bg-brand-indigo/5">
          <img
            :src="provider.providerAvatar"
            :alt="provider.providerName"
            class="h-full w-full object-cover"
          />
        </div>
        <div>
          <div class="flex items-center">
            <h3 class="font-bold text-brand-indigo text-sm">{{ provider.providerName }}</h3>
            <svg
              v-if="provider.verified"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-brand-indigo ml-1"
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
          <p class="text-[11px] text-brand-slate font-medium">
            Trusted by {{ provider.trustedCount }} people
          </p>
        </div>
      </div>

      <!-- Service Info -->
      <h2 class="text-lg font-bold text-brand-indigo mb-2">{{ provider.serviceTitle }}</h2>
      <div class="flex items-center space-x-4 text-xs font-semibold text-brand-slate mb-4">
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1 text-brand-slate/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {{ provider.experience }}
        </div>
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1 text-brand-slate/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          {{ provider.responseSpeed }}
        </div>
      </div>

      <!-- Review Snippet -->
      <div class="bg-brand-indigo/5 rounded-xl p-3 mb-5">
        <p class="text-xs text-brand-slate font-medium leading-relaxed italic">
          {{ provider.reviewSnippet }}
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="text-center">
          <p class="text-[10px] text-brand-slate font-bold uppercase tracking-wider mb-1">Completed</p>
          <p class="text-lg font-bold text-brand-indigo">{{ provider.stats.completed }}</p>
        </div>
        <div class="text-center border-l border-r border-slate-100">
          <p class="text-[10px] text-brand-slate font-bold uppercase tracking-wider mb-1">Response</p>
          <p class="text-lg font-bold text-brand-indigo">{{ provider.stats.responseRate }}</p>
        </div>
        <div class="text-center">
          <p class="text-[10px] text-brand-slate font-bold uppercase tracking-wider mb-1">Repeat</p>
          <p class="text-lg font-bold text-brand-indigo">{{ provider.stats.repeatRate }}</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center space-x-3">
        <router-link :to="'/provider/' + provider.id" class="flex-1" @click.stop>
          <BaseButton variant="primary" class="w-full shadow-md bg- hover:bg-emerald-700 text-white border-emerald-600" block>
            View Full Profile
          </BaseButton>
        </router-link>
        <button
          class="h-12 w-12 rounded-xl border border-brand-indigo text-brand-indigo flex items-center justify-center hover:bg-brand-indigo/5 transition-colors focus:outline-none"
          @click.stop
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
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
