import { ref } from 'vue'

const globalSearchQuery = ref('')

export function useSearch() {
  const clearSearch = () => {
    globalSearchQuery.value = ''
  }

  return {
    globalSearchQuery,
    clearSearch,
  }
}
