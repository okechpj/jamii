<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useModal } from '@/composables/useModal'
import { useTheme } from '@/composables/useTheme'
import { useSearch } from '@/composables/useSearch'

defineProps<{
  activeSubTab: string
}>()

const emit = defineEmits<{
  (event: 'tab-change', tabId: string): void
}>()

const router = useRouter()
const { openCreatePostModal } = useModal()
const { isDark, toggleTheme } = useTheme()
const { globalSearchQuery } = useSearch()

const isCollapsed = ref(false)
let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0

const subTabs = [
  { id: 'shout-outs', label: 'Shout-Outs' },
  { id: 'price-checks', label: 'Price Checks' },
  { id: 'chama-wisdom', label: 'Chama Wisdom' },
  { id: 'profile', label: 'Profile' },
]

function selectSubTab(tabId: string) {
  emit('tab-change', tabId)
}

function handleScroll() {
  const currentScrollY = window.scrollY
  
  // Guard for iOS rubber banding/negative scrolls
  if (currentScrollY < 0) return

  const delta = currentScrollY - lastScrollY

  // Scroll down threshold: >10px. Scroll up threshold: >5px (or close to top)
  if (delta > 10 && currentScrollY > 60) {
    isCollapsed.value = true
  } else if (delta < -5 || currentScrollY <= 10) {
    isCollapsed.value = false
  }

  lastScrollY = currentScrollY
}

function goNotifications() {
  router.push('/notifications')
}

function goChat() {
  router.push('/chat')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    class="bg-white sticky top-0 z-40 border-b border-slate-200 shadow-sm transition-all duration-200 ease-in-out overflow-hidden lg:hidden"
    :style="{ height: isCollapsed ? '56px' : '152px' }"
  >
    <!-- Row 1: Logo & Actions (height: 56px) -->
    <div
      class="h-14 flex items-center justify-between px-4 transition-all duration-200 ease-in-out"
      :style="{ transform: isCollapsed ? 'translateY(-56px)' : 'translateY(0)', opacity: isCollapsed ? 0 : 1 }"
    >
      <h1 class="text-xl font-bold text-brand-indigo">Jamii Sasa</h1>

      <div class="flex items-center gap-2">
        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-indigo/5 text-brand-indigo hover:bg-brand-indigo/10 transition"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        <!-- Create Post -->
        <button
          @click="openCreatePostModal"
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold text-brand-indigo shadow-xs hover:bg-brand-gold-hover transition"
          title="Create post"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 4v16M4 12h16" />
          </svg>
        </button>

        <!-- Notifications -->
        <button
          @click="goNotifications"
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-indigo/5 text-brand-indigo hover:bg-brand-indigo/10 transition"
          title="Notifications"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        <!-- Chat -->
        <button
          @click="goChat"
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-indigo/5 text-brand-indigo hover:bg-brand-indigo/10 transition"
          title="Chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Row 2: Persistent Global Search (height: 56px) -->
    <div
      class="h-14 px-4 flex items-center transition-transform duration-200 ease-in-out"
      :style="{ transform: isCollapsed ? 'translateY(-56px)' : 'translateY(0)' }"
    >
      <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brand-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          v-model="globalSearchQuery"
          type="text"
          class="block w-full pl-10 pr-10 py-2 border border-slate-200 rounded-xl bg-brand-offwhite text-sm focus:ring-brand-gold focus:border-brand-gold text-brand-indigo placeholder-brand-slate/60 transition-colors"
          placeholder="Search Jamii Sasa..."
        />
      </div>
    </div>

    <!-- Row 3: Sub-tabs (height: 40px) -->
    <div
      class="h-10 border-t border-slate-100 flex items-center justify-around transition-all duration-200 ease-in-out"
      :style="{ transform: isCollapsed ? 'translateY(-80px)' : 'translateY(0)', opacity: isCollapsed ? 0 : 1 }"
    >
      <button
        v-for="tab in subTabs"
        :key="tab.id"
        @click="selectSubTab(tab.id)"
        class="flex-1 text-center text-xs font-bold transition-all relative h-full flex flex-col items-center justify-center outline-hidden"
        :class="activeSubTab === tab.id ? 'text-brand-gold font-bold' : 'text-brand-slate hover:text-brand-indigo font-semibold'"
      >
        <span>{{ tab.label }}</span>
        <span
          v-if="activeSubTab === tab.id"
          class="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-12 bg-brand-gold rounded-full transition-all duration-200"
        ></span>
      </button>
    </div>
  </div>
</template>
