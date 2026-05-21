import { ref, onMounted } from 'vue'

const isDark = ref(false)

// Initialize sync immediately if window is available
if (typeof window !== 'undefined') {
  isDark.value = document.documentElement.classList.contains('dark')
}

export function useTheme() {
  function toggleTheme() {
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Ensure client-side sync matches document class list on mount
  onMounted(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })

  return {
    isDark,
    toggleTheme,
  }
}
