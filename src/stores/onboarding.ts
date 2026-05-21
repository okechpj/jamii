import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useOnboardingStore = defineStore('onboarding', () => {
  // State
  const currentStep = ref(1)
  const discoverySource = ref<string | null>(null)
  const selectedCategories = ref<string[]>([])
  const selectedServices = ref<string[]>([])

  // Load from localStorage if exists
  const savedState = localStorage.getItem('jamii_onboarding_state')
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState)
      if (parsed.currentStep) currentStep.value = parsed.currentStep
      if (parsed.discoverySource) discoverySource.value = parsed.discoverySource
      if (parsed.selectedCategories) selectedCategories.value = parsed.selectedCategories
      if (parsed.selectedServices) selectedServices.value = parsed.selectedServices
    } catch {
      console.error('Failed to parse onboarding state from localStorage')
    }
  }

  // Persist state changes
  watch(
    [currentStep, discoverySource, selectedCategories, selectedServices],
    () => {
      localStorage.setItem(
        'jamii_onboarding_state',
        JSON.stringify({
          currentStep: currentStep.value,
          discoverySource: discoverySource.value,
          selectedCategories: selectedCategories.value,
          selectedServices: selectedServices.value,
        }),
      )
    },
    { deep: true },
  )

  // Actions
  function nextStep() {
    if (currentStep.value < 4) {
      currentStep.value++
    }
  }

  function prevStep() {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  function setStep(step: number) {
    if (step >= 1 && step <= 4) {
      currentStep.value = step
    }
  }

  function toggleCategory(category: string) {
    const index = selectedCategories.value.indexOf(category)
    if (index === -1) {
      selectedCategories.value.push(category)
    } else {
      selectedCategories.value.splice(index, 1)
    }
  }

  function toggleService(service: string) {
    const index = selectedServices.value.indexOf(service)
    if (index === -1) {
      selectedServices.value.push(service)
    } else {
      selectedServices.value.splice(index, 1)
    }
  }

  function completeOnboarding() {
    // Handle final submission to API here
    console.log('Onboarding Complete:', {
      source: discoverySource.value,
      categories: selectedCategories.value,
      services: selectedServices.value,
    })

    // Clear state
    localStorage.removeItem('jamii_onboarding_state')
  }

  return {
    currentStep,
    discoverySource,
    selectedCategories,
    selectedServices,
    nextStep,
    prevStep,
    setStep,
    toggleCategory,
    toggleService,
    completeOnboarding,
  }
})
