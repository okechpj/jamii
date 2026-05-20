<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { providerProfileData } from '@/assets/providerData'

import DesktopSidebarLeft from '@/components/feed/DesktopSidebarLeft.vue'
import OrderConfirmHeader from '@/components/booking/OrderConfirmHeader.vue'
import ProviderSummaryCard from '@/components/booking/ProviderSummaryCard.vue'
import BookingDetailsCard from '@/components/booking/BookingDetailsCard.vue'
import PricingBreakdownCard from '@/components/booking/PricingBreakdownCard.vue'
import OrderConfirmActions from '@/components/booking/OrderConfirmActions.vue'

const route = useRoute()
const router = useRouter()
// Using the same provider mock data
const provider = providerProfileData

const showSuccessModal = ref(false)

function handleConfirm() {
  showSuccessModal.value = true
  setTimeout(() => {
    showSuccessModal.value = false
    router.push('/')
  }, 3000)
}
</script>

<template>
  <div class="min-h-screen bg-[#1F2937] flex flex-col">
    <!-- Main Content Wrapper -->
    <div class="flex-1 flex justify-center bg-gray-100 lg:bg-gray-100 lg:mt-[64px]">
      <!-- Desktop Left Sidebar -->
      <DesktopSidebarLeft />

      <!-- Centered Checkout Column (max-width 680px for focus) -->
      <div
        class="w-full lg:max-w-[680px] bg-[#FCFAF8] min-h-screen shadow-sm relative lg:rounded-xl lg:overflow-hidden lg:mb-8 flex flex-col"
      >
        <OrderConfirmHeader />

        <!-- Scrollable Content Area -->
        <div class="flex-1 overflow-y-auto px-4 pb-8">
          <ProviderSummaryCard
            :providerName="provider.name"
            :providerTitle="provider.title"
            :providerAvatar="provider.avatar"
            :location="provider.location"
            :score="provider.trustScore"
          />

          <BookingDetailsCard
            serviceName="Deep Home Cleaning"
            dateTime="Oct 24, 2023 • 09:00 AM"
            locationDetails="Apt 4B, Kilimani Heights"
          />

          <PricingBreakdownCard :serviceFee="3500" :transportFee="500" :platformFee="150" />
        </div>

        <OrderConfirmActions @confirm="handleConfirm" />
      </div>
    </div>

    <!-- Success Overlay/Modal -->
    <Transition name="fade">
      <div
        v-if="showSuccessModal"
        class="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
      >
        <div
          class="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-bounce-short"
        >
          <div
            class="h-20 w-20 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="3"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-2xl font-black text-amber-900 mb-2">Booking Confirmed!</h3>
          <p class="text-sm text-gray-500 mb-6 leading-relaxed">
            Your request has been sent to {{ provider.name }}. You will receive updates in your alerts.
          </p>
          <div class="flex items-center justify-center space-x-2 text-xs font-bold text-teal-700">
            <svg
              class="animate-spin h-4 w-4"
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
            <span>Redirecting to feed...</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@keyframes bounce-short {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
.animate-bounce-short {
  animation: bounce-short 0.5s ease-out;
}
</style>
