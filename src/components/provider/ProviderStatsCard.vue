<script setup lang="ts">
defineProps<{
  trustScore: number
  rating: number
  verifications: { id: number; text: string }[]
  trustedFamiliesCount: number
  location: string
}>()
</script>

<template>
  <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
    <div
      class="flex items-center justify-center divide-x divide-gray-200 mb-6 border-b border-gray-100 pb-6"
    >
      <!-- Trust Score -->
      <div class="flex flex-col items-center flex-1">
        <span class="text-4xl font-black text-teal-800">{{ trustScore }}</span>
        <span class="text-[10px] font-bold text-gray-500 tracking-wider uppercase mt-1"
          >Trust Score</span
        >
      </div>

      <!-- Rating -->
      <div class="flex flex-col items-center flex-1">
        <span class="text-4xl font-black text-amber-700">{{ rating.toFixed(1) }}</span>
        <div class="flex items-center mt-1 text-amber-500">
          <svg
            v-for="i in 5"
            :key="i"
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Verifications List -->
    <ul class="space-y-3 mb-6">
      <li
        v-for="v in verifications"
        :key="v.id"
        class="flex items-center text-sm font-medium text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-teal-600 mr-3 flex-shrink-0"
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
        {{ v.text }}
      </li>
    </ul>

    <!-- Trusted Badge -->
    <div
      class="bg-cyan-50/50 rounded-xl p-3 flex items-center justify-center border border-cyan-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-teal-700 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
        />
      </svg>
      <span class="text-xs font-bold text-teal-900"
        >Trusted by {{ trustedFamiliesCount }} families in {{ location }}</span
      >
    </div>
  </div>
</template>
