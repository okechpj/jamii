<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import DesktopHeader from '@/components/feed/DesktopHeader.vue'
import DesktopSidebarLeft from '@/components/feed/DesktopSidebarLeft.vue'

const router = useRouter()

// Mock data for friend requests and friends
const requests = ref([
  { id: 101, name: 'Amina K.', avatar: 'https://i.pravatar.cc/150?u=amina', mutual: 3, message: 'We worked together on a tailoring job.' },
  { id: 102, name: 'David O.', avatar: 'https://i.pravatar.cc/150?u=david', mutual: 1, message: 'Knows you from Kivuli Carpentry.' },
  { id: 103, name: 'Zahra N.', avatar: 'https://i.pravatar.cc/150?u=zahra', mutual: 0, message: 'Says hi! Wants to connect.' },
])

const friends = ref([
  { id: 2, name: 'Sarah M.', avatar: 'https://i.pravatar.cc/150?u=sarah', lastActive: '2h' },
  { id: 3, name: 'Sam T.', avatar: 'https://i.pravatar.cc/150?u=sam', lastActive: '1d' },
  { id: 4, name: 'Amina K.', avatar: 'https://i.pravatar.cc/150?u=amina', lastActive: '3d' },
  { id: 5, name: 'Peter N.', avatar: 'https://i.pravatar.cc/150?u=peter', lastActive: '4h' },
])

const search = ref('')
const filteredFriends = computed(() => {
  if (!search.value) return friends.value
  return friends.value.filter((f) => f.name.toLowerCase().includes(search.value.toLowerCase()))
})

function acceptRequest(id: number) {
  const idx = requests.value.findIndex((r) => r.id === id)
  if (idx > -1) {
    const r = requests.value.splice(idx, 1)[0]
    if (!r) return
    friends.value.unshift({ id: r.id, name: r.name, avatar: r.avatar, lastActive: 'just now' })
  }
}

function declineRequest(id: number) {
  const idx = requests.value.findIndex((r) => r.id === id)
  if (idx > -1) requests.value.splice(idx, 1)
}

function viewProfile(id: number) {
  router.push(`/provider/${id}`)
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
        class="w-full lg:max-w-[900px] bg-white min-h-screen shadow-sm relative pb-16 lg:pb-8 lg:mt-4 lg:rounded-xl lg:overflow-hidden lg:mb-8 p-4 sm:p-5 lg:p-6 flex flex-col"
      >
        <!-- Header / Cover -->
        <div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          <div class="relative h-auto min-h-72 bg-linear-to-r from-sky-600 via-teal-600 to-amber-500 p-6 flex flex-col justify-between gap-6">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="-mt-10 h-20 w-20 rounded-full ring-4 ring-white overflow-hidden bg-gray-200 shadow-2xl shrink-0">
                  <img src="https://i.pravatar.cc/150?u=chidi" alt="You" class="w-full h-full object-cover" />
                </div>
                <div class="text-white">
                  <h1 class="text-3xl font-bold tracking-tight">Chidi</h1>
                <p class="text-sm opacity-90 max-w-md">Your trusted network and community connections in one place.</p>
              </div>
            </div>
            <button class="w-full sm:w-auto bg-white/20 text-white px-4 py-3 rounded-full border border-white/30 text-sm font-semibold hover:bg-white/30 transition">
              Find Friends
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="rounded-2xl bg-white/95 p-4 shadow-sm border border-white/80">
              <p class="text-3xl font-bold text-slate-900">{{ requests.length }}</p>
              <p class="text-xs uppercase tracking-[0.22em] text-slate-500 mt-1">Pending Requests</p>
            </div>
            <div class="rounded-2xl bg-white/95 p-4 shadow-sm border border-white/80">
              <p class="text-3xl font-bold text-slate-900">{{ friends.length }}</p>
              <p class="text-xs uppercase tracking-[0.22em] text-slate-500 mt-1">Active Friends</p>
            </div>
            <div class="rounded-2xl bg-white/95 p-4 shadow-sm border border-white/80">
              <p class="text-3xl font-bold text-slate-900">12</p>
              <p class="text-xs uppercase tracking-[0.22em] text-slate-500 mt-1">Introductions</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main column -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow border border-gray-100 overflow-hidden p-4">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold">Friend Requests</h2>
              <div class="text-sm text-slate-500">{{ requests.length }} pending</div>
            </div>

            <div v-if="requests.length === 0" class="p-6 text-center text-sm text-slate-500">No pending requests</div>

            <ul class="space-y-4">
              <li v-for="req in requests" :key="req.id" class="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm hover:border-teal-200 transition">
                <div class="h-14 w-14 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  <img :src="req.avatar" :alt="req.name" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium text-gray-900">{{ req.name }}</div>
                      <div class="text-xs text-gray-500">{{ req.mutual }} mutual friends</div>
                    </div>
                    <div class="text-xs text-gray-400">2d</div>
                  </div>
                  <p class="mt-2 text-sm text-gray-600">{{ req.message }}</p>

                  <div class="mt-3 flex items-center space-x-2">
                    <button @click="acceptRequest(req.id)" class="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md text-sm font-semibold">Confirm</button>
                    <button @click="declineRequest(req.id)" class="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm">Delete</button>
                    <button @click="viewProfile(req.id)" class="text-sm text-teal-700 underline">View Profile</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- Friends list -->
          <div class="bg-white rounded-3xl shadow border border-gray-100 overflow-hidden p-4 mt-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h2 class="text-xl font-semibold">Your Friends</h2>
                <p class="text-sm text-slate-500">Stay connected with people you trust.</p>
              </div>
              <div class="flex items-center gap-3 w-full sm:w-auto">
                <div class="relative flex-1">
                  <span class="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M9.5 17a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
                    </svg>
                  </span>
                  <input v-model="search" placeholder="Search friends" class="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-200" />
                </div>
                <div class="text-sm text-slate-500">{{ filteredFriends.length }} friends</div>
              </div>
            </div>

            <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <li v-for="f in filteredFriends" :key="f.id" class="group bg-slate-50 p-4 rounded-3xl border border-transparent hover:border-teal-100 hover:bg-white shadow-sm hover:shadow-md transition cursor-pointer" @click="viewProfile(f.id)">
                <div class="flex items-center gap-3">
                  <div class="h-14 w-14 rounded-full overflow-hidden bg-gray-200 shadow-inner ring-1 ring-slate-200">
                    <img :src="f.avatar" :alt="f.name" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div class="font-semibold text-slate-900">{{ f.name }}</div>
                    <div class="text-xs text-slate-500">Active {{ f.lastActive }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right column / Suggestions -->
        <aside class="lg:block">
          <div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-4 sticky top-28">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-lg font-semibold">People You May Know</h3>
                <p class="text-sm text-slate-500">Build your network with trusted connections.</p>
              </div>
              <button class="text-sm text-teal-700 font-semibold hover:text-teal-900">See all</button>
            </div>
            <ul class="space-y-3">
              <li class="flex items-center justify-between gap-3 p-3 rounded-3xl border border-slate-200 hover:border-teal-200 transition bg-slate-50">
                <div class="flex items-center gap-3">
                  <div class="h-12 w-12 rounded-full overflow-hidden bg-gray-200 ring-1 ring-slate-200">
                    <img src="https://i.pravatar.cc/150?u=suggestion1" alt="sugg" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div class="font-medium text-slate-900">Brian T.</div>
                    <div class="text-xs text-slate-500">3 mutual friends</div>
                  </div>
                </div>
                <button class="px-3 py-1.5 bg-teal-600 text-white rounded-full text-sm hover:bg-teal-700">Add</button>
              </li>
              <li class="flex items-center justify-between gap-3 p-3 rounded-3xl border border-slate-200 hover:border-teal-200 transition bg-slate-50">
                <div class="flex items-center gap-3">
                  <div class="h-12 w-12 rounded-full overflow-hidden bg-gray-200 ring-1 ring-slate-200">
                    <img src="https://i.pravatar.cc/150?u=suggestion2" alt="sugg" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div class="font-medium text-slate-900">Grace W.</div>
                    <div class="text-xs text-slate-500">1 mutual friend</div>
                  </div>
                </div>
                <button class="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm text-slate-700 hover:bg-slate-50">Add</button>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Minimal tweaks to modernize appearance */
</style>
