<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()

const fullName = ref('')
const email = ref('')
const phone = ref('')
const agreeTerms = ref(false)
const loading = ref(false)

const handleSignUp = async () => {
  if (!agreeTerms.value) {
    alert('Please agree to the Terms of Service and Privacy Policy.')
    return
  }

  loading.value = true
  // Mock API call
  setTimeout(() => {
    loading.value = false
    router.push('/onboarding/source')
  }, 1000)
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-brand-offwhite sm:px-6 lg:px-8 py-10 sm:py-12"
  >
    <div class="max-w-md w-full bg-white sm:rounded-2xl sm:shadow-xl p-6 sm:p-10 space-y-6">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-xl font-semibold text-brand-indigo tracking-tight">Jamii Sasa</h2>
        <h1 class="mt-2 text-3xl font-extrabold text-gray-900">Create Account</h1>
        <p class="mt-2 text-sm text-gray-500">
          Start connecting with your trusted community today.
        </p>
      </div>

      <!-- Form -->
      <form class="space-y-4" @submit.prevent="handleSignUp">
        <BaseInput v-model="fullName" label="Full Name" placeholder="Jane Doe" required>
          <template #leading>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
          </template>
        </BaseInput>

        <BaseInput
          v-model="email"
          type="email"
          label="Email Address"
          placeholder="jane@example.com"
          required
        >
          <template #leading>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </template>
        </BaseInput>

        <BaseInput
          v-model="phone"
          type="tel"
          label="Phone Number"
          placeholder="+254 700 000 000"
          required
        >
          <template #leading>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
              />
            </svg>
          </template>
        </BaseInput>

        <!-- Terms & Privacy -->
        <div class="flex items-start pt-2">
          <div class="flex items-center h-5">
            <input
              id="terms"
              v-model="agreeTerms"
              type="checkbox"
              class="focus:ring-brand-indigo h-4 w-4 text-brand-indigo border-gray-300 rounded"
              required
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="terms" class="font-medium text-gray-700">
              I agree to the
              <a href="#" class="text-brand-indigo hover:text-[#0f172a] font-semibold"
                >Terms of Service</a
              >
              and
              <a href="#" class="text-brand-indigo hover:text-[#0f172a] font-semibold">Privacy Policy</a
              >.
            </label>
          </div>
        </div>

        <div class="pt-4">
          <BaseButton type="submit" block :loading="loading"> Create Account </BaseButton>
        </div>
      </form>

      <!-- Footer Link -->
      <div class="text-center mt-6">
        <p class="text-sm text-gray-600">
          Already have an account?
          <RouterLink to="/login" class="font-bold text-brand-indigo hover:text-[#0f172a]"
            >Log in here</RouterLink
          >
        </p>
      </div>
    </div>
  </div>
</template>
