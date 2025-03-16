<template>
  <div class="h-full bg-white rounded-lg shadow overflow-auto">
    <h2 class="text-xl font-bold mb-4">{{ t("recommended_videos") }}</h2>
    <div class="space-y-4">
      <div v-for="video in hotVideos" :key="video.id" class="flex space-x-4">
        <img
          :src="video.thumbnail"
          :alt="video.title"
          class="w-40 h-24 object-cover rounded"
        />
        <div>
          <h3 class="font-medium">{{ video.title }}</h3>
          <p class="text-sm text-gray-500">
            <!-- {{ video.channel }} -->
            {{ video.description }}
          </p>
          <p class="text-sm text-gray-500">
            <!-- {{ video.views }} 次觀看 · {{ video.uploadTime }} -->
            {{ t("views", { times: video.views || 0 }) }} ·
            <span>{{ getPassTime(video.created_at) }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  videoList: {
    type: Array,
    default: () => [],
  },
});

const { t } = useI18n();

const hotVideos = computed(() => {
  return props.videoList;
});
watch(
  () => props.videoList,
  () => {
    console.log("0987654dfghjkl7777777", props.videoList);
  }
);
</script>
