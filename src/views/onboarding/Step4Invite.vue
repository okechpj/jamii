<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboarding'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const store = useOnboardingStore()

const referralLink = 'jamiisasa.me/user123'
const copied = ref(false)

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(referralLink)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy', err)
  }
}

const handleFinish = () => {
  store.completeOnboarding()
  router.push('/')
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="text-center mb-8 flex flex-col items-center">
      <!-- Icon -->
      <div class="h-16 w-16 bg-brand-indigo/10 rounded-full mb-4 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-brand-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mb-2">Grow your Jamii</h2>
      <p class="text-sm text-gray-500">
        Jamii Sasa thrives on trust. Invite your friends and earn trust badges and community rewards
        when they join.
      </p>
    </div>

    <div class="flex-1 flex flex-col space-y-6">
      <!-- Referral Link Box -->
      <div class="bg-brand-offwhite p-6 rounded-xl border border-slate-100 text-center">
        <p class="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
          Your Referral Link
        </p>
        <div class="bg-slate-100 text-slate-700 py-3 px-4 rounded-lg font-medium mb-4">
          {{ referralLink }}
        </div>
        <BaseButton type="button" block @click="copyLink">
          {{ copied ? 'Copied!' : 'Copy Link' }}
        </BaseButton>
      </div>

      <!-- Share Options -->
      <div class="text-center">
        <p class="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wider">Share Via</p>
        <div class="flex justify-center space-x-6">
          <button
            class="text-xs text-gray-600 flex flex-col items-center space-y-2 hover:text-brand-indigo"
          >
            <div class="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                />
              </svg>
            </div>
            <span>WhatsApp</span>
          </button>

          <button
            class="text-xs text-gray-600 flex flex-col items-center space-y-2 hover:text-brand-indigo"
          >
            <div class="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span>Facebook</span>
          </button>

          <button
            class="text-xs text-gray-600 flex flex-col items-center space-y-2 hover:text-brand-indigo"
          >
            <div class="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span>SMS</span>
          </button>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <BaseButton type="button" variant="secondary" block @click="handleFinish">
        Continue to Feeds
      </BaseButton>
    </div>
  </div>
</template>
