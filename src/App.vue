<script setup lang="ts">
import { RouterView } from 'vue-router'
import CreatePostModal from '@/components/feed/CreatePostModal.vue'
import BottomNavigation from '@/components/feed/BottomNavigation.vue'
</script>

<template>
  <div class="min-h-screen bg-brand-offwhite text-brand-slate font-sans">
    <main class="pb-20">
      <RouterView />
    </main>
    <CreatePostModal />
    <BottomNavigation />
  </div>
</template>

<style scoped></style>
