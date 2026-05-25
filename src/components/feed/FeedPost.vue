<script setup lang="ts">

defineProps<{
  post: {
    id: number
    userName: string
    userAvatar: string
    verified: boolean
    time: string
    caption: string
    image: string | null
    likes: number
    comments: number
    shares: number
  }
}>()
</script>

<template>
  <div class="bg-white px-4 py-5 border-b border-slate-100">
    <!-- Header -->
    <div class="flex justify-between items-start mb-3">
      <div class="flex items-center space-x-3">
        <div class="h-10 w-10 rounded-full overflow-hidden bg-slate-100">
          <img :src="post.userAvatar" :alt="post.userName" class="h-full w-full object-cover" />
        </div>
        <div>
          <div class="flex items-center">
            <h3 class="font-bold text-brand-slate text-sm">{{ post.userName }}</h3>
            <svg
              v-if="post.verified"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-brand-indigo ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <p class="text-xs text-brand-slate">{{ post.time }}</p>
        </div>
      </div>
      <button class="text-gray-400 hover:text-gray-600 focus:outline-none">
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
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </button>
    </div>

    <!-- Content -->
    <div class="mb-3">
      <p class="text-sm text-brand-slate leading-snug whitespace-pre-line">{{ post.caption }}</p>
      <div v-if="post.image" class="mt-3 rounded-xl overflow-hidden max-h-80 bg-slate-100">
        <img
          :src="post.image"
          alt="Post content"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between pt-2">
      <div class="flex space-x-6 text-brand-slate text-sm">
        <button class="flex items-center space-x-1.5 hover:text-brand-indigo transition-colors">
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
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.514"
            />
          </svg>
          <span>{{ post.likes }}</span>
        </button>
        <button class="flex items-center space-x-1.5 hover:text-brand-indigo transition-colors">
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
          <span>{{ post.comments }}</span>
        </button>
        <button class="flex items-center space-x-1.5 hover:text-brand-indigo transition-colors">
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
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          <span>{{ post.shares }}</span>
        </button>
      </div>

      <button
        class="bg-brand-gold hover:bg-brand-gold-hover text-brand-indigo text-xs font-bold py-1.5 px-4 rounded-xl transition-colors shadow-sm"
      >
        Connect
      </button>
    </div>
  </div>
</template>
