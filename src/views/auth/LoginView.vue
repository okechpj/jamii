<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()

const identifier = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
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
    <div class="max-w-md w-full bg-white sm:rounded-2xl sm:shadow-xl p-6 sm:p-10 space-y-8">
      <!-- Header -->
      <div class="text-center flex flex-col items-center">
        <!-- Logo Icon -->
        <div
          class="h-16 w-16 bg-brand-indigo/10 text-brand-indigo rounded-full flex items-center justify-center mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <h1 class="text-3xl font-extrabold text-brand-indigo">Jamii Sasa</h1>
        <p class="mt-2 text-sm text-gray-500">Welcome back. Please log in to your account.</p>
      </div>

      <!-- Form -->
      <form class="space-y-6" @submit.prevent="handleLogin">
        <BaseInput
          v-model="identifier"
          label="Phone Number or Email"
          placeholder="Enter your details"
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
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
          </template>
        </BaseInput>

        <BaseInput
          v-model="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          required
        >
          <template #labelRight>
            <a href="#" class="text-xs font-semibold text-brand-indigo hover:text-[#0f172a]"
              >Forgot Password?</a
            >
          </template>
          <template #leading>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
          </template>
        </BaseInput>

        <div>
          <BaseButton type="submit" block :loading="loading"> Log In </BaseButton>
        </div>
      </form>

      <!-- Footer Link -->
      <div class="text-center mt-6">
        <p class="text-sm text-gray-600">
          Don't have an account?
          <RouterLink to="/signup" class="font-bold text-brand-indigo hover:text-[#0f172a]"
            >Sign up</RouterLink
          >
        </p>
      </div>
    </div>
  </div>
</template>
