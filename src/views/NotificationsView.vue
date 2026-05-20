<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DesktopHeader from '@/components/feed/DesktopHeader.vue'
import DesktopSidebarLeft from '@/components/feed/DesktopSidebarLeft.vue'

const router = useRouter()
const notifications = ref([
  {
    id: 1,
    title: 'Booking confirmed',
    description: 'Your appointment with Amina is set for tomorrow at 3 PM.',
    time: '2m ago',
    unread: true,
  },
  {
    id: 2,
    title: 'New message from David',
    description: 'David just replied to your service request.',
    time: '34m ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Payment received',
    description: 'We have received your payment for the carpentry job.',
    time: '1h ago',
    unread: false,
  },
])

function markAsRead(id: number) {
  const notification = notifications.value.find((item) => item.id === id)
  if (notification) notification.unread = false
}

function backToFeed() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Desktop Header -->
    <DesktopHeader />

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex justify-center lg:mt-[64px] bg-gray-100">
      <!-- Desktop Left Sidebar -->
      <DesktopSidebarLeft />

      <!-- Center column -->
      <div
        class="w-full lg:max-w-[720px] bg-white min-h-screen shadow-sm relative pb-16 lg:pb-8 lg:mt-4 lg:rounded-xl lg:overflow-hidden lg:mb-8 p-4 sm:p-5 lg:p-6 flex flex-col"
      >
        <div class="flex items-center justify-between gap-3 pb-4">
        <div>
          <p class="text-sm uppercase tracking-[0.32em] text-teal-700">Notifications</p>
          <h1 class="mt-2 text-3xl font-semibold">Alerts & updates</h1>
        </div>
        <button
          @click="backToFeed"
          class="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          Back
        </button>
      </div>

      <div class="space-y-3">
        <div v-for="notification in notifications" :key="notification.id" class="rounded-3xl border p-4 shadow-sm transition hover:border-teal-300"
          :class="notification.unread ? 'bg-white border-teal-200' : 'bg-slate-100 border-transparent text-slate-600'"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <h2 class="text-base font-semibold text-slate-900">{{ notification.title }}</h2>
              <p class="mt-2 text-sm leading-6 text-slate-600">{{ notification.description }}</p>
            </div>
            <span class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{{ notification.time }}</span>
          </div>
          <div class="mt-4 flex items-center justify-between gap-3">
            <span
              v-if="notification.unread"
              class="inline-flex rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white"
            >
              New
            </span>
            <button
              v-if="notification.unread"
              @click="markAsRead(notification.id)"
              class="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Mark as read
            </button>
          </div>
        </div>
      </div>

      <div class="mt-6 rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
        <div class="flex items-center justify-between text-sm text-slate-500">
          <span>Unread alerts</span>
          <strong class="text-slate-900">{{ notifications.filter((n) => n.unread).length }}</strong>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
