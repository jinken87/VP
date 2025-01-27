<template>
  <div class="space-y-4">
    <div class="aspect-w-16 aspect-h-9">
      <video
        class="w-full h-full object-cover rounded-lg"
        :src="video.videoUrl"
        controls
        :poster="video.thumbnailUrl"
      ></video>
    </div>
    <div>{{ videoList }}</div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold mb-4 dark:text-white">{{ video.title }}</h1>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <img :src="video.channelAvatarUrl" :alt="video.channelName" class="w-12 h-12 rounded-full" />
          <div>
            <p class="font-medium dark:text-white">{{ video.channelName }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ video.subscriberCount }} 訂閱者</p>
          </div>
        </div>
        <button class="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">訂閱</button>
      </div>
    </div>
  </div>
</template>

<script setup>

import useVideoStore from '~/stores/videos'

const videoStore = useVideoStore()

const videoList = computed(() => {return videoStore.videoList})

const video = ref({
  // <video part="video" crossorigin="" playsinline="" muted="" src="https://videos.pexels.com/video-files/29716330/12777302_2560_1440_30fps.mp4" preload="metadata"><track kind="metadata" label="cuepoints" data-removeondestroy=""></video>
  videoUrl: 'https://videos.pexels.com/video-files/29716330/12777302_2560_1440_30fps.mp4', // 這應該是實際視頻的 URL
  // videoUrl: 'https://example.com/sample-video.mp4', // 這應該是實際視頻的 URL
  thumbnailUrl: 'https://picsum.photos/800/450', // 使用 picsum 作為示例縮略圖
  title: '示例視頻標題',
  channelAvatarUrl: 'https://picsum.photos/48/48', // 使用 picsum 作為示例頭像
  channelName: '示例頻道',
  subscriberCount: '100萬'
})
onMounted(async () => {
  await videoStore.getVideo();
  console.log('影音列表:', videoList.value)
})
</script>