<script setup lang="ts">
defineProps<{
  services: { id: number; name: string; price: string }[]
  availability: string
  equipment: string
}>()
</script>

<template>
  <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
    <!-- Secure Guarantee Banner -->
    <div class="bg-brand-indigo/5 rounded-xl p-4 mb-6 flex items-start border border-brand-indigo/10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-brand-indigo mr-3 mt-0.5 flex-shrink-0"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>
      <div>
        <h4 class="text-xs font-bold text-brand-indigo mb-0.5">Secure Marketplace Guarantee</h4>
        <p class="text-[10px] text-[#64748B]">
          Your payment is only released after service confirmation.
        </p>
      </div>
    </div>

    <!-- Services List -->
    <ul class="space-y-4 mb-8">
      <li v-for="service in services" :key="service.id" class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-800">{{ service.name }}</span>
        <span class="text-sm font-bold text-brand-indigo">{{ service.price }}</span>
      </li>
    </ul>

    <!-- Availability & Equipment -->
    <div class="space-y-5 border-t border-gray-100 pt-5">
      <div>
        <h4 class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
          Availability
        </h4>
        <p class="text-sm font-medium text-gray-900">{{ availability }}</p>
      </div>
      <div>
        <h4 class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Equipment</h4>
        <p class="text-sm font-medium text-gray-600 italic">{{ equipment }}</p>
      </div>
    </div>
  </div>
</template>
