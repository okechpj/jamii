<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboarding'
import BaseButton from '@/components/ui/BaseButton.vue'
import SelectableChip from '@/components/ui/SelectableChip.vue'

const router = useRouter()
const store = useOnboardingStore()

const categories = [
  'Business',
  'Art',
  'Politics',
  'Fashion & Design',
  'Lifestyle',
  'Technology',
  'Home Goods',
]

const handleContinue = () => {
  if (store.selectedCategories.length > 0) {
    store.nextStep()
    router.push('/onboarding/step-3')
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-brand-indigo mb-2">
        What categories do you want to explore today?
      </h2>
      <p class="text-sm text-brand-slate">
        Select at least one category to personalize your Jamii Sasa experience.
      </p>
    </div>

    <div class="flex-1 flex flex-wrap gap-2 content-start">
      <SelectableChip
        v-for="cat in categories"
        :key="cat"
        :label="cat"
        :selected="store.selectedCategories.includes(cat)"
        @toggle="store.toggleCategory(cat)"
      />
    </div>

    <div class="mt-8">
      <BaseButton
        type="button"
        block
        :disabled="store.selectedCategories.length === 0"
        @click="handleContinue"
      >
        Continue
      </BaseButton>
    </div>
  </div>
</template>
