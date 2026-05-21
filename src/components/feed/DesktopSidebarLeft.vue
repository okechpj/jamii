<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const links = [
  { id: 'user', label: 'Chidi', to: '#', icon: 'profile', isProfile: true },
  {
    id: 'friends',
    label: 'Friends',
    to: '/friends',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    to: '/marketplace',
    icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  },
  {
    id: 'saved',
    label: 'Saved',
    to: '#',
    icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z',
  },
]
</script>

<template>
  <div
    class="hidden lg:block w-72 sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto px-2 py-4"
  >
    <ul class="space-y-1">
      <li v-for="link in links" :key="link.id">
        <router-link
          :to="link.to"
          class="flex items-center space-x-3 p-2.5 rounded-xl transition-colors"
          :class="route.path === link.to ? 'bg-brand-indigo/5 font-bold' : 'hover:bg-brand-indigo/5'"
        >
          <div
            v-if="link.isProfile"
            class="h-9 w-9 rounded-full overflow-hidden border border-slate-200"
          >
            <img
              src="https://i.pravatar.cc/150?u=chidi"
              alt="Profile"
              class="h-full w-full object-cover"
            />
          </div>
          <div
            v-else
            class="h-9 w-9 flex items-center justify-center rounded-xl transition-colors"
            :class="route.path === link.to ? 'text-brand-gold bg-brand-gold/10' : 'text-brand-slate bg-brand-indigo/5'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="none"
              v-if="link.icon.length > 50"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="link.icon"
                stroke="currentColor"
                fill="none"
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
                :d="link.icon"
              />
            </svg>
          </div>
          <span
            class="text-sm"
            :class="
              route.path === link.to ? 'font-extrabold text-brand-indigo' : 'font-semibold text-brand-slate hover:text-brand-indigo'
            "
            >{{ link.label }}</span
          >
        </router-link>
      </li>
    </ul>

    <!-- Footer Links -->
    <div class="mt-8 px-4 text-xs text-brand-slate">
      <p>Privacy · Terms · Advertising · Ad Choices · Cookies · More · Jamii Sasa © 2026</p>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar but keep functionality */
div::-webkit-scrollbar {
  width: 8px;
}
div::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 4px;
}
div:hover::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
}
</style>
