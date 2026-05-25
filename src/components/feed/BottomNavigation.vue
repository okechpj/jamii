<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useModal } from '@/composables/useModal'

const route = useRoute()
const { openCreatePostModal } = useModal()

const tabs = [
  {
    id: 'discovery',
    label: 'Discovery',
    to: '/',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  }, // Search/Discovery icon
  
 
  {
    id: 'marketplace',
    label: 'Marketplace',
    to: '/marketplace',
    icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  }, // Shop icon
  { id: 'create', label: 'Create', to: '#', icon: 'M12 4v16m8-8H4' }, // Plus icon
   {
    id: 'messages',
    label: 'Chat',
    to: '/chat',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  }, // Chat bubble
  {
    id: 'profile',
    label: 'Profile',
    to: '#',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  }, // User icon
]

const handleTabClick = (e: Event, tabId: string) => {
  if (tabId === 'create') {
    e.preventDefault()
    openCreatePostModal()
  }
}
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-50 lg:hidden shadow-xs">
    <!-- Inner wrapper for desktop alignment if needed -->
    <div class="max-w-xl mx-auto flex justify-around items-center h-16 px-2">
      <router-link
        v-for="tab in tabs"
        :key="tab.id"
        :to="tab.to"
        @click="(e) => handleTabClick(e, tab.id)"
        class="flex flex-col items-center justify-center w-full h-full relative"
      >
        <div
          class="flex items-center justify-center transition-all duration-200"
          :class="route.path === tab.to && tab.to !== '#'
            ? 'bg-brand-secondary-green text-white rounded-full h-10 w-10 shadow-xs'
            : 'text-brand-slate hover:text-brand-indigo h-10 w-10'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" :d="tab.icon" />
          </svg>
        </div>
        <span
          class="text-[10px] mt-0.5 transition-colors"
          :class="route.path === tab.to && tab.to !== '#' ? 'text-brand-secondary-green font-bold' : 'text-brand-slate font-medium'"
        >
          {{ tab.label }}
        </span>
      </router-link>
    </div>
  </div>
</template>
