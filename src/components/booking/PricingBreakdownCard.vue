<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  serviceFee: number
  transportFee: number
  platformFee: number
}>()

const total = computed(() => props.serviceFee + props.transportFee + props.platformFee)

const formatKES = (amount: number) => {
  return 'KES ' + amount.toLocaleString()
}
</script>

<template>
  <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
    <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
      Pricing Breakdown
    </h3>

    <div class="space-y-3 mb-6">
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-600 font-medium">Service Fee</span>
        <span class="text-sm font-bold text-gray-900">{{ formatKES(serviceFee) }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-600 font-medium">Transport Fee</span>
        <span class="text-sm font-bold text-gray-900">{{ formatKES(transportFee) }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-600 font-medium flex items-center">
          Platform Protection
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5 ml-1 text-teal-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
        <span class="text-sm font-bold text-gray-900">{{ formatKES(platformFee) }}</span>
      </div>
    </div>

    <div class="border-t border-gray-200 pt-4 mb-6 flex items-center justify-between">
      <span class="text-lg font-bold text-gray-900">Total</span>
      <span class="text-lg font-bold text-teal-700">{{ formatKES(total) }}</span>
    </div>

    <div
      class="bg-[#E5FDF4] rounded-lg p-3 flex items-center justify-center border border-teal-100/50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-teal-700 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>
      <span class="text-[10px] font-bold text-teal-900"
        >Your payment is protected until service completion.</span
      >
    </div>
  </div>
</template>
