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
  <div class="min-h-screen bg-brand-offwhite flex flex-col">
    <!-- Desktop Header -->
    <DesktopHeader />

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex justify-center lg:mt-[64px] bg-brand-offwhite">
      <!-- Desktop Left Sidebar -->
      <DesktopSidebarLeft />

      <!-- Center column -->
      <div
        class="w-full lg:max-w-[720px] bg-white min-h-screen shadow-xs relative pb-16 lg:pb-8 lg:mt-4 lg:rounded-xl lg:overflow-hidden lg:mb-8 p-4 sm:p-5 lg:p-6 flex flex-col"
      >
        <div class="flex items-center justify-between gap-3 pb-4">
        <div>
          <p class="text-sm uppercase tracking-[0.32em] text-brand-gold">Notifications</p>
          <h1 class="mt-2 text-3xl font-extrabold text-brand-indigo">Alerts & updates</h1>
        </div>
        <button
          @click="backToFeed"
          class="inline-flex items-center gap-2 rounded-xl border border-transparent bg-brand-indigo/5 px-4 py-2 text-sm font-semibold text-brand-indigo shadow-xs hover:bg-brand-indigo/10 transition"
        >
          Back
        </button>
      </div>

      <div class="space-y-3">
        <div v-for="notification in notifications" :key="notification.id" class="rounded-xl border p-4 shadow-xs transition hover:border-brand-gold/40"
          :class="notification.unread ? 'bg-white border-brand-gold/30' : 'bg-brand-indigo/5 border-transparent text-brand-slate'"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <h2 class="text-base font-bold text-brand-indigo">{{ notification.title }}</h2>
              <p class="mt-2 text-sm leading-6 text-brand-slate">{{ notification.description }}</p>
            </div>
            <span class="text-xs font-semibold uppercase tracking-[0.24em] text-brand-slate/60">{{ notification.time }}</span>
          </div>
          <div class="mt-4 flex items-center justify-between gap-3">
            <span
              v-if="notification.unread"
              class="inline-flex rounded-xl bg-brand-gold px-3 py-1 text-xs font-semibold text-white"
            >
              New
            </span>
            <button
              v-if="notification.unread"
              @click="markAsRead(notification.id)"
              class="rounded-xl border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-brand-indigo hover:bg-brand-indigo/5 transition-colors"
            >
              Mark as read
            </button>
          </div>
        </div>
      </div>

      <div class="mt-6 rounded-xl bg-white p-5 shadow-xs border border-slate-200">
        <div class="flex items-center justify-between text-sm text-brand-slate">
          <span>Unread alerts</span>
          <strong class="text-brand-indigo">{{ notifications.filter((n) => n.unread).length }}</strong>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
