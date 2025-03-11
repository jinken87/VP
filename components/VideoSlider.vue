<template>
  <div class="text-red-800 max-w-screen-lg relative">
    <h2 class="text-2xl font-bold mb-4">{{ "我的影片" }}</h2>

    <!-- 只有當 videoList 有數據時才渲染 Swiper -->
    <div class="relative h-[200px] px-[50px]">
      <Swiper
        v-if="hasVideos"
        :modules="[Navigation]"
        :slides-per-view="'auto'"
        :space-between="12"
        navigation
        free-mode
        class="swiper-container h-[200px] static"
      >
        <SwiperSlide
          v-for="video in props.videoList"
          :key="video.id"
          class="min-w-[192px] w-[192px]"
        >
          <div class="relative w-48">
            <video class="h-24 w-48 rounded-lg" :src="video.url"></video>
            <span
              v-if="video?.duration"
              class="absolute bottom-1 right-1 bg-black text-white text-xs px-1 py-0.5 rounded"
            >
              {{ video.duration }}
            </span>
          </div>
          <div class="mt-2">
            <p class="text-sm font-semibold leading-tight">
              {{ video?.title || "未知標題" }}
            </p>
            <p class="text-xs text-gray-400">
              觀看次數：{{ video?.views || "未知次數" }} ·
              {{ video?.time || "未知時間" }}
            </p>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- 如果 videoList 為空，顯示訊息 -->
      <p v-else class="text-center text-gray-400">{{ "暫無推薦影片" }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const props = defineProps({
  videoList: {
    type: Array,
    default: () => [],
  },
});
/* 預設空陣列，確保不會 undefined */
const videoList = ref([]);

/* 模擬 API 加載 */
onMounted(() => {
  videoList.value = [
    {
      id: 1,
      title: "【千坂電音合集】這是你沒聽過的全新合集",
      url: "https://videos.pexels.com/video-files/2871918/2871918-hd_1920_1080_30fps.mp4",
      thumbnail: "https://picsum.photos/id/234/200/200",
      duration: "48:03",
      views: "4.3萬次",
      time: "2年前",
    },
    {
      id: 2,
      title: "【純音樂】那些初夏氣息的輕音樂",
      url: "https://videos.pexels.com/video-files/2871918/2871918-hd_1920_1080_30fps.mp4",
      thumbnail: "https://picsum.photos/id/234/200/200",
      duration: "24:01",
      views: "1.4萬次",
      time: "1年前",
    },
    {
      id: 3,
      title: "《劍來》片尾曲 – 《知我》",
      url: "https://videos.pexels.com/video-files/2871918/2871918-hd_1920_1080_30fps.mp4",
      thumbnail: "https://picsum.photos/id/234/200/200",
      duration: "4:39",
      views: "10萬次",
      time: "5個月前",
    },
    {
      id: 4,
      title: "《劍來》片尾曲 – 《知我》",
      url: "https://videos.pexels.com/video-files/2871918/2871918-hd_1920_1080_30fps.mp4",
      thumbnail: "https://picsum.photos/id/234/200/200",
      duration: "4:39",
      views: "10萬次",
      time: "5個月前",
    },
    {
      id: 5,
      title: "《劍來》片尾曲 – 《知我》",
      url: "https://videos.pexels.com/video-files/2871918/2871918-hd_1920_1080_30fps.mp4",
      thumbnail: "https://picsum.photos/id/234/200/200",
      duration: "4:39",
      views: "10萬次",
      time: "5個月前",
    },
    {
      id: 6,
      title: "《劍來》片尾曲 – 《知我》",
      url: "https://videos.pexels.com/video-files/2871918/2871918-hd_1920_1080_30fps.mp4",
      thumbnail: "https://picsum.photos/id/234/200/200",
      duration: "4:39",
      views: "10萬次",
      time: "5個月前",
    },
  ];
});

/* 避免 videoList 為空時 Swiper 渲染錯誤 */
const hasVideos = computed(() => videoList.value.length > 0);
</script>

<style lang="scss" scoped>
.swiper-container {
  //   padding: 0 60px;
  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    top: 50%;
    transform: translate(0, -50%);
    width: 40px;
    height: 40px;
    // padding: 0.5rem;
    color: white;
    border-radius: 100px;
    background-color: rgba(35, 29, 29, 0.5);
    &:after {
      font-size: 24px;
    }
  }
  :deep(.swiper-button-prev) {
    left: -8px !important; /* 讓左側箭頭有間距 */
  }

  :deep(.swiper-button-next) {
    right: -8px !important; /* 讓右側箭頭有間距 */
  }
}
</style>
