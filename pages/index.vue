<template>
    <main class="container mx-auto px-4 py-8">
      <div class="grid gap-8 md:grid-cols-[2fr_1fr]">
        <div class="space-y-6">
          <VideoPlayer />
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4 text-3xl">
            <p>55666</p>
            <div>{{  userList }}</div>
            <h2 class="text-xl font-bold dark:text-white">評論</h2>
            <div v-for="comment in comments" :key="comment.id" class="flex space-x-4">
              <img :src="comment.avatar" :alt="comment.username" class="w-10 h-10 rounded-full" />
              <div>
                <p class="font-medium dark:text-white">{{ comment.username }}</p>
                <p class="text-gray-600 dark:text-gray-300">{{ comment.content }}</p>
              </div>
            </div>
          </div>
        </div>
        <RecommendedVideos />
      </div>
    </main>
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" @login="login" />
  </template>
  
  <script setup>
  import {useUserStore} from '~/stores/users';

  const useUser = useUserStore();
  const showLoginModal = useState('showLoginModal', () => false)
  const isLoggedIn = useState('isLoggedIn', () => false)

  const userList = computed(() => {return useUser.userList});
  
  const comments = ref([
    { id: 1, username: '用戶1', avatar: '/placeholder.svg?height=40&width=40', content: '這個視頻真的很棒!' },
    { id: 2, username: '用戶2', avatar: '/placeholder.svg?height=40&width=40', content: '學到了很多,謝謝分享!' }
  ])
  
  const login = (username) => {
    isLoggedIn.value = true
    showLoginModal.value = false
    console.log(`${username} 已登入`)
  }
  
  definePageMeta({
    layout: 'default'
  })

  onMounted(async () => {
    await useUser.getUsers();
    console.log('用戶列表:', userList.value)
  })
  </script>