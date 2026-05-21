<script setup lang="ts">
import { ref } from 'vue'
import { useModal } from '@/composables/useModal'
import BaseButton from '@/components/ui/BaseButton.vue'

const { isCreatePostModalOpen, closeCreatePostModal } = useModal()

const postText = ref('')

// Media Upload Logic
const fileInput = ref<HTMLInputElement | null>(null)
const mediaFiles = ref<File[]>([])
const mediaPreviews = ref<{ url: string; type: string }[]>([])

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    Array.from(target.files).forEach((file) => {
      mediaFiles.value.push(file)
      mediaPreviews.value.push({
        url: URL.createObjectURL(file),
        type: file.type.startsWith('video/') ? 'video' : 'image',
      })
    })
  }
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const removeMedia = (index: number) => {
  const media = mediaPreviews.value[index]
  if (media) {
    URL.revokeObjectURL(media.url)
  }
  mediaPreviews.value.splice(index, 1)
  mediaFiles.value.splice(index, 1)
}

// Tagging Logic
const showTagDropdown = ref(false)
const taggedUsers = ref<{ id: number; name: string }[]>([])
const mockFriends = [
  { id: 1, name: 'Jane Doe' },
  { id: 2, name: 'David Omari' },
  { id: 3, name: 'Zahra Njeri' },
]

const toggleTagDropdown = () => {
  showTagDropdown.value = !showTagDropdown.value
  showEmojiPicker.value = false
}

const toggleTagUser = (friend: { id: number; name: string }) => {
  const index = taggedUsers.value.findIndex((u) => u.id === friend.id)
  if (index > -1) {
    taggedUsers.value.splice(index, 1)
  } else {
    taggedUsers.value.push(friend)
  }
}

const isUserTagged = (id: number) => {
  return taggedUsers.value.some((u) => u.id === id)
}

// Emoji Picker Logic
const showEmojiPicker = ref(false)
const mockEmojis = ['😀', '😂', '🥰', '😎', '🤔', '🙌', '🔥', '🎉', '💡', '💯', '❤️', '👍']

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value
  showTagDropdown.value = false
}

const addEmoji = (emoji: string) => {
  postText.value += emoji
}

const handlePost = () => {
  console.log('Posting:', postText.value, mediaFiles.value, taggedUsers.value)
  postText.value = ''
  mediaPreviews.value.forEach((m) => URL.revokeObjectURL(m.url))
  mediaPreviews.value = []
  mediaFiles.value = []
  taggedUsers.value = []
  showTagDropdown.value = false
  showEmojiPicker.value = false
  closeCreatePostModal()
}
</script>

<template>
  <div
    v-if="isCreatePostModalOpen"
    class="fixed inset-0 bg-white/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-0"
    @click.self="closeCreatePostModal"
  >
    <!-- Modal Container -->
    <div
      class="bg-white w-full max-w-[500px] rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]"
    >
      <!-- Header -->
      <div class="relative flex items-center justify-center py-4 border-b border-gray-100">
        <h2 class="text-xl font-bold text-gray-900">Create post</h2>
        <button
          @click="closeCreatePostModal"
          class="absolute right-4 h-9 w-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- Scrollable Body -->
      <div class="flex-1 overflow-y-auto p-4 flex flex-col relative">
        <!-- User Info -->
        <div class="flex items-center space-x-3 mb-4">
          <div class="h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <img
              src="https://i.pravatar.cc/150?u=chidi"
              alt="Profile"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="min-w-0">
            <h3 class="text-sm font-bold text-gray-900 truncate">
              <!-- Render parts to highlight the 'is with' -->
              <template v-if="taggedUsers.length > 0">
                Habari, Chidi <span class="font-normal text-gray-600">is with</span>
                <span class="font-bold text-gray-900">{{ taggedUsers[0]?.name }}</span>
                <span v-if="taggedUsers.length > 1" class="font-normal text-gray-600"> and </span>
                <span v-if="taggedUsers.length > 1" class="font-bold text-gray-900"
                  >{{ taggedUsers.length - 1 }} others</span
                >
              </template>
              <template v-else> Habari, Chidi </template>
            </h3>
            <button
              class="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-md mt-0.5 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-[11px] font-bold text-gray-800">Public</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Text Input -->
        <textarea
          v-model="postText"
          class="w-full text-xl sm:text-2xl outline-none resize-none min-h-[120px] placeholder-gray-400 bg-transparent"
          placeholder="What's on your mind, Chidi?"
        ></textarea>

        <!-- Media Previews -->
        <div v-if="mediaPreviews.length > 0" class="mb-4 space-y-2">
          <div
            class="grid gap-2"
            :class="{
              'grid-cols-1': mediaPreviews.length === 1,
              'grid-cols-2': mediaPreviews.length > 1,
            }"
          >
            <div
              v-for="(media, index) in mediaPreviews"
              :key="index"
              class="relative rounded-lg overflow-hidden border border-gray-200 bg-black max-h-64 flex items-center justify-center group"
            >
              <button
                @click="removeMedia(index)"
                class="absolute top-2 right-2 h-8 w-8 bg-white/80 backdrop-blur shadow-md rounded-full flex items-center justify-center text-gray-800 hover:bg-white z-10 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <img
                v-if="media.type === 'image'"
                :src="media.url"
                class="max-w-full max-h-full object-contain"
              />
              <video
                v-else
                :src="media.url"
                controls
                class="max-w-full max-h-full object-contain"
              ></video>
            </div>
          </div>
        </div>

        <input
          type="file"
          ref="fileInput"
          accept="image/*,video/*"
          multiple
          class="hidden"
          @change="handleFileChange"
        />

        <!-- Tagging Dropdown Menu -->
        <div
          v-if="showTagDropdown"
          class="absolute bottom-24 right-4 bg-white border border-gray-200 shadow-xl rounded-xl w-64 p-2 z-20"
        >
          <div class="px-2 py-1 mb-1">
            <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider">Tag Friends</h4>
          </div>
          <ul class="space-y-1 max-h-48 overflow-y-auto">
            <li v-for="friend in mockFriends" :key="friend.id">
              <button
                @click="toggleTagUser(friend)"
                class="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
              >
                <span class="text-sm font-medium text-gray-900">{{ friend.name }}</span>
                <div
                  class="h-5 w-5 rounded-full border flex items-center justify-center transition-colors"
                  :class="
                    isUserTagged(friend.id) ? 'bg-brand-indigo border-brand-indigo' : 'border-gray-300'
                  "
                >
                  <svg
                    v-if="isUserTagged(friend.id)"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </button>
            </li>
          </ul>
        </div>

        <!-- Emoji Picker Dropdown -->
        <div
          v-if="showEmojiPicker"
          class="absolute bottom-24 right-4 bg-white border border-gray-200 shadow-xl rounded-xl p-3 z-20 w-64"
        >
          <div class="grid grid-cols-5 gap-2">
            <button
              v-for="emoji in mockEmojis"
              :key="emoji"
              @click="addEmoji(emoji)"
              class="text-2xl hover:bg-gray-100 rounded-lg p-1 transition-colors focus:outline-none"
            >
              {{ emoji }}
            </button>
          </div>
        </div>

        <!-- Add to post -->
        <div class="mt-auto">
          <div
            class="border border-gray-300 rounded-lg p-3 flex items-center justify-between shadow-sm"
          >
            <span class="text-sm font-bold text-gray-900 ml-1">Add to your post</span>
            <div class="flex items-center space-x-1">
              <!-- Photo/Video -->
              <button
                @click="triggerFileInput"
                class="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none relative"
                title="Photo/Video"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <!-- Tag People -->
              <button
                @click="toggleTagDropdown"
                class="p-2 rounded-full transition-colors focus:outline-none"
                :class="
                  showTagDropdown || taggedUsers.length > 0 ? 'bg-blue-50' : 'hover:bg-gray-100'
                "
                title="Tag people"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <!-- Feeling/Emoji -->
              <button
                @click="toggleEmojiPicker"
                class="p-2 rounded-full transition-colors focus:outline-none"
                :class="showEmojiPicker ? 'bg-yellow-50' : 'hover:bg-gray-100'"
                title="Feeling/Activity/Emoji"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-yellow-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <!-- Location -->
              <button
                class="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none hidden sm:block"
                title="Location"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Action -->
      <div class="p-4 border-t border-gray-100">
        <BaseButton
          block
          :disabled="!postText.trim() && mediaFiles.length === 0"
          @click="handlePost"
          variant="primary"
          class="w-full text-base font-bold transition-all"
        >
          Post
        </BaseButton>
      </div>
    </div>
  </div>
</template>
