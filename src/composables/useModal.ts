import { ref } from 'vue'

const isCreatePostModalOpen = ref(false)

export function useModal() {
  const openCreatePostModal = () => {
    isCreatePostModalOpen.value = true
  }

  const closeCreatePostModal = () => {
    isCreatePostModalOpen.value = false
  }

  const toggleCreatePostModal = () => {
    isCreatePostModalOpen.value = !isCreatePostModalOpen.value
  }

  return {
    isCreatePostModalOpen,
    openCreatePostModal,
    closeCreatePostModal,
    toggleCreatePostModal,
  }
}
