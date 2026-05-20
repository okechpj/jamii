<script setup lang="ts">
defineProps<{
  networkTrustCount: number
  totalReviews: number
  reviews: {
    id: number
    authorName: string
    authorAvatar: string
    location: string
    timeAgo: string
    rating: number
    isVerifiedJob: boolean
    text: string
  }[]
}>()
</script>

<template>
  <div class="bg-teal-50/50 rounded-3xl p-6 border border-teal-100">
    <!-- Network Trust Banner -->
    <div class="flex items-center mb-6 border-b border-teal-100/50 pb-4">
      <div class="flex -space-x-2 mr-3">
        <div class="h-8 w-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
          <img src="https://i.pravatar.cc/150?u=a" class="w-full h-full object-cover" />
        </div>
        <div class="h-8 w-8 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
          <img src="https://i.pravatar.cc/150?u=b" class="w-full h-full object-cover" />
        </div>
        <div
          class="h-8 w-8 rounded-full border-2 border-white bg-teal-800 text-white flex items-center justify-center text-xs font-bold"
        >
          +{{ networkTrustCount - 2 }}
        </div>
      </div>
      <p class="text-xs font-bold text-teal-900">
        {{ networkTrustCount }} people in your network trust this provider
      </p>
    </div>

    <!-- Review Cards -->
    <div class="space-y-4 mb-6">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center space-x-3">
            <div class="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
              <img
                :src="review.authorAvatar"
                :alt="review.authorName"
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 class="text-sm font-bold text-gray-900">{{ review.authorName }}</h4>
              <p class="text-[10px] text-gray-500 font-medium">
                {{ review.location }} • {{ review.timeAgo }}
              </p>
            </div>
          </div>

          <div
            v-if="review.isVerifiedJob"
            class="bg-teal-50 text-teal-700 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3 mr-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            Verified Job
          </div>
        </div>

        <div class="flex items-center text-amber-500 mb-2">
          <svg
            v-for="i in review.rating"
            :key="i"
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        </div>

        <p class="text-xs text-gray-600 font-medium italic leading-relaxed">
          {{ review.text }}
        </p>
      </div>
    </div>

    <!-- Read All Button -->
    <button
      class="w-full text-center text-xs font-bold text-teal-700 py-2 hover:text-teal-800 focus:outline-none"
    >
      Read all {{ totalReviews }} reviews
    </button>
  </div>
</template>
