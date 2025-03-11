<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div>
      <div class="text-2xl font-bold mb-4">
        <span class="cursor-pointer" @click="goToDetail(video.id)">
          {{ video.title }}
        </span>
      </div>
      <div class="text-sm font-bold mb-4">
        {{ video.description || "-" }}
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div
        class="flex items-center space-x-4 cursor-pointer"
        @click="goToUserInfo(video.username)"
      >
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
        v-if="!isMy"
        class="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
        @click="toggleSubscription(video.user_id)"
      >
        {{ isSubscribed(video.user_id) ? "取消訂閱" : t("subscribe") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import useSubsciption from "~/stores/subscriptions";
import useLoginStore from "~/stores/loginAndRegister";

const props = defineProps({
  videoData: {
    type: Object,
    default: () => {},
  },
});

const { t } = useI18n();
const { $dayjs } = useNuxtApp(); // 使用 useNuxtApp 获取 $dayjs

const video = computed(() => {
  return props.videoData;
});

const loginStore = useLoginStore();
const subscribeStore = useSubsciption();

const userInfo = computed(() => loginStore.userInfo);
const userId = computed(() => userInfo.value.id);

const isMy = computed(() => {
  return userInfo.value?.username === video.value.username;
});

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

const getPassTime = (inputDate) => {
  return $dayjs(inputDate).fromNow();
};

const isSubscribed = (targetId) => {
  return subscribeStore.isSubscribed(targetId);
};

watchEffect(() => {
  if (userId.value) {
    console.log("載入訂閱資料: ", userId.value);
    fetchSubscriptions(userId.value);
  }
});
</script>
