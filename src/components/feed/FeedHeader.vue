<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useModal } from '@/composables/useModal'
import FeedSearchBar from '@/components/feed/FeedSearchBar.vue'

const props = defineProps<{ categories: string[] }>()
const router = useRouter()
const route = useRoute()
const { openCreatePostModal } = useModal()

const isCollapsed = ref(false)
const searchOpen = ref(false)
const scrollThreshold = 80

const activeTab = computed(() => {
  if (route.path.startsWith('/marketplace')) return 'marketplace'
  if (route.path.startsWith('/chat')) return 'chat'
  if (route.path.startsWith('/notifications')) return 'notifications'
  return 'home'
})

const showSearchBar = computed(() => !isCollapsed.value || searchOpen.value)

function toggleSearch() {
  searchOpen.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function updateHeaderScroll() {
  isCollapsed.value = window.scrollY > scrollThreshold
  if (!isCollapsed.value) {
    searchOpen.value = false
  }
}

function goNotifications() {
  router.push('/notifications')
}

function goChat() {
  router.push('/chat')
}

function goMarketplace() {
  router.push('/marketplace')
}

function goFriends() {
  router.push('/friends')
}

function goHome() {
  router.push('/')
}

onMounted(() => {
  window.addEventListener('scroll', updateHeaderScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateHeaderScroll)
})
</script>

<template>
  <div class="bg-white px-4 pb-3 pt-3 sticky top-0 z-40 border-b border-gray-100 shadow-sm transition-all duration-300 lg:hidden">
    <div class="flex items-center justify-between gap-3 mb-3">
      <div class="flex items-center gap-2">
        <h1 class="text-xl font-bold text-amber-800">Jamii Sasa</h1>
        <button
          v-if="isCollapsed && !searchOpen"
          @click="toggleSearch"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="openCreatePostModal"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white shadow-sm hover:bg-teal-700 transition"
          aria-label="Create post"
          title="Create post"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 4v16M4 12h16" />
          </svg>
        </button>

        <button
          @click="goNotifications"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
          aria-label="Notifications"
          title="Notifications"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        <button
          @click="goChat"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
          aria-label="Chat"
          title="Chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </div>

    <FeedSearchBar
      :categories="props.categories"
      :collapsed="isCollapsed && !searchOpen"
      @open-search="toggleSearch"
    />
  </div>
</template>
