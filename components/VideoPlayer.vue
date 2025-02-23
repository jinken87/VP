<template>
  <div class="space-x-4 space-y-4">
    <div class="aspect-w-16 aspect-h-9 flex mx-4 gap-4">
      <video
        class="w-[960px] h-[600px] object-cover rounded-lg"
        :class="{ 'pointer-events-none': videoPointerNone }"
        :src="videoData.url"
        controls
        :poster="videoData.thumbnail"
      ></video>
      <!-- <video
        class="w-full h-full object-cover rounded-lg"
        :class="{ 'pointer-events-none': videoPointerNone }"
        :src="video.videoUrl"
        controls
        :poster="video.thumbnailUrl"
      ></video> -->
      <div class="flex-1 h-[600px]">
        <RecommendedVideos :videoList="videoList" />
      </div>
    </div>
    <!-- <div>{{ videoList }}</div> -->
    <div>{{ videoData }}</div>
    <div class="bg-white rounded-lg shadow p-6">
      <div class="text-2xl font-bold mb-4">{{ videoData.title }}</div>
      <div class="text-sm font-bold mb-4">
        {{ videoData.description || "-" }}
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <img
            :src="video.thumbnailUrl"
            :alt="video.channelName"
            class="w-12 h-12 rounded-full"
          />
          <div>
            <p class="font-medium">{{ videoData.channel }}</p>
            <p class="text-sm text-gray-500">
              {{ videoData.subscribed }} 訂閱者
            </p>
          </div>
        </div>
        <button
          class="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
        >
          訂閱
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  videoData: {
    type: Object,
    default: () => ({}),
  },
});
import useVideoStore from "~/stores/videos";

const videoStore = useVideoStore();

const videoPointerNone = computed(() => {
  return videoStore.videoPointerNone;
});

const videoList = computed(() => {
  return videoStore.videoList;
});

const videoData = computed(() => {
  return props.videoData;
});

const video = ref({
  // <video part="video" crossorigin="" playsinline="" muted="" src="https://videos.pexels.com/video-files/29716330/12777302_2560_1440_30fps.mp4" preload="metadata"><track kind="metadata" label="cuepoints" data-removeondestroy=""></video>
  videoUrl:
    "https://videos.pexels.com/video-files/29716330/12777302_2560_1440_30fps.mp4", // 這應該是實際視頻的 URL
  // videoUrl: 'https://player.vimeo.com/external/5155396.hd.mp4?s=1a2b3c4d5e6f7g8h9i0j', // 這應該是實際視頻的 URL
  // videoUrl: 'https://example.com/sample-video.mp4', // 這應該是實際視頻的 URL
  thumbnailUrl: "https://picsum.photos/800/450", // 使用 picsum 作為示例縮略圖
  title: "示例視頻標題",
  // channelAvatarUrl: 'https://picsum.photos/48/48', // 使用 picsum 作為示例頭像
  channelAvatarUrl: "https://picsum.photos/id/237/200/200", // 使用 picsum 作為示例頭像
  channelName: "示例頻道",
  subscriberCount: "100萬",
});
onMounted(async () => {
  await videoStore.getVideo();
  console.log("影音列表:", videoList.value);
});
</script>
