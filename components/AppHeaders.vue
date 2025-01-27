<template>
    <header class="bg-white dark:bg-gray-800 shadow">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <NuxtLink to="/" class="text-xl font-bold text-gray-800 dark:text-white">影音網站</NuxtLink>
          <NuxtLink to="/" class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">首頁</NuxtLink>
          <NuxtLink to="/trending" class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">熱門</NuxtLink>
          <NuxtLink to="/subscriptions" class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">訂閱</NuxtLink>
        </div>
        <div class="flex items-center space-x-4">
          <form @submit.prevent="search" class="relative">
            <input
              v-model="searchQuery"
              type="search"
              placeholder="搜索視頻..."
              class="pl-8 pr-2 py-1 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button type="submit" class="absolute left-2 top-1/2 transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
          <button v-if="isLoggedIn" @click="logout" class="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">登出</button>
          <button v-else @click="showLoginModal = true" class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">登入</button>
        </div>
      </nav>
    </header>
  </template>
  
  <script setup>
  const searchQuery = ref('')
  const isLoggedIn = useState('isLoggedIn')
  const showLoginModal = useState('showLoginModal')
  
  const search = () => {
    console.log('Searching for:', searchQuery.value)
    // 實現搜索邏輯
  }
  
  const logout = () => {
    isLoggedIn.value = false
    console.log('用戶已登出')
  }
  </script>