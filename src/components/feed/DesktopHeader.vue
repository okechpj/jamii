<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useModal } from '@/composables/useModal'
import { useSearch } from '@/composables/useSearch'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()

const router = useRouter()
const { globalSearchQuery } = useSearch()
const { openCreatePostModal } = useModal()

const notificationOpen = ref(false)
const loadingNotifications = ref(false)
const notificationError = ref<string | null>(null)
const notificationButtonRef = ref<HTMLElement | null>(null)
const notificationPanelRef = ref<HTMLElement | null>(null)

const notifications = ref([
  {
    id: 1,
    title: 'Booking confirmed',
    description: 'Your appointment with Amina has been confirmed for tomorrow.',
    time: '2m ago',
    read: false,
  },
  {
    id: 2,
    title: 'New message from David',
    description: 'David replied to your project request.',
    time: '34m ago',
    read: false,
  },
  {
    id: 3,
    title: 'Service update',
    description: 'Your payment was received successfully.',
    time: '1h ago',
    read: true,
  },
  {
    id: 4,
    title: 'Review reminder',
    description: 'Leave feedback for Zahra after your last service.',
    time: 'Yesterday',
    read: true,
  },
])

const unreadCount = computed(() => notifications.value.filter((notification) => !notification.read).length)

function toggleNotifications() {
  notificationOpen.value = !notificationOpen.value

  if (notificationOpen.value) {
    loadingNotifications.value = true
    notificationError.value = null
    window.setTimeout(() => {
      loadingNotifications.value = false
    }, 200)
  }
}

function markAsRead(id: number) {
  const notification = notifications.value.find((item) => item.id === id)
  if (notification) {
    notification.read = true
  }
}

function markAllAsRead() {
  notifications.value.forEach((notification) => {
    notification.read = true
  })
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node
  if (
    notificationOpen.value &&
    notificationPanelRef.value &&
    notificationButtonRef.value &&
    !notificationPanelRef.value.contains(target) &&
    !notificationButtonRef.value.contains(target)
  ) {
    notificationOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
    class="hidden lg:flex fixed top-0 w-full bg-white h-16 shadow-xs z-50 px-4 items-center justify-between border-b border-slate-100"
  >
    <!-- Left: Logo & Search -->
    <div class="flex items-center space-x-4 flex-1">
      <button @click="router.back()" class="hidden xl:inline-flex items-center justify-center h-10 w-10 rounded-xl bg-brand-indigo/5 text-brand-indigo hover:bg-brand-indigo/10 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <router-link to="/" class="text-2xl font-bold text-brand-indigo hover:text-brand-indigo/80">Jamii Sasa</router-link>
 
      <!-- Integrated Search -->
      <div class="relative w-full max-w-sm ml-4">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          v-model="globalSearchQuery"
          type="text"
          class="block w-full pl-10 py-2 border-none rounded-xl bg-brand-indigo/5 text-brand-indigo placeholder-slate-400 text-sm focus:ring-2 focus:ring-brand-gold focus:bg-white transition-all"
          placeholder="Search Jamii Sasa"
        />
      </div>
    </div>
 
    <!-- Center: Main Navigation Icons (Like FB) -->
    <div class="flex justify-center space-x-2 flex-1">
      <button
        class="px-10 py-2 text-brand-gold border-b-2 border-brand-gold hover:bg-brand-indigo/5 rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </button>
      <button
        class="px-10 py-2 text-brand-slate hover:bg-brand-indigo/5 hover:text-brand-indigo rounded-lg transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </button>
      <button
        class="px-10 py-2 text-brand-slate hover:bg-brand-indigo/5 hover:text-brand-indigo rounded-lg transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>
 
    <!-- Right: Profile & Actions -->
    <div class="flex items-center justify-end space-x-3 flex-1">
      <button
        @click="openCreatePostModal"
        class="h-10 w-10 bg-brand-indigo/5 rounded-xl flex items-center justify-center text-brand-indigo hover:bg-brand-indigo/10 transition-colors focus:outline-none"
        title="Create Post"
      >
        <svg
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      <button
        @click="router.push('/chat')"
        class="h-10 w-10 bg-brand-indigo/5 rounded-xl flex items-center justify-center text-brand-indigo hover:bg-brand-indigo/10 transition-colors focus:outline-none"
        title="Chat"
      >
        <svg
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
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>
      <!-- Theme Toggle -->
      <button
        @click="toggleTheme"
        class="h-10 w-10 bg-brand-indigo/5 rounded-xl flex items-center justify-center text-brand-indigo hover:bg-brand-indigo/10 transition-colors focus:outline-none"
        :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
      >
        <!-- Sun Icon (for dark mode) -->
        <svg
          v-if="isDark"
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
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
        <!-- Moon Icon (for light mode) -->
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
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>

      <div ref="notificationButtonRef" class="relative">
        <button
          @click.stop="toggleNotifications"
          class="relative h-10 w-10 bg-brand-indigo/5 rounded-xl flex items-center justify-center text-brand-indigo hover:bg-brand-indigo/10 transition-colors focus:outline-none"
          title="Notifications"
        >
          <svg
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
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span
            v-if="unreadCount > 0"
            class="absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white"
          >
            {{ unreadCount }}
          </span>
        </button>
 
        <div
          v-if="notificationOpen"
          ref="notificationPanelRef"
          class="absolute right-0 top-full z-50 mt-3 w-[320px] rounded-xl border border-slate-100 bg-white shadow-xl ring-1 ring-slate-900/5"
        >
          <div class="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <div>
              <p class="text-sm font-semibold text-brand-indigo">Notifications</p>
              <p class="text-xs text-brand-slate">Latest updates and alerts</p>
            </div>
            <button
              @click="markAllAsRead"
              class="rounded-xl px-3 py-1 text-xs font-semibold text-brand-gold hover:bg-brand-gold/10"
            >
              Mark all read
            </button>
          </div>
 
          <div class="max-h-85 overflow-y-auto">
            <div v-if="loadingNotifications" class="space-y-3 p-4">
              <div class="h-14 animate-pulse rounded-xl bg-slate-200"></div>
              <div class="h-14 animate-pulse rounded-xl bg-slate-200"></div>
              <div class="h-14 animate-pulse rounded-xl bg-slate-200"></div>
            </div>
 
            <div v-else-if="notificationError" class="px-4 py-6 text-center text-sm text-brand-slate">
              <p class="font-semibold text-brand-indigo">Cannot load notifications</p>
              <p class="mt-2">{{ notificationError }}</p>
              <button
                @click="toggleNotifications"
                class="mt-4 rounded-xl bg-brand-gold px-4 py-2 text-sm font-semibold text-white hover:bg-brand-gold-hover"
              >
                Retry
              </button>
            </div>
 
            <div v-else-if="notifications.length === 0" class="px-4 py-6 text-center text-sm text-brand-slate">
              <p class="font-semibold text-brand-indigo">No new notifications</p>
              <p class="mt-2">You’re all caught up for now.</p>
            </div>
 
            <div v-else class="space-y-2 p-3">
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="rounded-xl border p-3 transition hover:border-brand-gold/50"
                :class="notification.read ? 'border-transparent bg-slate-50 text-brand-slate' : 'border-brand-gold/20 bg-brand-gold/5 text-brand-indigo shadow-xs'"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="truncate text-sm font-semibold text-brand-indigo">{{ notification.title }}</p>
                    <p class="mt-1 text-xs leading-5 text-brand-slate">{{ notification.description }}</p>
                  </div>
                  <button
                    @click.stop="markAsRead(notification.id)"
                    class="text-xs font-semibold text-brand-slate hover:text-brand-indigo"
                  >
                    {{ notification.read ? 'Read' : 'Mark read' }}
                  </button>
                </div>
                <div class="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{{ notification.time }}</span>
                  <span
                    v-if="!notification.read"
                    class="rounded-xl bg-brand-gold px-2 py-0.5 text-[10px] font-semibold text-white"
                  >
                    New
                  </span>
                </div>
              </div>
            </div>
          </div>
 
          <div class="border-t border-gray-100 px-4 py-3">
            <button
              @click="notificationOpen = false"
              class="w-full rounded-xl bg-brand-indigo px-4 py-2 text-sm font-semibold text-white hover:bg-brand-indigo/90"
            >
              View all notifications
            </button>
          </div>
        </div>
      </div>
      <button
        class="h-10 w-10 rounded-full overflow-hidden border border-slate-200 hover:ring-2 hover:ring-brand-gold hover:ring-offset-1 transition-all ml-2"
      >
        <img
          src="https://i.pravatar.cc/150?u=current_user"
          alt="Profile"
          class="h-full w-full object-cover"
        />
      </button>
    </div>
  </div>
</template>
