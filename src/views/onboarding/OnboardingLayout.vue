<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboarding'
import StepProgress from '@/components/ui/StepProgress.vue'

const router = useRouter()
const store = useOnboardingStore()

const handleBack = () => {
  if (store.currentStep > 1) {
    store.prevStep()
    router.push(`/onboarding/step-${store.currentStep}`)
  } else {
    router.push('/signup')
  }
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 sm:px-6 lg:px-8 py-10 sm:py-12"
  >
    <div
      class="max-w-md w-full bg-white sm:rounded-2xl sm:shadow-xl p-6 sm:p-10 flex flex-col min-h-screen sm:min-h-[600px] relative"
    >
      <!-- Header Area with Back Button and Progress -->
      <div class="flex items-center pt-2 pb-6 relative">
        <button
          @click="handleBack"
          class="absolute left-0 p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <div class="flex-1 flex justify-center">
          <StepProgress :total-steps="4" :current-step="store.currentStep" />
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
