<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg w-96">
        <h2 class="text-2xl font-bold mb-4 dark:text-white">登入</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="username" class="block mb-2 dark:text-white">用戶名</label>
            <input v-model="username" id="username" type="text" class="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
          </div>
          <div class="mb-4">
            <label for="password" class="block mb-2 dark:text-white">密碼</label>
            <input v-model="password" id="password" type="password" class="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
          </div>
          <button type="submit" class="w-full px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">登入</button>
        </form>
        <button @click="$emit('close')" class="mt-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">關閉</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const username = ref('')
  const password = ref('')
  
  const emit = defineEmits(['close', 'login'])
  
  const handleLogin = () => {
    // 這裡應該實現實際的登入邏輯
    emit('login', username.value)
  }
  </script>