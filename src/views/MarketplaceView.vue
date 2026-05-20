<script setup lang="ts">
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader.vue'
import MarketplaceCategories from '@/components/marketplace/MarketplaceCategories.vue'
import MarketplaceFilters from '@/components/marketplace/MarketplaceFilters.vue'
import MarketplaceCard from '@/components/marketplace/MarketplaceCard.vue'

import DesktopHeader from '@/components/feed/DesktopHeader.vue'
import DesktopSidebarLeft from '@/components/feed/DesktopSidebarLeft.vue'
import DesktopSidebarRight from '@/components/feed/DesktopSidebarRight.vue'

import { computed } from 'vue'
import { marketplaceCategories, marketplaceProviders } from '@/assets/marketplaceData'
import { useSearch } from '@/composables/useSearch'

const { globalSearchQuery } = useSearch()

const filteredProviders = computed(() => {
  if (!globalSearchQuery.value) return marketplaceProviders
  const q = globalSearchQuery.value.toLowerCase()
  return marketplaceProviders.filter(
    (provider) =>
      provider.providerName.toLowerCase().includes(q) || 
      provider.serviceTitle.toLowerCase().includes(q)
  )
})
</script>

<template>
  <div class="min-h-screen bg-[#1F2937] flex flex-col">
    <!-- Desktop Header (fixed top) -->
    <DesktopHeader />

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex justify-center lg:mt-[64px] bg-gray-100 lg:bg-gray-100">
      <!-- Desktop Left Sidebar -->
      <DesktopSidebarLeft />

      <!-- Center Marketplace Column -->
      <div
        class="w-full lg:max-w-[680px] bg-white min-h-screen shadow-sm relative pb-16 lg:pb-8 lg:mt-4 lg:rounded-xl lg:overflow-hidden lg:mb-8"
      >
        <MarketplaceHeader />

        <div class="border-b border-gray-100 mb-1">
          <MarketplaceCategories :categories="marketplaceCategories" />
          <MarketplaceFilters />
        </div>

        <div class="bg-gray-50 pb-8 min-h-[500px]">
          <MarketplaceCard
            v-for="provider in filteredProviders"
            :key="provider.id"
            :provider="provider"
          />
        </div>
      </div>

      <!-- Desktop Right Sidebar -->
      <DesktopSidebarRight />
    </div>
  </div>
</template>
