<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { providerProfileData } from '@/assets/providerData'
import { marketplaceProviders } from '@/assets/marketplaceData'

import DesktopSidebarLeft from '@/components/feed/DesktopSidebarLeft.vue'

const route = useRoute()
const router = useRouter()

const providerId = Number(route.params.id) || 1

// Dynamic provider lookup
const provider = computed(() => {
  if (providerId === 1 && providerProfileData.name === 'Grace Wambui') {
    return {
      id: 1,
      name: providerProfileData.name,
      title: providerProfileData.title,
      avatar: providerProfileData.avatar,
      location: providerProfileData.location,
      trustScore: providerProfileData.trustScore,
    }
  }
  const mp = marketplaceProviders.find((p) => p.id === providerId)
  if (mp) {
    return {
      id: mp.id,
      name: mp.providerName,
      title: mp.serviceTitle,
      avatar: mp.providerAvatar,
      location: 'Kilimani, Nairobi',
      trustScore: Math.round(mp.rating * 20),
    }
  }
  return {
    id: providerProfileData.id,
    name: providerProfileData.name,
    title: providerProfileData.title,
    avatar: providerProfileData.avatar,
    location: providerProfileData.location,
    trustScore: providerProfileData.trustScore,
  }
})

// Generate reference number
const referenceNumber = computed(() => `JS-${88000 + providerId * 73}`)

// Paid state checks
const isPaid = computed(() => route.query.paid === 'true')

// Current step in the tracking timeline (0: Provider notified, 1: Availability confirmed, 2: Reminders set, 3: Completion, 4: Review)
const currentStep = ref(0)
let timelineTimer: ReturnType<typeof setInterval> | undefined = undefined

onMounted(() => {
  // Only progress the order steps if the order is paid
  if (isPaid.value) {
    // Start at step 1 since provider is already notified
    currentStep.value = 1
    timelineTimer = setInterval(() => {
      if (currentStep.value < 4) {
        currentStep.value++
        if (currentStep.value === 4) {
          clearInterval(timelineTimer)
          // Automatically redirect to review page after a short delay (1.5 seconds)
          setTimeout(() => {
            router.push(`/provider/${providerId}/review`)
          }, 1500)
        }
      } else {
        clearInterval(timelineTimer)
      }
    }, 5000) // Progress step every 5 seconds
  } else {
    // If unpaid, keep at step 0 (Provider notified / Pending Payment)
    currentStep.value = 0
  }
})

onUnmounted(() => {
  if (timelineTimer) {
    clearInterval(timelineTimer)
  }
})

// Control options menu dropdown
const showMenu = ref(false)
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

// Payment Modal State
const showPaymentModal = ref(false)

// Timeline configuration
const timelineSteps = computed(() => [
  {
    title: 'Provider notified',
    desc: isPaid.value
      ? `${provider.value.name} has received your request and payment confirmation.`
      : `${provider.value.name} is waiting for payment authorization to confirm the booking.`,
    icon: 'checkmark',
  },
  {
    title: 'Availability confirmed',
    desc: 'Usually within 30 minutes of booking.',
    icon: 'hourglass',
  },
  {
    title: 'Reminders',
    desc: "We'll send you a push notification 24 hours before.",
    icon: 'bell',
  },
  {
    title: 'Completion',
    desc: 'Mark the service as complete once the job is done.',
    icon: 'completion',
  },
  {
    title: 'Review',
    desc: 'Share your experience with the community.',
    icon: 'star',
  },
])

function getStepIconColor(index: number) {
  // If paid, steps before currentStep are checked.
  // If unpaid, step 0 is active but not checked yet (shows pulsing green circle)
  if (index < currentStep.value) {
    return 'bg-brand-indigo text-white' // Completed
  } else if (index === currentStep.value) {
    return 'bg-white border-2 border-brand-indigo text-brand-indigo' // Current
  } else {
    return 'bg-slate-100 border border-slate-300 text-slate-400' // Pending
  }
}

function getStepTextColor(index: number) {
  if (index <= currentStep.value) {
    return 'text-brand-indigo font-bold'
  }
  return 'text-slate-400 font-medium'
}

function getLineColor(index: number) {
  if (index < currentStep.value) {
    return 'border-brand-indigo'
  }
  return 'border-slate-200 border-dashed'
}

function navigateToChat() {
  router.push('/chat')
}

function handlePaymentAction() {
  if (isPaid.value) {
    // Open receipt modal if already paid
    showPaymentModal.value = true
  } else {
    // Go to checkout if unpaid
    router.push(`/provider/${providerId}/book`)
  }
}
</script>

<template>
  <div class="min-h-screen bg-brand-offwhite flex flex-col">
    <!-- Main Content Wrapper -->
    <div class="flex-1 flex justify-center bg-brand-offwhite lg:mt-[64px]">
      <!-- Desktop Left Sidebar -->
      <DesktopSidebarLeft />

      <!-- Center Checkout/Tracking Column -->
      <div
        class="w-full lg:max-w-[680px] bg-white min-h-screen shadow-sm relative lg:rounded-xl lg:overflow-hidden lg:mb-8 flex flex-col pb-28"
      >
        <!-- Header -->
        <div class="px-4 py-4 bg-white sticky top-0 z-40 flex items-center justify-between border-b border-slate-100">
          <div class="flex items-center text-brand-indigo font-bold text-lg">
            <button @click="router.push('/')" class="p-1 -ml-1 mr-2 focus:outline-none cursor-pointer hover:bg-slate-100 rounded-xl transition-colors" aria-label="Back to home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-brand-indigo"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            Jamii Sasa
          </div>
          
          <!-- Actions dropdown menu -->
          <div class="relative">
            <button @click="toggleMenu" class="text-brand-indigo p-1.5 focus:outline-none cursor-pointer hover:bg-slate-100 rounded-xl transition-colors" aria-label="More options">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5.5 w-5.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>

            <!-- Dropdown Options -->
            <transition name="fade-in">
              <div v-if="showMenu" class="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-50">
                <button @click="router.push('/')" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center">
                  <span>Go to Discovery</span>
                </button>
                <button v-if="isPaid" @click="showPaymentModal = true; showMenu = false" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center">
                  <span>View Payment Details</span>
                </button>
                <button v-else @click="handlePaymentAction(); showMenu = false" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center">
                  <span>Make Payment</span>
                </button>
                <button @click="router.push('/marketplace')" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center border-t border-slate-50">
                  <span>Cancel Booking</span>
                </button>
              </div>
            </transition>
          </div>
        </div>

        <!-- Confirmation Checkmark Section -->
        <div class="flex flex-col items-center pt-8 pb-6">
          <div class="h-20 w-20 bg-brand-indigo/10 rounded-full flex items-center justify-center mb-4 shadow-sm animate-pulse-slow">
            <div class="h-14 w-14 bg-brand-indigo text-white rounded-full flex items-center justify-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="3"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 class="text-2xl font-extrabold text-brand-indigo">Booking Confirmed</h2>
        </div>

        <!-- Scrollable Details & Tracking -->
        <div class="flex-1 px-4 space-y-6 overflow-y-auto">
          <!-- Booking Summary Card -->
          <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
            <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              Booking Summary
            </h3>

            <!-- Provider Profile Section -->
            <div class="flex items-center space-x-3.5 mb-5 pb-5 border-b border-slate-100">
              <img
                :src="provider.avatar"
                :alt="provider.name"
                class="h-14 w-14 rounded-full object-cover bg-slate-50 border border-slate-100"
              />
              <div>
                <h4 class="text-base font-bold text-brand-indigo">{{ provider.name }}</h4>
                <div class="flex items-center text-brand-indigo text-xs font-semibold mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.267 3.585a.75.75 0 011.05-.116L10 5.485l2.683-2.016a.75.75 0 11.9 1.2l-3.25 2.438a.75.75 0 01-.866 0l-3.25-2.438a.75.75 0 01-.116-1.05z"
                      clip-rule="evenodd"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Verified Provider
                </div>
              </div>
            </div>

            <!-- Details Key/Values -->
            <div class="space-y-4 text-sm">
              <div class="flex justify-between items-center">
                <span class="text-slate-500 font-medium">Service</span>
                <span class="text-brand-indigo font-semibold">Deep Home Cleaning</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-500 font-medium">Date & Time</span>
                <span class="text-brand-indigo font-semibold">Oct 24, 09:00 AM</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-500 font-medium">Reference #</span>
                <span class="text-brand-indigo font-semibold text-right">{{ referenceNumber }}</span>
              </div>
            </div>
          </div>

          <!-- Track Service Timeline Card -->
          <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
            <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
              Track Your Service Order
            </h3>

            <!-- Timeline -->
            <div class="relative">
              <div v-for="(step, idx) in timelineSteps" :key="idx" class="flex items-start pb-8 last:pb-0 relative">
                <!-- Vertical Line Connector -->
                <div
                  v-if="idx < timelineSteps.length - 1"
                  class="absolute left-4.5 top-9 bottom-0 border-l-2"
                  :class="getLineColor(idx)"
                ></div>

                <!-- Status Node Icon -->
                <div
                  class="h-9.5 w-9.5 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all duration-500"
                  :class="getStepIconColor(idx)"
                >
                  <!-- Checkmark (Completed) -->
                  <svg
                    v-if="idx < currentStep"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <!-- Active Pulse/Hourglass/Clock -->
                  <div v-else-if="idx === currentStep" class="relative flex items-center justify-center h-full w-full">
                    <!-- Real-time pulsing glow -->
                    <span class="absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-20 animate-ping"></span>
                    
                    <svg
                      v-if="step.icon === 'checkmark' && isPaid"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-brand-indigo"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <!-- Warning / Info icon when unpaid at Step 0 -->
                    <svg
                      v-else-if="step.icon === 'checkmark' && !isPaid"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4.5 w-4.5 text-brand-indigo animate-pulse"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <svg
                      v-else-if="step.icon === 'hourglass'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-brand-indigo animate-spin-slow"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <svg
                      v-else-if="step.icon === 'bell'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-brand-indigo animate-bounce"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <svg
                      v-else-if="step.icon === 'completion'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-brand-indigo"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    <svg
                      v-else-if="step.icon === 'star'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-brand-indigo"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.772-.564-.373-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>

                  <!-- Faded/Pending Icon -->
                  <div v-else class="flex items-center justify-center">
                    <svg
                      v-if="step.icon === 'hourglass'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4.5 w-4.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <svg
                      v-else-if="step.icon === 'bell'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4.5 w-4.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <svg
                      v-else-if="step.icon === 'completion'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4.5 w-4.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    <svg
                      v-else-if="step.icon === 'star'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4.5 w-4.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.772-.564-.373-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                </div>

                <!-- Step Description Details -->
                <div class="ml-4 flex-1">
                  <h4 class="text-sm transition-all duration-300" :class="getStepTextColor(idx)">
                    {{ step.title }}
                  </h4>
                  <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                    {{ step.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sticky Footer Action Actions -->
        <div class="bg-white/95 backdrop-blur-xs border-t border-slate-100 p-4 absolute bottom-0 left-0 right-0 z-30 flex flex-col space-y-3.5 pb-6">
          <!-- Chat Button -->
          <button
            @click="navigateToChat"
            class="w-full h-13 rounded-xl bg-brand-indigo hover:bg-brand-indigo/90 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center space-x-2 cursor-pointer border-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>Chat with {{ provider.name.split(' ')[0] }}</span>
          </button>

          <!-- Make Payment / Details Button -->
          <button
            @click="handlePaymentAction"
            class="w-full h-13 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
            :class="isPaid 
              ? 'border border-brand-indigo bg-white hover:bg-brand-indigo/5 text-brand-indigo font-bold'
              : 'bg-brand-gold hover:bg-brand-gold-hover text-white font-bold border-none shadow-md'
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>{{ isPaid ? 'View Receipt' : 'Make Payment' }}</span>
          </button>

          <!-- Return Home link -->
          <button
            @click="router.push('/')"
            class="text-brand-indigo hover:text-brand-indigo/80 font-extrabold text-sm text-center focus:outline-none bg-transparent border-none cursor-pointer mt-1"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>

    <!-- Slide-Up Drawer / Modal for Payment Receipt Details -->
    <transition name="drawer">
      <div v-if="showPaymentModal" class="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4">
        <!-- Close overlay trigger -->
        <div class="absolute inset-0 cursor-default" @click="showPaymentModal = false"></div>

        <!-- Drawer Content -->
        <div class="relative w-full max-w-md bg-white rounded-t-xl sm:rounded-xl p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto flex flex-col">
          <!-- Top indicator line for drag (mobile visual styling) -->
          <div class="w-12 h-1.5 bg-slate-200 rounded-xl mx-auto mb-4 cursor-pointer sm:hidden" @click="showPaymentModal = false"></div>
          
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-extrabold text-brand-indigo">Payment Status</h3>
            <button @click="showPaymentModal = false" class="p-1 text-brand-slate hover:text-brand-indigo rounded-xl hover:bg-brand-indigo/5 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Payment Header / Status Info -->
          <div class="flex flex-col items-center bg-brand-indigo/5 rounded-2xl py-6 px-4 mb-6 border border-brand-indigo/10">
            <div class="h-12 w-12 bg-brand-indigo text-white rounded-full flex items-center justify-center shadow-sm mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-brand-indigo font-extrabold text-lg">KES 4,150.00</span>
            <span class="text-brand-indigo text-xs font-bold mt-1 bg-brand-indigo/10 px-3 py-1 rounded-xl">Paid & Verified</span>
          </div>

          <!-- Transaction details receipt -->
          <div class="space-y-4 text-sm border-b border-slate-100 pb-5 mb-5">
            <div class="flex justify-between">
              <span class="text-slate-500 font-medium">To Professional</span>
              <span class="text-brand-indigo font-semibold">{{ provider.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500 font-medium">Payment Method</span>
              <span class="text-brand-indigo font-semibold flex items-center">
                <span class="h-2 w-2 rounded-full bg-brand-gold mr-1.5"></span>
                Jamii Sasa Wallet
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500 font-medium">Reference Number</span>
              <span class="text-brand-indigo font-semibold">{{ referenceNumber }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500 font-medium">Transaction ID</span>
              <span class="text-brand-indigo font-mono font-bold text-xs uppercase">TXN-778939281</span>
            </div>
          </div>

          <!-- Breakdown details -->
          <div class="space-y-3 text-xs text-slate-500 pb-6">
            <div class="flex justify-between">
              <span>Deep Home Cleaning fee</span>
              <span class="font-semibold text-slate-700">KES 3,500.00</span>
            </div>
            <div class="flex justify-between">
              <span>Transport compensation</span>
              <span class="font-semibold text-slate-700">KES 500.00</span>
            </div>
            <div class="flex justify-between">
              <span>Platform service fee</span>
              <span class="font-semibold text-slate-700">KES 150.00</span>
            </div>
          </div>

          <!-- Action inside Drawer -->
          <button
            @click="showPaymentModal = false"
            class="w-full py-3.5 bg-brand-indigo hover:bg-brand-indigo/90 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.animate-spin-slow {
  animation: spin 3s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-pulse-slow {
  animation: pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: .85;
    transform: scale(0.96);
  }
}

/* Animations for menu fade */
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Drawer transitions */
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}
.drawer-enter-active .relative,
.drawer-leave-active .relative {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-enter-from {
  opacity: 0;
}
.drawer-enter-from .relative {
  transform: translateY(100%);
}

.drawer-leave-to {
  opacity: 0;
}
.drawer-leave-to .relative {
  transform: translateY(100%);
}
</style>
