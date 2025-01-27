<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 class="text-xl font-bold mb-4 dark:text-white">推薦視頻</h2>
      <div class="space-y-4">
        <div v-for="video in recommendedVideos" :key="video.id" class="flex space-x-4">
          <img :src="video.thumbnail" :alt="video.title" class="w-40 h-24 object-cover rounded" />
          <div>
            <h3 class="font-medium dark:text-white">{{ video.title }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ video.channel }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ video.views }} 次觀看 · {{ video.uploadTime }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const recommendedVideos = ref([
    { id: 1, title: '推薦視頻 1', channel: '頻道 1', views: '10萬', uploadTime: '1 天前', thumbnail: '/placeholder.svg?height=90&width=160&text=Video+1' },
    { id: 2, title: '推薦視頻 2', channel: '頻道 2', views: '5萬', uploadTime: '2 天前', thumbnail: '/placeholder.svg?height=90&width=160&text=Video+2' },
    { id: 3, title: '推薦視頻 3', channel: '頻道 3', views: '8萬', uploadTime: '3 天前', thumbnail: '/placeholder.svg?height=90&width=160&text=Video+3' }
  ])
  </script>