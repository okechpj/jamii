<script setup lang="ts">
defineProps<{
  serviceName: string
  dateTime: string
  locationDetails: string
}>()
</script>

<template>
  <div class="bg-white rounded-xl p-5 shadow-sm border border-slate-200 mb-4">
    <div class="flex items-center justify-between mb-5">
      <h3 class="text-[10px] font-bold text-brand-slate uppercase tracking-widest">Booking Details</h3>
      <button class="text-xs font-bold text-brand-indigo flex items-center hover:text-brand-gold rounded-xl px-2 py-1 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3.5 w-3.5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        Edit
      </button>
    </div>

    <div class="space-y-6">
      <!-- Service -->
      <div class="flex items-start">
        <div
          class="h-8 w-8 rounded-xl bg-brand-indigo/10 text-brand-indigo flex items-center justify-center mr-4 mt-0.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <div>
          <p class="text-[10px] font-bold text-brand-slate uppercase tracking-wider mb-0.5">Service</p>
          <p class="text-sm font-bold text-brand-indigo">{{ serviceName }}</p>
        </div>
      </div>

      <!-- Date & Time -->
      <div class="flex items-start">
        <div
          class="h-8 w-8 rounded-xl bg-brand-indigo/10 text-brand-indigo flex items-center justify-center mr-4 mt-0.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <p class="text-[10px] font-bold text-brand-slate uppercase tracking-wider mb-0.5">
            Date & Time
          </p>
          <p class="text-sm font-bold text-brand-indigo">{{ dateTime }}</p>
        </div>
      </div>

      <!-- Location -->
      <div class="flex items-start">
        <div
          class="h-8 w-8 rounded-xl bg-brand-indigo/10 text-brand-indigo flex items-center justify-center mr-4 mt-0.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
        </div>
        <div>
          <p class="text-[10px] font-bold text-brand-slate uppercase tracking-wider mb-0.5">
            Location
          </p>
          <p class="text-sm font-bold text-brand-indigo">{{ locationDetails }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
