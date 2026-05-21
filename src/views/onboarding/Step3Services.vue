<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboarding'
import BaseButton from '@/components/ui/BaseButton.vue'
import SelectableChip from '@/components/ui/SelectableChip.vue'

const router = useRouter()
const store = useOnboardingStore()

const services = [
  'Plumbing',
  'Tailoring',
  'Carpentry',
  'Catering',
  'Home Cleaning',
  'Electrical',
  'Tutoring',
  'Hairdressing & Beauty',
]

const handleContinue = () => {
  if (store.selectedServices.length > 0) {
    store.nextStep()
    router.push('/onboarding/step-4')
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-brand-indigo mb-2">
        Which services would you be interested in?
      </h2>
      <p class="text-sm text-brand-slate">
        Select the categories you want to explore. This helps us tailor your community marketplace
        experience.
      </p>
    </div>

    <div class="flex-1 flex flex-wrap gap-2 content-start">
      <SelectableChip
        v-for="service in services"
        :key="service"
        :label="service"
        :selected="store.selectedServices.includes(service)"
        @toggle="store.toggleService(service)"
      />
    </div>

    <div class="mt-8">
      <BaseButton
        type="button"
        block
        :disabled="store.selectedServices.length === 0"
        @click="handleContinue"
      >
        Continue
      </BaseButton>
    </div>
  </div>
</template>
