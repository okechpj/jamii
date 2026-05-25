<script setup lang="ts">

defineProps<{
  ctaText?: string
  description?: string
  buttonText?: string
}>()
</script>

<template>
  <div
    class="bg-brand-indigo text-white p-8 my-2 flex flex-col items-center justify-center text-center shadow-inner rounded-xl"
  >
    <div
      class="h-16 w-16 bg-white/10 rounded-xl flex items-center justify-center mb-4 border border-white/20"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 opacity-80"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          :d="'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'"
        />
      </svg>
    </div>

    <h3 class="text-xl font-bold mb-3">{{ ctaText || 'Support a Local Professional' }}</h3>
    <p class="text-sm opacity-90 mb-6 leading-relaxed max-w-sm">
      {{ description || 'From home repairs to tailoring, find trusted experts in your community.' }}
    </p>

    <router-link
      to="/marketplace"
      class="bg-brand-gold hover:bg-brand-gold-hover transition-colors text-brand-indigo text-sm font-bold py-3 px-8 rounded-xl shadow-md inline-flex items-center justify-center"
    >
      {{ buttonText || 'Book a Service' }}
    </router-link>
  </div>
</template>
