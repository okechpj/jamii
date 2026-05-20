<script setup lang="ts">
defineProps<{
  story: string
  features: { id: number; text: string; icon: string }[]
}>()
</script>

<template>
  <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
    <h2 class="text-lg font-bold text-amber-900 mb-4">Personal Story</h2>
    <p class="text-sm text-gray-700 leading-relaxed mb-6">{{ story }}</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div
        v-for="feature in features"
        :key="feature.id"
        class="bg-gray-50 rounded-xl p-3 flex items-center border border-gray-100"
      >
        <svg
          v-if="feature.icon === 'shield'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-teal-600 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else-if="feature.icon === 'leaf'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-teal-600 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.083 9h1.946c.089-1.546.953-2.897 2.202-3.822A4.974 4.974 0 0110 4.5c.348 0 .69.035 1.023.102A4.978 4.978 0 0115 9h1.917c-.035-.353-.089-.7-.163-1.04-.51-2.422-2.31-4.222-4.732-4.732A10.024 10.024 0 0010 3a10.024 10.024 0 00-2.022.208c-2.422.51-4.222 2.31-4.732 4.732-.074.34-.128.687-.163 1.04zM16.438 11.5a10.024 10.024 0 01-.208 2.022c-.51 2.422-2.31 4.222-4.732 4.732A10.024 10.024 0 0110 18.462a10.024 10.024 0 01-1.5-.116 10.024 10.024 0 01-1.5-.32l.707-1.414a8.03 8.03 0 001.293.303A8.026 8.026 0 0010 17c.18 0 .358-.01.534-.028a8.03 8.03 0 001.293-.162l.707 1.414c-.5.163-1.01.272-1.534.32a10.024 10.024 0 01-1.5.116 10.024 10.024 0 01-2.022-.208c-2.422-.51-4.222-2.31-4.732-4.732a10.024 10.024 0 01-.208-2.022 10.024 10.024 0 01.208-2.022c.51-2.422 2.31-4.222 4.732-4.732.65-.136 1.32-.208 2.022-.208s1.372.072 2.022.208c2.422.51 4.222 2.31 4.732 4.732.136.65.208 1.32.208 2.022z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="text-xs font-bold text-gray-800">{{ feature.text }}</span>
      </div>
    </div>
  </div>
</template>
