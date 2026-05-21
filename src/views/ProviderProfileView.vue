<script setup lang="ts">
import { providerProfileData } from '@/assets/providerData'

import DesktopSidebarLeft from '@/components/feed/DesktopSidebarLeft.vue'
import ProviderTopNav from '@/components/provider/ProviderTopNav.vue'
import ProviderHero from '@/components/provider/ProviderHero.vue'
import ProviderStatsCard from '@/components/provider/ProviderStatsCard.vue'
import ProviderPricingCard from '@/components/provider/ProviderPricingCard.vue'
import ProviderStoryCard from '@/components/provider/ProviderStoryCard.vue'
import ProviderProjectsCard from '@/components/provider/ProviderProjectsCard.vue'
import ProviderReviewsCard from '@/components/provider/ProviderReviewsCard.vue'
import ProviderActions from '@/components/provider/ProviderActions.vue'

// In a real app we'd fetch the provider by route.params.id
// const providerId = route.params.id
const provider = providerProfileData
</script>

<template>
  <div class="min-h-screen bg-brand-offwhite flex flex-col">
    <!-- Main Content Wrapper (Left Sidebar + Center Wide Column) -->
    <div class="flex-1 flex justify-center lg:mt-4 bg-brand-offwhite">
      <!-- Desktop Left Sidebar -->
      <DesktopSidebarLeft />

      <!-- Center Profile Content -->
      <div
        class="w-full lg:max-w-4xl bg-white min-h-screen shadow-sm relative lg:rounded-xl lg:overflow-hidden lg:mb-8 pb-16 lg:pb-0 flex flex-col"
      >
        <ProviderTopNav />

        <!-- Scrollable Profile Area -->
        <div class="flex-1 overflow-y-auto">
          <ProviderHero
            :coverImage="provider.coverImage"
            :name="provider.name"
            :title="provider.title"
            :experience="provider.experience"
            :isElite="provider.isElite"
          />

          <!-- Main Layout Grid -->
          <div class="p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative -mt-16 z-10">
            <!-- Left Column (Stats & Pricing) -->
            <div class="lg:col-span-5 space-y-6">
              <ProviderStatsCard
                :trustScore="provider.trustScore"
                :rating="provider.rating"
                :verifications="provider.verifications"
                :trustedFamiliesCount="provider.trustedFamiliesCount"
                :location="provider.location"
              />
              <ProviderPricingCard
                :services="provider.services"
                :availability="provider.availability"
                :equipment="provider.equipment"
              />
            </div>

            <!-- Right Column (Story, Projects, Reviews) -->
            <div class="lg:col-span-7 space-y-6">
              <ProviderStoryCard :story="provider.personalStory" :features="provider.features" />
              <ProviderProjectsCard :projects="provider.recentProjects" />
              <ProviderReviewsCard
                :networkTrustCount="provider.networkTrustCount"
                :totalReviews="provider.reviewsCount"
                :reviews="provider.reviews"
              />
            </div>
          </div>
        </div>

        <!-- Sticky Bottom Actions -->
        <ProviderActions />
      </div>
    </div>
  </div>
</template>
