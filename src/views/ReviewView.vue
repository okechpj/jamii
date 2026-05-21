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
    }
  }
  const mp = marketplaceProviders.find((p) => p.id === providerId)
  if (mp) {
    return {
      id: mp.id,
      name: mp.providerName,
      title: mp.serviceTitle,
      avatar: mp.providerAvatar,
    }
  }
  return {
    id: providerProfileData.id,
    name: providerProfileData.name,
    title: providerProfileData.title,
    avatar: providerProfileData.avatar,
  }
})

// Star rating logic
const rating = ref(5)
const ratingText = computed(() => {
  switch (rating.value) {
    case 5:
      return 'Excellent & Trustworthy'
    case 4:
      return 'Very Good & Professional'
    case 3:
      return 'Good & Satisfactory'
    case 2:
      return 'Needs Improvement'
    case 1:
      return 'Poor Experience'
    default:
      return ''
  }
})

// Quick feedback states
const onTime = ref<'punctual' | 'delayed' | null>('punctual')
const matchExpectations = ref<'matched' | 'adjusted' | null>('matched')
const hireAgain = ref<'definitely' | 'maybe' | null>('definitely')

// Written review
const comment = ref('Grace was incredibly thorough with the kitchen cleaning. She arrived early and brought her own high-quality supplies...')

// Media upload states (mocked upload experience)
const videoUploaded = ref(false)
const videoFileName = ref('')
const photosCount = ref(0)

const triggerVideoUpload = () => {
  // Simulate video upload
  if (videoUploaded.value) {
    videoUploaded.value = false
    videoFileName.value = ''
  } else {
    videoUploaded.value = true
    videoFileName.value = 'rec_kitchen_clean.mp4'
  }
}

const triggerPhotoUpload = () => {
  // Simulate photo uploads
  if (photosCount.value > 0) {
    photosCount.value = 0
  } else {
    photosCount.value = 3
  }
}

// Recommendation states
// 'strongly-recommend', 'recommend', 'neutral', 'not-recommend'
const recommendation = ref<'strongly-recommend' | 'recommend' | 'neutral' | 'not-recommend'>('strongly-recommend')

// Dropdown options menu state
const showMenu = ref(false)
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

// Submit flow states
const isSubmitting = ref(false)
const showSuccessModal = ref(false)

const submitReview = () => {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    showSuccessModal.value = true
    // Redirect to home after 3 seconds
    setTimeout(() => {
      router.push('/')
    }, 3000)
  }, 1000)
}

const navigateBack = () => {
  router.push(`/provider/${providerId}/track?paid=true`)
}
</script>

<template>
  <div class="min-h-screen bg-brand-offwhite flex flex-col">
    <!-- Main Content Wrapper -->
    <div class="flex-1 flex justify-center bg-brand-offwhite lg:mt-[64px]">
      <!-- Desktop Left Sidebar -->
      <DesktopSidebarLeft />

      <!-- Center Review Column -->
      <div
        class="w-full lg:max-w-[680px] bg-white min-h-screen shadow-sm relative lg:rounded-xl lg:overflow-hidden lg:mb-8 flex flex-col pb-28"
      >
        <!-- Header -->
        <div class="px-4 py-4 bg-white sticky top-0 z-40 flex items-center justify-between border-b border-slate-100">
          <div class="flex items-center text-brand-indigo font-bold text-lg">
            <button @click="navigateBack" class="p-1 -ml-1 mr-2 focus:outline-none cursor-pointer hover:bg-slate-50 rounded-full transition-colors" aria-label="Back">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
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

          <!-- Options Menu -->
          <div class="relative">
            <button @click="toggleMenu" class="text-brand-indigo p-1.5 focus:outline-none cursor-pointer hover:bg-slate-50 rounded-full transition-colors" aria-label="More options">
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
                <button @click="navigateBack" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center border-t border-slate-50">
                  <span>Back to Tracking</span>
                </button>
              </div>
            </transition>
          </div>
        </div>

        <!-- Main Form Container -->
        <div class="flex-1 px-5 pt-6 pb-8 space-y-6 overflow-y-auto">
          <!-- Page Header Titles -->
          <div class="text-left space-y-1.5">
            <h2 class="text-2xl font-black text-slate-900 tracking-tight">How was your experience?</h2>
            <p class="text-sm text-slate-500 font-medium leading-relaxed">
              Your feedback helps communities discover trusted providers.
            </p>
          </div>

          <!-- Provider Detail Card -->
          <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center space-x-4">
            <img
              :src="provider.avatar"
              :alt="provider.name"
              class="h-14 w-14 rounded-full object-cover bg-slate-50 border border-slate-100"
            />
            <div class="flex-1 min-w-0">
              <h4 class="text-base font-bold text-slate-900 truncate">{{ provider.name }}</h4>
              <p class="text-xs text-slate-500 font-bold truncate mt-0.5">{{ provider.title }}</p>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Oct 24</p>
            </div>
          </div>

          <!-- Star Rating Component -->
          <div class="flex flex-col items-center py-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
            <div class="flex items-center space-x-2.5">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                @click="rating = star"
                class="p-1 hover:scale-115 active:scale-95 transition-transform focus:outline-none cursor-pointer"
                :aria-label="`Rate ${star} stars`"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-9 w-9 transition-colors duration-250"
                  :class="[
                    star <= rating ? 'text-brand-gold fill-[#3CB371]' : 'text-slate-300 fill-transparent'
                  ]"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.772-.564-.373-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z"
                  />
                </svg>
              </button>
            </div>
            <span class="text-sm font-bold text-brand-gold mt-3 tracking-wide">
              {{ ratingText }}
            </span>
          </div>

          <!-- Quick Feedback Section -->
          <div class="space-y-5">
            <!-- Time Compliance -->
            <div class="space-y-2">
              <label class="text-sm font-extrabold text-slate-800">Was the provider on time?</label>
              <div class="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  @click="onTime = 'punctual'"
                  class="px-5 py-2.5 rounded-full border text-xs font-bold transition-all cursor-pointer"
                  :class="[
                    onTime === 'punctual'
                      ? 'bg-brand-indigo border-brand-indigo text-white font-black shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  ]"
                >
                  Punctual
                </button>
                <button
                  type="button"
                  @click="onTime = 'delayed'"
                  class="px-5 py-2.5 rounded-full border text-xs font-bold transition-all cursor-pointer"
                  :class="[
                    onTime === 'delayed'
                      ? 'bg-brand-indigo border-brand-indigo text-white font-black shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  ]"
                >
                  Slightly Delayed
                </button>
              </div>
            </div>

            <!-- Quality Compliance -->
            <div class="space-y-2">
              <label class="text-sm font-extrabold text-slate-800">Did the work match expectations?</label>
              <div class="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  @click="matchExpectations = 'matched'"
                  class="px-5 py-2.5 rounded-full border text-xs font-bold transition-all cursor-pointer"
                  :class="[
                    matchExpectations === 'matched'
                      ? 'bg-brand-indigo border-brand-indigo text-white font-black shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  ]"
                >
                  Matched Perfectly
                </button>
                <button
                  type="button"
                  @click="matchExpectations = 'adjusted'"
                  class="px-5 py-2.5 rounded-full border text-xs font-bold transition-all cursor-pointer"
                  :class="[
                    matchExpectations === 'adjusted'
                      ? 'bg-brand-indigo border-brand-indigo text-white font-black shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  ]"
                >
                  Needed Adjustments
                </button>
              </div>
            </div>

            <!-- Loyalty / Retention compliance -->
            <div class="space-y-2">
              <label class="text-sm font-extrabold text-slate-800">Would you hire {{ provider.name.split(' ')[0] }} again?</label>
              <div class="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  @click="hireAgain = 'definitely'"
                  class="px-5 py-2.5 rounded-full border text-xs font-bold transition-all cursor-pointer"
                  :class="[
                    hireAgain === 'definitely'
                      ? 'bg-brand-indigo border-brand-indigo text-white font-black shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  ]"
                >
                  Definitely
                </button>
                <button
                  type="button"
                  @click="hireAgain = 'maybe'"
                  class="px-5 py-2.5 rounded-full border text-xs font-bold transition-all cursor-pointer"
                  :class="[
                    hireAgain === 'maybe'
                      ? 'bg-brand-indigo border-brand-indigo text-white font-black shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  ]"
                >
                  Maybe
                </button>
              </div>
            </div>
          </div>

          <!-- Written review comment textarea -->
          <div class="space-y-2 flex flex-col">
            <label for="review-comments" class="text-sm font-extrabold text-slate-800">Tell others about your experience</label>
            <textarea
              id="review-comments"
              v-model="comment"
              rows="4"
              class="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-850 placeholder-slate-400 focus:outline-none focus:border-brand-indigo focus:ring-2 focus:ring-brand-indigo/20 transition-all font-medium leading-relaxed resize-none shadow-2xs"
              placeholder="Tell others what you appreciated about their service..."
            ></textarea>
          </div>

          <!-- Media uploads widgets (Dashed borders) -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Video upload -->
            <button
              type="button"
              @click="triggerVideoUpload"
              class="border-2 border-dashed border-slate-200 bg-white rounded-2xl py-6 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-slate-50/50 hover:border-brand-indigo active:scale-98"
            >
              <div v-if="!videoUploaded" class="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-brand-indigo mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span class="text-[11px] font-bold text-slate-700 text-center px-2">Upload Video Recommendation</span>
              </div>
              <div v-else class="flex flex-col items-center px-2">
                <div class="h-6 w-6 rounded-full bg-brand-indigo/10 text-brand-indigo flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-[10px] font-bold text-brand-indigo truncate max-w-full">
                  {{ videoFileName }}
                </span>
                <span class="text-[9px] text-slate-400 font-medium mt-0.5">Click to remove</span>
              </div>
            </button>

            <!-- Photo upload -->
            <button
              type="button"
              @click="triggerPhotoUpload"
              class="border-2 border-dashed border-slate-200 bg-white rounded-2xl py-6 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-slate-50/50 hover:border-brand-indigo active:scale-98"
            >
              <div v-if="photosCount === 0" class="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-brand-indigo mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span class="text-[11px] font-bold text-slate-700 text-center px-2">Add Work Photos</span>
              </div>
              <div v-else class="flex flex-col items-center px-2">
                <div class="h-6 w-6 rounded-full bg-brand-indigo/10 text-brand-indigo flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-[10px] font-bold text-brand-indigo">
                  {{ photosCount }} Photos Selected
                </span>
                <span class="text-[9px] text-slate-400 font-medium mt-0.5">Click to clear</span>
              </div>
            </button>
          </div>

          <!-- Recommendation Container (Would you recommend this provider?) -->
          <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200/60 space-y-4">
            <div class="flex items-center space-x-2">
              <!-- Recommend icon -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brand-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 class="text-sm font-extrabold text-brand-indigo">Would you recommend this provider?</h4>
            </div>

            <!-- Recommendation options grid -->
            <div class="grid grid-cols-2 gap-3.5">
              <!-- Strongly Recommend -->
              <button
                type="button"
                @click="recommendation = 'strongly-recommend'"
                class="h-12 rounded-xl flex items-center justify-center font-bold text-xs cursor-pointer border transition-all"
                :class="[
                  recommendation === 'strongly-recommend'
                    ? 'bg-brand-indigo border-brand-indigo text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                ]"
              >
                <svg v-if="recommendation === 'strongly-recommend'" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Strongly Recommend
              </button>

              <!-- Recommend -->
              <button
                type="button"
                @click="recommendation = 'recommend'"
                class="h-12 rounded-xl flex items-center justify-center font-bold text-xs cursor-pointer border transition-all"
                :class="[
                  recommendation === 'recommend'
                    ? 'bg-brand-indigo border-brand-indigo text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                ]"
              >
                <svg v-if="recommendation === 'recommend'" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Recommend
              </button>

              <!-- Neutral -->
              <button
                type="button"
                @click="recommendation = 'neutral'"
                class="h-12 rounded-xl flex items-center justify-center font-bold text-xs cursor-pointer border transition-all"
                :class="[
                  recommendation === 'neutral'
                    ? 'bg-brand-indigo border-brand-indigo text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                ]"
              >
                Neutral
              </button>

              <!-- Not Recommend -->
              <button
                type="button"
                @click="recommendation = 'not-recommend'"
                class="h-12 rounded-xl flex items-center justify-center font-bold text-xs cursor-pointer border transition-all"
                :class="[
                  recommendation === 'not-recommend'
                    ? 'bg-red-600 border-red-600 text-white shadow-xs font-extrabold'
                    : 'bg-white border-red-200 text-red-600 hover:bg-red-50/30'
                ]"
              >
                Not Recommend
              </button>
            </div>
          </div>

          <!-- Helper subtext -->
          <div class="flex items-center justify-center space-x-2 pt-2 pb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-brand-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="text-xs text-slate-500 font-bold">Your review helps trusted local providers grow.</span>
          </div>
        </div>

        <!-- Sticky Bottom CTA -->
        <div class="bg-white/95 backdrop-blur-xs border-t border-gray-100 p-4 absolute bottom-0 left-0 right-0 z-30 flex flex-col pb-6">
          <button
            @click="submitReview"
            :disabled="isSubmitting"
            class="w-full h-13 rounded-full bg-brand-gold hover:bg-brand-gold-hover disabled:bg-brand-gold/50 disabled:text-brand-indigo/50 text-brand-indigo font-black text-sm shadow-md transition-colors flex items-center justify-center space-x-2 cursor-pointer border-none"
          >
            <span v-if="isSubmitting">Submitting Review...</span>
            <span v-else class="flex items-center space-x-2 justify-center">
              <span>Submit Review</span>
              <!-- Paper Plane/Send icon -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Success Feedback Overlay Modal -->
    <transition name="fade">
      <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4">
        <div class="bg-white rounded-3xl p-7 max-w-sm w-full shadow-2xl flex flex-col items-center text-center space-y-4">
          <!-- Animated checkmark circle -->
          <div class="h-16 w-16 bg-brand-indigo/10 rounded-full flex items-center justify-center text-brand-indigo animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-xl font-black text-brand-indigo">Review Submitted!</h3>
          <p class="text-sm text-slate-500 font-medium leading-relaxed">
            Thank you for sharing your experience. Your feedback is highly valuable to the community!
          </p>
          <div class="flex items-center space-x-1.5 text-xs text-brand-indigo font-bold">
            <span class="animate-pulse">Returning you home</span>
            <span class="flex space-x-0.5">
              <span class="animate-bounce" style="animation-delay: 0.1s">.</span>
              <span class="animate-bounce" style="animation-delay: 0.2s">.</span>
              <span class="animate-bounce" style="animation-delay: 0.3s">.</span>
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Options menu animations */
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Success Modal transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
