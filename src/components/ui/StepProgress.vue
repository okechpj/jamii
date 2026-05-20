<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  totalSteps: number
  currentStep: number
}>()

const steps = computed(() => {
  return Array.from({ length: props.totalSteps }, (_, i) => i + 1)
})
</script>

<template>
  <div class="flex items-center justify-center space-x-2 py-4">
    <div
      v-for="step in steps"
      :key="step"
      class="h-1.5 rounded-full transition-colors duration-300 w-10 sm:w-12"
      :class="[step <= currentStep ? 'bg-teal-700' : 'bg-gray-200']"
    ></div>
  </div>
</template>
