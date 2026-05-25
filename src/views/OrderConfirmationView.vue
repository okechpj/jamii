<script setup lang="ts">
import { ref, computed } from 'vue'
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

// M-Pesa mobile number input
const mpesaNumber = ref('')
const numberError = ref('')

// STK Push simulator modal state
const showStkModal = ref(false)
const stkStep = ref(1) // 1: STK push sent/waiting, 2: Payment confirmed/redirecting

function validateMpesaNumber() {
  const cleaned = mpesaNumber.value.trim()
  if (!cleaned) {
    numberError.value = 'M-Pesa number is required.'
    return false
  }
  // Validate length and digit characters (typically 9-10 digits, e.g. 0712345678 or 712345678)
  const digitPattern = /^[0-9]+$/
  if (!digitPattern.test(cleaned)) {
    numberError.value = 'Please enter digits only.'
    return false
  }
  if (cleaned.length < 9 || cleaned.length > 10) {
    numberError.value = 'Number must be 9 or 10 digits.'
    return false
  }
  numberError.value = ''
  return true
}

function handlePayClick() {
  if (!validateMpesaNumber()) return

  // Start the simulation
  showStkModal.value = true
  stkStep.value = 1

  // Step 1 -> Step 2 transition
  setTimeout(() => {
    stkStep.value = 2
    // Step 2 -> redirect transition
    setTimeout(() => {
      showStkModal.value = false
      router.push(`/provider/${providerId}/track?paid=true`)
    }, 2500)
  }, 3000)
}

function toggleDropdownMenu() {
  // Mock options menu click handler
}
</script>

<template>
  <div class="min-h-screen bg-brand-offwhite flex flex-col">
    <!-- Main Content Wrapper -->
    <div class="flex-1 flex justify-center bg-brand-offwhite lg:mt-16">
      <!-- Desktop Left Sidebar -->
      <DesktopSidebarLeft />

      <!-- Centered Checkout Column -->
      <div
        class="w-full lg:max-w-170 bg-white min-h-screen shadow-xs relative lg:rounded-xl lg:overflow-hidden lg:mb-8 flex flex-col pb-24"
      >
        <!-- Header -->
        <div class="px-4 py-4 bg-white flex items-center justify-between border-b border-slate-100">
          <div class="flex items-center text-brand-indigo font-bold text-lg">
            <button @click="router.back()" class="p-1.5 -ml-1 mr-2 focus:outline-none cursor-pointer hover:bg-brand-indigo/5 rounded-xl transition-colors" aria-label="Go back">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5.5 w-5.5 text-brand-indigo"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div class="flex flex-col">
              <span class="text-brand-indigo leading-tight">Checkout</span>
              <span class="text-[9px] font-black text-brand-gold uppercase tracking-widest leading-none mt-0.5">Encrypted Transaction</span>
            </div>
          </div>
          
          <button @click="toggleDropdownMenu" class="text-brand-indigo p-1.5 focus:outline-none cursor-pointer hover:bg-brand-indigo/5 rounded-xl transition-colors" aria-label="More options">
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
        </div>

        <!-- Scrollable Details & Billing Form -->
        <div class="flex-1 px-4 py-6 space-y-6 overflow-y-auto bg-white">
          

          <!-- Order Summary Section -->
          <div>
            <h3 class="text-[10px] font-bold text-brand-slate uppercase tracking-widest mb-2.5">
              Order Summary
            </h3>
            
            <div class="bg-white rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
              <div class="flex items-center space-x-3.5">
                <img
                  :src="provider.avatar"
                  :alt="provider.name"
                  class="h-13 w-13 rounded-full object-cover bg-brand-indigo/5 border border-slate-100"
                />
                <div>
                  <h4 class="text-sm font-extrabold text-brand-indigo leading-tight">{{ provider.name }}</h4>
                  <p class="text-xs font-medium text-brand-slate mt-0.5">Deep Home Cleaning</p>
                  
                  <div class="flex items-center text-[10px] font-bold text-brand-slate mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5 mr-1 text-brand-indigo/60"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Oct 24, 09:00 AM
                  </div>
                </div>
              </div>

              <!-- Total amount details right column -->
              <div class="text-right">
                <span class="text-[10px] font-bold text-brand-slate uppercase tracking-wider block">Total Amount</span>
                <span class="text-brand-indigo text-lg font-black font-mono">KES 4,150</span>
              </div>
            </div>
          </div>

          <!-- M-Pesa Header & Card (Polished Trusted Community Brand style) -->
          <div class="bg-brand-indigo rounded-xl p-4.5 text-white shadow-xs flex items-center justify-between bg-linear-to-r from-[#1A202C] to-[#2D3748]">
            <div class="flex items-center space-x-4">
              <!-- Mobile transaction icon on left -->
              <div class="h-11 w-11 bg-white/15 rounded-xl flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <div>
                <h4 class="text-base font-extrabold leading-tight">Pay via M-Pesa</h4>
                <p class="text-xs text-slate-300 font-medium mt-0.5">Fast, secure mobile payment</p>
              </div>
            </div>

            <!-- Contactless icon on right -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 text-white/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253"
              />
            </svg>
          </div>

          <!-- M-Pesa Mobile Number Input -->
          <div class="bg-white rounded-xl p-5 border border-slate-100 shadow-xs">
            <label for="mpesa-input" class="text-xs font-bold text-brand-indigo block mb-2.5">
              M-Pesa Mobile Number
            </label>

            <!-- Custom Input Box -->
            <div
              class="flex items-center bg-brand-indigo/5 border rounded-xl overflow-hidden px-4.5 py-3 transition-colors duration-200"
              :class="numberError ? 'border-red-500' : 'border-slate-200 focus-within:border-brand-gold focus-within:ring-2 focus-within:ring-brand-gold/20'"
            >
              <!-- +254 Prefix -->
              <span class="text-brand-indigo font-extrabold text-sm flex items-center pr-3.5 border-r border-slate-300">
                +254
              </span>

              <!-- Phone input field -->
              <input
                id="mpesa-input"
                v-model="mpesaNumber"
                type="tel"
                placeholder="Enter M-Pesa number"
                class="flex-1 text-brand-indigo text-sm font-semibold pl-4.5 focus:outline-none bg-transparent"
                @input="numberError = ''"
                @blur="validateMpesaNumber"
              />
            </div>

            <!-- Error message if validation fails -->
            <transition name="fade">
              <span v-if="numberError" class="text-xs text-red-600 font-semibold mt-2.5 block leading-none">
                {{ numberError }}
              </span>
            </transition>

            <span class="text-[10px] text-brand-slate font-semibold mt-2.5 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1.5 text-brand-slate/60" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              The M-Pesa STK push will be sent to this number.
            </span>
          </div>

          <!-- How It Works Section -->
          <div>
            <div class="mb-4">
              <h4 class="text-[11px] font-black text-brand-indigo tracking-wider inline-block border-b-2 border-brand-indigo pb-0.5">
                HOW IT WORKS
              </h4>
            </div>

            <div class="grid grid-cols-2 gap-3.5">
              <!-- Step 1 -->
              <div class="bg-brand-indigo/5 rounded-xl p-3.5 border border-slate-100 flex flex-col justify-start">
                <div class="h-6.5 w-6.5 bg-brand-indigo text-white rounded-full flex items-center justify-center text-[11px] font-bold mb-2 shadow-xs">
                  1
                </div>
                <span class="text-[11px] text-brand-slate font-bold leading-tight">Enter your number & click pay</span>
              </div>
              <!-- Step 2 -->
              <div class="bg-brand-indigo/5 rounded-xl p-3.5 border border-slate-100 flex flex-col justify-start">
                <div class="h-6.5 w-6.5 bg-brand-indigo text-white rounded-full flex items-center justify-center text-[11px] font-bold mb-2 shadow-xs">
                  2
                </div>
                <span class="text-[11px] text-brand-slate font-bold leading-tight">Receive M-Pesa Prompt on phone</span>
              </div>
              <!-- Step 3 -->
              <div class="bg-brand-indigo/5 rounded-xl p-3.5 border border-slate-100 flex flex-col justify-start">
                <div class="h-6.5 w-6.5 bg-brand-indigo text-white rounded-full flex items-center justify-center text-[11px] font-bold mb-2 shadow-xs">
                  3
                </div>
                <span class="text-[11px] text-brand-slate font-bold leading-tight">Enter your M-Pesa PIN securely</span>
              </div>
              <!-- Step 4 -->
              <div class="bg-brand-indigo/5 rounded-xl p-3.5 border border-slate-100 flex flex-col justify-start">
                <div class="h-6.5 w-6.5 bg-brand-indigo text-white rounded-full flex items-center justify-center text-[11px] font-bold mb-2 shadow-xs">
                  4
                </div>
                <span class="text-[11px] text-brand-slate font-bold leading-tight">Payment is held until service ends</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sticky Footer -->
        <div class="bg-white border-t border-slate-100 p-4 absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] pt-5 pb-6">
          <div class="flex flex-col">
            <span class="text-[9px] font-bold text-brand-slate uppercase tracking-wider">Final Amount</span>
            <span class="text-brand-indigo text-lg font-black font-mono mt-0.5">KES 4,150.00</span>
          </div>

          <button
            @click="handlePayClick"
            class="py-3 px-5.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-indigo font-black rounded-xl text-sm shadow-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer border-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4.5 w-4.5 text-brand-indigo"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Pay KES 4,150 with M-Pesa</span>
          </button>
        </div>
      </div>
    </div>

    <!-- M-Pesa STK Push Simulator Overlay -->
    <transition name="fade">
      <div v-if="showStkModal" class="fixed inset-0 bg-brand-indigo/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl p-7 max-w-sm w-full text-center shadow-xl animate-bounce-short">
          <!-- Logo / Image simulator -->
          <div class="h-20 w-20 bg-brand-indigo/5 rounded-xl flex items-center justify-center mx-auto mb-6 relative">
            <svg
              v-if="stkStep === 1"
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-brand-indigo animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-brand-indigo"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="3"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            
            <!-- Small spin badge for Step 1 -->
            <span v-if="stkStep === 1" class="absolute bottom-0 right-0 flex h-4 w-4">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
              <span class="relative inline-flex rounded-full h-4 w-4 bg-brand-gold"></span>
            </span>
          </div>

          <!-- Step 1 Details -->
          <div v-if="stkStep === 1">
            <h3 class="text-xl font-extrabold text-brand-indigo mb-2">STK Push Sent</h3>
            <p class="text-xs text-brand-slate mb-6 leading-relaxed">
              We have initiated a transaction of <strong>KES 4,150</strong> to your M-Pesa line. Please check your phone for the M-Pesa PIN prompt to authorize payment.
            </p>
            <div class="flex items-center justify-center space-x-2 text-xs font-bold text-brand-indigo">
              <svg
                class="animate-spin h-4.5 w-4.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Waiting for PIN verification...</span>
            </div>
          </div>

          <!-- Step 2 Details -->
          <div v-else>
            <h3 class="text-xl font-extrabold text-brand-indigo mb-2">Payment Confirmed!</h3>
            <p class="text-xs text-brand-slate mb-6 leading-relaxed">
              Your payment of <strong>KES 4,150</strong> has been successfully authorized and held securely in Jamii Escrow.
            </p>
            <div class="flex items-center justify-center space-x-2 text-xs font-extrabold text-brand-indigo">
              <svg
                class="animate-spin h-4.5 w-4.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Redirecting to Order Tracking...</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
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
    transform: translateY(-6px);
  }
}
.animate-bounce-short {
  animation: bounce-short 0.45s ease-out;
}
</style>
