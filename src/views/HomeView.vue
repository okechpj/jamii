<script setup lang="ts">
import FeedHeader from '@/components/feed/FeedHeader.vue'
import FeedSearchBar from '@/components/feed/FeedSearchBar.vue'
import ServiceCarousel from '@/components/feed/ServiceCarousel.vue'
import CreatePostInput from '@/components/feed/CreatePostInput.vue'
import FeedPost from '@/components/feed/FeedPost.vue'
import FeedCTA from '@/components/feed/FeedCTA.vue'

// Desktop specific components
import DesktopHeader from '@/components/feed/DesktopHeader.vue'
import DesktopSidebarLeft from '@/components/feed/DesktopSidebarLeft.vue'
import DesktopSidebarRight from '@/components/feed/DesktopSidebarRight.vue'

import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { categories, services, posts } from '@/assets/mockData'
import { useSearch } from '@/composables/useSearch'
import { useTheme } from '@/composables/useTheme'

const { globalSearchQuery } = useSearch()
const { isDark, toggleTheme } = useTheme()

const route = useRoute()
const activeSubTab = ref((route.query.tab as string) || 'shout-outs')

watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab) {
      activeSubTab.value = newTab as string
    }
  }
)
const pushNotificationsEnabled = ref(true)

const priceChecks = [
  { category: 'Materials', name: 'Cement (Mombasa Blue - 50kg)', location: 'Gikomba Market', priceRange: 'KES 760 - KES 810', validationCount: 34 },
  { category: 'Materials', name: 'River Sand (per Tonne)', location: 'Nairobi West', priceRange: 'KES 2,400 - KES 2,800', validationCount: 19 },
  { category: 'Timber', name: 'Cypress Timber (1x12x18ft)', location: 'Industrial Area', priceRange: 'KES 1,150 - KES 1,300', validationCount: 22 },
  { category: 'Metals', name: 'Rebar Y12 (per piece)', location: 'Ruiru Bypass', priceRange: 'KES 1,450 - KES 1,600', validationCount: 45 },
]

const chamaTips = [
  { tag: 'Investment', title: '5 Golden Rules of a Productive Investment Chama', excerpt: 'Chamas that succeed establish clear objectives and separate personal loans from group asset growth plans. Never dilute equity without unanimous board signatures...', reads: '2.4k' },
  { tag: 'Finance', title: 'Managing Interest Rates on Short-Term Member Loans', excerpt: 'Setting chama loan rates too low can reduce pool value, while setting them too high strains members. A benchmark of 5% flat rate is recommended for short-term aids...', reads: '1.8k' },
  { tag: 'Legal', title: 'Drafting Your Chama Constitution: Essential Clauses', excerpt: 'Avoid conflict by legalizing your group early. Ensure registration with the Department of Social Development and clearly draft emergency withdrawal options...', reads: '950' },
]

const filteredPosts = computed(() => {
  if (!globalSearchQuery.value) return posts
  const q = globalSearchQuery.value.toLowerCase()
  return posts.filter(
    (post) =>
      post.userName.toLowerCase().includes(q) || post.caption.toLowerCase().includes(q)
  )
})

const filteredServices = computed(() => {
  if (!globalSearchQuery.value) return services
  const q = globalSearchQuery.value.toLowerCase()
  return services.filter(
    (service) =>
      service.title.toLowerCase().includes(q) || service.providerName.toLowerCase().includes(q)
  )
})

// Pick a random index between 2 and 8 to inject the service carousel
const randomServiceIndex = Math.floor(Math.random() * 7) + 2
</script>

<template>
  <div class="min-h-screen bg-brand-offwhite flex flex-col">
    <!-- Desktop Header (fixed top) -->
    <DesktopHeader />

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex justify-center lg:mt-[64px] bg-brand-offwhite">
      <!-- Desktop Left Sidebar -->
      <DesktopSidebarLeft />

      <!-- Center Feed Column -->
      <div
        class="w-full lg:max-w-[680px] bg-white min-h-screen shadow-sm relative pb-16 lg:pb-8 lg:mt-4 lg:rounded-xl lg:overflow-hidden lg:mb-8"
      >
        <!-- Mobile/Tablet Header Elements -->
        <div class="sticky top-0 z-40 bg-white lg:hidden">
          <FeedHeader :active-sub-tab="activeSubTab" @tab-change="(tabId) => activeSubTab = tabId" />
        </div>

        <!-- Desktop Search Bar (optional, can stay inside feed or top nav) -->
        <div class="hidden lg:block sticky top-16 z-30 bg-white pt-2 border-b border-gray-100">
          <FeedSearchBar :categories="categories" />
        </div>

        <!-- Feed Content Scrollable Area -->
        <div v-if="activeSubTab === 'shout-outs'">
          <ServiceCarousel :services="filteredServices" />

          <CreatePostInput />

          <!-- Render posts and inject CTA blocks -->
          <template v-for="(post, index) in filteredPosts" :key="post.id">
            <FeedPost :post="post" />

            <!-- Randomly injected Service Carousel -->
            <div v-if="index === randomServiceIndex" class="my-4 border-y border-gray-100">
              <ServiceCarousel :services="filteredServices" />
            </div>

            <!-- Mobile CTA injection -->
            <div v-if="index === 1 || index === 5" class="lg:hidden">
              <FeedCTA />
            </div>
          </template>

          <!-- End of feed indicator -->
          <div class="py-8 text-center text-gray-400 text-sm">
            You've caught up! Check back later for more.
          </div>
        </div>

        <!-- Price Checks Content -->
        <div v-else-if="activeSubTab === 'price-checks'" class="p-4 space-y-4">
          <div class="bg-brand-indigo/5 border border-brand-indigo/10 p-4 rounded-xl mb-4">
            <h2 class="text-sm font-bold text-brand-indigo mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brand-gold mr-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Presha Check: Nairobi Market Spreads
            </h2>
            <p class="text-xs text-brand-slate">Real-time local crowd-validated market rates. Avoid overpaying.</p>
          </div>

          <div class="grid gap-3">
            <div v-for="item in priceChecks" :key="item.name" class="bg-white border border-slate-200 p-4 rounded-xl shadow-xs flex items-center justify-between hover:border-brand-gold transition duration-200">
              <div>
                <span class="text-[10px] font-bold text-brand-gold uppercase tracking-wider">{{ item.category }}</span>
                <h3 class="text-sm font-bold text-brand-indigo mt-0.5">{{ item.name }}</h3>
                <p class="text-xs text-brand-slate mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-brand-slate" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  {{ item.location }}
                </p>
              </div>
              <div class="text-right">
                <span class="text-xs font-semibold text-brand-slate">Standard Range</span>
                <p class="text-sm font-bold text-brand-indigo mt-0.5">{{ item.priceRange }}</p>
                <span class="inline-flex items-center rounded-md bg-brand-gold/10 px-2 py-0.5 text-[10px] font-bold text-brand-gold mt-1.5 border border-brand-gold/20">
                  {{ item.validationCount }} validations
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Chama Wisdom Content -->
        <div v-else-if="activeSubTab === 'chama-wisdom'" class="p-4 space-y-4">
          <div class="bg-brand-indigo/5 border border-brand-indigo/10 p-4 rounded-xl mb-4">
            <h2 class="text-sm font-bold text-brand-indigo mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brand-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Chama Rules & Community Finance Tips
            </h2>
            <p class="text-xs text-brand-slate">Learn group finance management from trusted community members.</p>
          </div>

          <div class="grid gap-3">
            <div v-for="tip in chamaTips" :key="tip.title" class="bg-white border border-slate-200 p-4 rounded-xl shadow-xs hover:border-brand-gold transition duration-200">
              <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] font-bold text-brand-gold uppercase tracking-wider">{{ tip.tag }}</span>
                <span class="text-xs text-brand-slate">{{ tip.reads }} reads</span>
              </div>
              <h3 class="text-sm font-bold text-brand-indigo">{{ tip.title }}</h3>
              <p class="text-xs text-brand-slate mt-2 leading-relaxed">{{ tip.excerpt }}</p>
              <button class="mt-3 text-xs font-bold text-brand-indigo hover:text-brand-gold flex items-center transition">
                Read full tip
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Profile Content -->
        <div v-else-if="activeSubTab === 'profile'" class="p-4 space-y-5">
          <div class="flex items-center gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
            <img
              src="https://i.pravatar.cc/150?u=current_user"
              alt="Profile Avatar"
              class="h-16 w-16 rounded-full border border-slate-200 object-cover shadow-sm"
            />
            <div>
              <h2 class="text-sm font-bold text-brand-indigo">Peter Okech</h2>
              <p class="text-xs text-brand-slate">Nairobi, Kenya</p>
              <span class="inline-flex items-center rounded-md bg-brand-gold/10 px-2 py-0.5 text-[10px] font-bold text-brand-gold mt-1 border border-brand-gold/20">
                Pro Creator
              </span>
            </div>
          </div>

          <div class="bg-white border border-slate-200 rounded-xl shadow-xs p-4 space-y-4">
            <h3 class="text-xs font-bold text-brand-indigo uppercase tracking-wider border-b border-slate-100 pb-2">Preferences</h3>

            <div class="flex items-center justify-between py-1">
              <div>
                <p class="text-xs font-bold text-brand-indigo">Dark Theme</p>
                <p class="text-[10px] text-brand-slate">Toggle dark styling across the app</p>
              </div>
              <button
                @click="toggleTheme"
                class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden"
                :class="isDark ? 'bg-brand-gold' : 'bg-slate-200'"
              >
                <span
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out"
                  :class="isDark ? 'translate-x-5' : 'translate-x-0'"
                />
              </button>
            </div>

            <div class="flex items-center justify-between py-1 border-t border-slate-100 pt-3">
              <div>
                <p class="text-xs font-bold text-brand-indigo">Push Notifications</p>
                <p class="text-[10px] text-brand-slate">Receive immediate job vouch alerts</p>
              </div>
              <button
                @click="pushNotificationsEnabled = !pushNotificationsEnabled"
                class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden"
                :class="pushNotificationsEnabled ? 'bg-brand-gold' : 'bg-slate-200'"
              >
                <span
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out"
                  :class="pushNotificationsEnabled ? 'translate-x-5' : 'translate-x-0'"
                />
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- Desktop Right Sidebar -->
      <DesktopSidebarRight />
    </div>
  </div>
</template>
