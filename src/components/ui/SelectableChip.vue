<script setup lang="ts">
defineProps<{
  label: string
  selected?: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <button
    type="button"
    @click="emit('toggle')"
    class="flex items-center px-4 py-2.5 rounded-full border text-sm font-medium transition-colors w-full sm:w-auto mb-3"
    :class="[
      selected
        ? 'bg-brand-indigo border-brand-indigo text-white'
        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50',
    ]"
  >
    <div v-if="$slots.icon" class="mr-2 flex items-center justify-center text-current opacity-70">
      <slot name="icon"></slot>
    </div>
    {{ label }}
  </button>
</template>
