<template>
  {{ props.videoList }}
  <div class="flex w-full flex-wrap gap-4">
    <span>{{ subscribeStore.subscriptions }}</span>
    <div v-for="video in props.videoList" :key="video.id">
      <video :src="video.url" class="w-[600px] h-[480px]" controls></video>
      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-2xl font-bold mb-4">{{ video.title }}</div>
        <div class="text-sm font-bold mb-4">
          {{ video.description || "-" }}
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <img
              :src="video.thumbnail"
              :alt="video.channelName"
              class="w-12 h-12 rounded-full"
            />
            <div>
              <p class="font-medium">{{ video.username }}</p>
              <p class="text-sm text-gray-500">
                {{ t("subscription_count", { count: video.subscribed }) }}
              </p>
              <div class="text-sm text-gray-500">
                <span>
                  {{ t("views", { times: video.views || 0 }) }}
                </span>
                <span>{{ " • " }}</span>
                <span>{{ getPassTime(video.created_at) }}</span>
              </div>
            </div>
          </div>
          <button
            class="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            @click="toggleSubscription(video.user_id)"
          >
            {{ isSubscribed(video.user_id) ? "取消訂閱" : t("subscribe") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useSubsciption from "~/stores/subscriptions";
import useLoginStore from "~/stores/loginAndRegister";

import dayjs from "dayjs";
const { $dayjs } = useNuxtApp(); // 使用 useNuxtApp 获取 $dayjs
// 透過插件註冊之後使用
const props = defineProps({
  videoList: {
    type: Array,
    default: () => [],
  },
});
const { t } = useI18n();
const loginStore = useLoginStore();
const subscribeStore = useSubsciption();

const userInfo = computed(() => loginStore.userInfo);
const userId = computed(() => userInfo.value.id);

const fetchSubscriptions = () => {
  subscribeStore.fetchSubscriptions(userId.value);
};
const toggleSubscription = async (targetId) => {
  if (!loginStore.isAuthenticated) {
    loginStore.showDialog();
    return;
  }
  // await fetchSubscriptions();
  subscribeStore.toggleSubscription(userId.value, targetId);
  // fetchSubscriptions();
};

const isSubscribed = (targetId) => {
  return subscribeStore.isSubscribed(targetId);
};

const getPassTime = (inputDate) => {
  return $dayjs(inputDate).fromNow();
};

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

watchEffect(() => {
  if (userId.value) {
    console.log("載入訂閱資料: ", userId.value);
    fetchSubscriptions(userId.value);
  }
});

// onMounted(async () => {
//   console.log(userId.value, "userId.value");
//   await fetchSubscriptions(userId.value);
// });
</script>
