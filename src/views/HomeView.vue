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

import { computed } from 'vue'
import { categories, services, posts } from '@/assets/mockData'
import { useSearch } from '@/composables/useSearch'

const { globalSearchQuery } = useSearch()

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
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Desktop Header (fixed top) -->
    <DesktopHeader />

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex justify-center lg:mt-[64px]">
      <!-- Desktop Left Sidebar -->
      <DesktopSidebarLeft />

      <!-- Center Feed Column -->
      <div
        class="w-full lg:max-w-[680px] bg-white min-h-screen shadow-sm relative pb-16 lg:pb-8 lg:mt-4 lg:rounded-xl lg:overflow-hidden lg:mb-8"
      >
        <!-- Mobile/Tablet Header Elements -->
        <div class="sticky top-0 z-40 bg-white lg:hidden">
          <FeedHeader :categories="categories" />
        </div>

        <!-- Desktop Search Bar (optional, can stay inside feed or top nav) -->
        <div class="hidden lg:block sticky top-16 z-30 bg-white pt-2 border-b border-gray-100">
          <FeedSearchBar :categories="categories" />
        </div>

        <!-- Feed Content Scrollable Area -->
        <div>
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

      </div>

      <!-- Desktop Right Sidebar -->
      <DesktopSidebarRight />
    </div>
  </div>
</template>
