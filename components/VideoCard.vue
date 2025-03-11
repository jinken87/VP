<template>
  <!-- {{ props.videoList }} -->
  <div class="flex w-full flex-wrap gap-4">
    <!-- <span>{{ subscribeStore.subscriptions }}</span> -->
    <div v-for="video in props.videoList" :key="video.id">
      <video :src="video.url" class="w-[600px]" controls></video>
      <VideoDesc :videoData="video" />
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
// 透過插件註冊之後使用
const props = defineProps({
  videoList: {
    type: Array,
    default: () => [],
  },
});

const getTimeDifference = (inputDate) => {
  const now = dayjs();
  const date = dayjs(inputDate);
  const diffInSeconds = now.diff(date, "second");
  const diffInMinutes = now.diff(date, "minute");
  const diffInHours = now.diff(date, "hour");
  const diffInDays = now.diff(date, "day");

  if (diffInDays >= 1) {
    return `${diffInDays}天前`;
  } else if (diffInHours >= 1) {
    return `${diffInHours}小时前`;
  } else if (diffInMinutes >= 1) {
    return `${diffInMinutes}分钟前`;
  } else {
    return `${diffInSeconds}秒前`;
  }
};
</script>
