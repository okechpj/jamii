<script setup lang="ts">
defineProps<{
  providerName: string
  providerTitle: string
  providerAvatar: string
  location: string
  score: number
}>()
</script>

<template>
  <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-200 mb-4 relative">
    <!-- Score Badge -->
    <div
      class="absolute top-4 right-4 bg-brand-indigo text-white text-[10px] font-bold px-2 py-1 rounded-xl shadow-xs"
    >
      Score {{ score }}
    </div>

    <div class="flex items-center space-x-4">
      <div class="relative h-16 w-16 flex-shrink-0">
        <div class="h-full w-full rounded-full overflow-hidden bg-brand-indigo/5">
          <img :src="providerAvatar" :alt="providerName" class="h-full w-full object-cover" />
        </div>
        <div
          class="absolute bottom-0 right-0 bg-brand-indigo rounded-full p-0.5 border border-white text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div class="flex-1 min-w-0 pr-12">
        <h2 class="text-lg font-bold text-brand-indigo truncate">{{ providerName }}</h2>
        <p class="text-xs font-bold text-brand-indigo truncate mb-2">{{ providerTitle }}</p>

        <div class="flex flex-col space-y-1">
          <div class="flex items-center text-[10px] font-medium text-brand-slate">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5 mr-1"
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
            {{ location }}
          </div>
          <div class="flex items-center text-[10px] font-medium text-brand-slate">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            97% Job Completion
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
