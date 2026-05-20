<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'

const props = defineProps<{
  modelValue: string | number
  label?: string
  type?: string
  placeholder?: string
  error?: string
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const slots = useSlots()
const hasLeadingIcon = computed(() => !!slots.leading)
const hasTrailingIcon = computed(() => !!slots.trailing || isPassword.value)

const isPassword = computed(() => props.type === 'password')
const showPassword = ref(false)

const inputType = computed(() => {
  if (isPassword.value) {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type || 'text'
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="flex flex-col mb-4 w-full">
    <div v-if="label || $slots.labelRight" class="flex justify-between items-center mb-1">
      <label v-if="label" class="text-sm font-medium text-gray-700">
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
      <slot name="labelRight"></slot>
    </div>

    <div class="relative flex items-center">
      <!-- Leading Icon -->
      <div
        v-if="hasLeadingIcon"
        class="absolute left-3 text-gray-400 flex items-center pointer-events-none"
      >
        <slot name="leading"></slot>
      </div>

      <!-- Input Field -->
      <input
        :type="inputType"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        :required="required"
        class="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-3 transition-colors"
        :class="[
          hasLeadingIcon ? 'pl-10' : 'pl-3',
          hasTrailingIcon ? 'pr-10' : 'pr-3',
          error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '',
        ]"
      />

      <!-- Trailing Icon / Password Toggle -->
      <div v-if="hasTrailingIcon" class="absolute right-3 flex items-center">
        <button
          v-if="isPassword"
          type="button"
          @click="togglePassword"
          class="text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <svg
            v-if="showPassword"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          </svg>
        </button>
        <slot v-else name="trailing"></slot>
      </div>
    </div>

    <span v-if="error" class="text-sm text-red-500 mt-1">{{ error }}</span>
  </div>
</template>
