<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import DesktopHeader from '@/components/feed/DesktopHeader.vue'
import DesktopSidebarLeft from '@/components/feed/DesktopSidebarLeft.vue'
const router = useRouter()
const search = ref('')
const selectedConversationId = ref<number>(1)
const newMessage = ref('')

const conversations = ref([
  {
    id: 1,
    name: 'Amina K.',
    avatar: 'https://i.pravatar.cc/150?u=amina',
    status: 'Online',
    statusDot: 'bg-brand-gold',
    unread: 2,
    latestMessage: 'I’ll send the quote by 3pm.',
    time: '1:12 PM',
    messages: [
      { id: 1, fromMe: false, text: 'Hi Jane, are you available tomorrow for the fitting?', time: '1:02 PM' },
      { id: 2, fromMe: true, text: 'Yes, I’m free after 4pm.', time: '1:05 PM' },
      { id: 3, fromMe: false, text: 'Great, I’ll meet you at the site.', time: '1:12 PM' },
    ],
  },
  {
    id: 2,
    name: 'David O.',
    avatar: 'https://i.pravatar.cc/150?u=david',
    status: 'Active 2h ago',
    statusDot: 'bg-gray-400',
    unread: 0,
    latestMessage: 'Perfect, I can start next week.',
    time: 'Yesterday',
    messages: [
      { id: 1, fromMe: true, text: 'Can we start the carpentry work Monday?', time: 'Yesterday' },
      { id: 2, fromMe: false, text: 'Perfect, I can start next week.', time: 'Yesterday' },
    ],
  },
  {
    id: 3,
    name: 'Zahra N.',
    avatar: 'https://i.pravatar.cc/150?u=zahra',
    status: 'Online',
    statusDot: 'bg-brand-gold',
    unread: 4,
    latestMessage: 'Thank you! I appreciate the quick response.',
    time: '12:08 AM',
    messages: [
      { id: 1, fromMe: false, text: 'Your invoice is ready.', time: '12:02 AM' },
      { id: 2, fromMe: true, text: 'Thanks, I’ll pay today.', time: '12:08 AM' },
    ],
  },
])

const filteredConversations = computed(() => {
  if (!search.value) return conversations.value
  const q = search.value.toLowerCase()
  return conversations.value.filter(
    (conv) =>
      conv.name.toLowerCase().includes(q) || conv.latestMessage.toLowerCase().includes(q)
  )
})

const selectedConversation = computed(() => {
  return conversations.value.find((conv) => conv.id === selectedConversationId.value)
})

function selectConversation(id: number) {
  selectedConversationId.value = id
}

function sendMessage() {
  if (!newMessage.value.trim() || !selectedConversation.value) return
  selectedConversation.value.messages.push({
    id: Date.now(),
    fromMe: true,
    text: newMessage.value.trim(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  })
  selectedConversation.value.latestMessage = newMessage.value.trim()
  selectedConversation.value.time = 'Now'
  newMessage.value = ''
}

function attachPlaceholder() {
  // Placeholder action for attachments
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

      <!-- Center column (chat) -->
      <div
        class="w-full lg:max-w-[880px] bg-white min-h-screen shadow-xs relative pb-16 lg:pb-8 lg:mt-4 lg:rounded-xl lg:overflow-hidden lg:mb-8 flex flex-col p-4 sm:p-5 lg:p-6"
      >
        <!-- Mobile/Tablet Header Elements -->
        <div class="mb-5 flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <button
            @click="router.back()"
            class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-brand-indigo/5 text-brand-indigo hover:bg-brand-indigo/10 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div class="text-center">
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">Direct Messages</p>
            <h1 class="text-2xl font-black tracking-tight text-brand-indigo">Messages</h1>
          </div>

          <button
            class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-brand-indigo/5 text-brand-indigo hover:bg-brand-indigo/10 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>

        <div class="flex-1 flex flex-col gap-6 lg:flex-row overflow-hidden">
          <!-- Chat list side pane -->
          <aside class="w-full lg:w-80 flex flex-col">
            <div class="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 class="text-lg font-bold text-brand-indigo">Inbox</h2>
                <p class="text-xs text-brand-slate">Recent conversations</p>
              </div>
              <span class="rounded-xl bg-brand-gold/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                {{ filteredConversations.length }} chats
              </span>
            </div>

            <!-- Search box -->
            <div class="mb-4 rounded-xl border border-slate-100 bg-brand-indigo/5 p-2">
              <div class="relative w-full">
                <svg class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  v-model="search"
                  type="search"
                  placeholder="Search messages"
                  class="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-brand-indigo placeholder:text-brand-slate/60 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                />
              </div>
            </div>

            <!-- Scrollable list of threads -->
            <div class="space-y-2 overflow-y-auto flex-1 max-h-[320px] lg:max-h-none pr-1">
              <button
                v-for="conv in filteredConversations"
                :key="conv.id"
                @click="selectConversation(conv.id)"
                class="w-full rounded-xl border border-slate-100 bg-brand-indigo/5 p-3 text-left transition hover:border-brand-gold/30 hover:bg-brand-gold/5"
                :class="selectedConversationId === conv.id ? 'border-brand-gold/40 bg-brand-gold/10 ring-1 ring-brand-gold/30' : ''"
              >
                <div class="flex items-start gap-3">
                  <div class="relative h-12 w-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 ring-1 ring-slate-100">
                    <img :src="conv.avatar" :alt="conv.name" class="h-full w-full object-cover" />
                    <span :class="`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-white ${conv.statusDot}`"></span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <p class="truncate text-sm font-bold text-brand-indigo">{{ conv.name }}</p>
                      <span class="text-[10px] text-brand-slate">{{ conv.time }}</span>
                    </div>
                    <p class="mt-1 truncate text-xs text-brand-slate font-medium">{{ conv.latestMessage }}</p>
                    <div class="mt-2 flex items-center justify-between text-[10px] text-brand-slate">
                      <span>{{ conv.status }}</span>
                      <span v-if="conv.unread" class="rounded-xl bg-brand-gold px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {{ conv.unread }}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </aside>

          <!-- Chat conversation box -->
          <main class="flex-1 flex flex-col border border-slate-100 rounded-2xl bg-white p-3 min-h-[400px] lg:min-h-0">
            <!-- Selected thread profile header -->
            <div class="mb-4 flex items-center justify-between gap-4 rounded-xl bg-brand-indigo/5 p-3 border border-slate-100">
              <div class="flex items-center gap-3">
                <div class="h-12 w-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 ring-1 ring-slate-100">
                  <img
                    :src="selectedConversation?.avatar || 'https://i.pravatar.cc/150?u=placeholder'"
                    :alt="selectedConversation?.name || 'No chat selected'"
                    class="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h2 class="text-sm font-bold text-brand-indigo">
                    {{ selectedConversation?.name || 'Tap a chat' }}
                  </h2>
                  <p class="text-xs text-brand-slate">
                    {{ selectedConversation?.status || 'Select a conversation to begin' }}
                  </p>
                </div>
              </div>
              <button class="rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold text-brand-indigo transition hover:bg-brand-indigo/5">
                Details
              </button>
            </div>

            <!-- Message scroll list -->
            <div class="flex-1 overflow-y-auto px-2 pb-4 space-y-4">
              <div v-if="!selectedConversation" class="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-brand-indigo/5 p-6 text-center text-xs text-brand-slate">
                Select a conversation from the inbox to open the chat.
              </div>

              <div v-else class="space-y-4">
                <template v-for="message in selectedConversation.messages" :key="message.id">
                  <div :class="message.fromMe ? 'flex justify-end' : 'flex justify-start'">
                    <div
                      :class="[
                        'max-w-[80%] rounded-xl px-4 py-2.5 text-sm shadow-xs',
                        message.fromMe
                          ? 'bg-brand-gold text-white rounded-br-none'
                          : 'bg-brand-indigo/5 text-brand-indigo border border-slate-200 rounded-bl-none',
                      ]"
                    >
                      <p class="leading-relaxed">{{ message.text }}</p>
                      <div class="mt-1.5 text-right text-[9px] opacity-70 font-semibold">{{ message.time }}</div>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <!-- Footer actions / message input -->
            <div class="mt-3 border-t border-slate-100 pt-3">
              <div class="flex items-center gap-2">
                <button
                  @click="attachPlaceholder"
                  class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-brand-indigo/5 text-brand-indigo transition hover:bg-brand-indigo/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15.172 7l-6.414 6.414a2 2 0 102.828 2.828L18 9.828a4 4 0 10-5.657-5.657L5.636 11.98a6 6 0 108.485 8.485L19.5 15.085" />
                  </svg>
                </button>
                <input
                  v-model="newMessage"
                  type="text"
                  :placeholder="'Message ' + (selectedConversation?.name?.split(' ')[0] || 'someone')"
                  class="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-brand-indigo placeholder:text-brand-slate focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                />
                <button
                  @click="sendMessage"
                  class="inline-flex h-10 items-center justify-center rounded-xl bg-brand-gold px-4 text-xs font-bold text-white shadow-xs hover:bg-brand-gold-hover transition"
                >
                  Send
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>
