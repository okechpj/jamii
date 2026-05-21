<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const emit = defineEmits<{
  (e: 'confirm'): void
}>()
</script>

<template>
  <div
    class="bg-white border-t border-gray-100 p-4 sticky bottom-0 z-50 flex flex-col space-y-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] pt-6 pb-8"
  >
    <BaseButton
      variant="primary"
      class="w-full py-4 shadow-md text-base"
      type="button"
      @click="emit('confirm')"
    >
      Confirm Order
    </BaseButton>

    <button
      @click="router.back()"
      class="text-xs font-bold text-gray-600 hover:text-gray-900 focus:outline-none"
    >
      Go Back
    </button>
  </div>
</template>
