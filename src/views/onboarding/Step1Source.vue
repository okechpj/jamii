<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboarding'
import BaseButton from '@/components/ui/BaseButton.vue'
import SelectableChip from '@/components/ui/SelectableChip.vue'

const router = useRouter()
const store = useOnboardingStore()

const sources = ['Social Media', 'Friend or Family', 'Search Engine', 'Local Market', 'Other']

const handleContinue = () => {
  if (store.discoverySource) {
    store.nextStep()
    router.push('/onboarding/step-2')
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">How did you hear about Jamii Sasa?</h2>
      <p class="text-sm text-gray-500">
        Help us understand our community better. This will tailor your Jamii Sasa experience.
      </p>
    </div>

    <div class="flex-1 flex flex-col space-y-3">
      <SelectableChip
        v-for="source in sources"
        :key="source"
        :label="source"
        :selected="store.discoverySource === source"
        @toggle="store.discoverySource = source"
      >
        <template #icon v-if="source === 'Social Media'">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
            />
          </svg>
        </template>
        <template #icon v-else-if="source === 'Friend or Family'">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
            />
          </svg>
        </template>
        <template #icon v-else-if="source === 'Search Engine'">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </template>
        <template #icon v-else-if="source === 'Local Market'">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
              clip-rule="evenodd"
            />
          </svg>
        </template>
        <template #icon v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </template>
      </SelectableChip>
    </div>

    <div class="mt-8">
      <BaseButton type="button" block :disabled="!store.discoverySource" @click="handleContinue">
        Continue
      </BaseButton>
    </div>
  </div>
</template>
