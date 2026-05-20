<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  block?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const baseClasses =
  'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const sizeClasses = 'px-5 py-3 text-sm'

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-amber-800 text-white hover:bg-amber-900 focus:ring-amber-500' // Using amber for secondary (like 'Continue to Feeds' button)
    case 'outline':
      return 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-teal-500'
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    case 'primary':
    default:
      return 'bg-teal-700 text-white hover:bg-teal-800 focus:ring-teal-500' // Dark teal from screenshots
  }
})
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled || loading"
    :class="[baseClasses, sizeClasses, variantClasses, block ? 'w-full' : '']"
    @click="emit('click', $event)"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot></slot>
  </button>
</template>
