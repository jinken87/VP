<template>
  <div class="info-container flex flex-col">
    <div v-if="userData?.backImg">
      <img :src="userData?.backImg" alt="" />
    </div>
    <div class="w-[1000px]">
      <span>
        {{ isMy }}
      </span>
      <img src="" alt="" />
    </div>
    <div class="gap-8 flex items-center">
      <!-- <p @click="showLoginModal">123</p> -->
      <img
        class="w-48 h-48 rounded-full"
        :src="userData?.thumbnail"
        alt="avatar"
      />
      <div>
        <span>{{ userData?.username || "作者姓名" }}</span>
        <span>{{ userData?.description || "作者敘述" }}</span>
        <span>{{ userData?.email || "作者信箱" }}</span>
      </div>
    </div>
    <div>
      <span
        :class="{ 'font-bold text-4xl text-[rgb(239,204,227)]': !isVideo }"
        class="cursor-pointer"
        @click="switchTab(EntityType.USER)"
        >{{ "關於" }}</span
      >
      <span
        :class="{ 'font-bold text-4xl text-[rgb(239,204,227)]': isVideo }"
        class="cursor-pointer"
        @click="switchTab(EntityType.VIDEO)"
        >{{ "影片" }}</span
      >
      <span>{{ tabValue }}</span>
    </div>
    <div v-if="tabValue === EntityType.VIDEO">
      <!-- <VideoCard :videoList="videoList" /> -->
      <div>{{ videoList || [] }}</div>
      <!-- <CarouselPart /> -->
      <VideoSlider :videoList="videoList" />
    </div>
    <div v-else>
      <div>
        <span>{{ userData?.username || "作者姓名" }}</span>
        <span>{{ userData?.description || "作者敘述" }}</span>
        <span>{{ userData?.email || "作者信箱" }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/users";
import useVideoStore from "~/stores/videos";
import useLoginStore from "~/stores/loginAndRegister";
import { EntityType } from "~/types/search";

const loginStore = useLoginStore();

// const router = useRouter();
const route = useRoute();
const useUser = useUserStore();
const videoStore = useVideoStore();

const tabValue = ref(0);

const loginUser = loginStore.userInfo;

const isMy = computed(() => {
  return loginUser.username === username.value;
});

const isVideo = computed(() => tabValue.value === EntityType.VIDEO);

const username = computed(() => {
  return route.query.username;
});

const userData = computed(() => {
  return useUser.userList.find((user) => user.username === username.value);
});

const videoList = computed(() => {
  return videoStore.videoList?.filter(
    (item) => item.username === username.value
  );
});

const switchTab = (item) => {
  tabValue.value = item;
};

// const showLoginModal = loginStore.showLogin;

onMounted(async () => {
  await useUser.getUsers();
  await videoStore.getVideo();
  console.log("用戶列表:", userList.value);
});
</script>

<style lang="scss" scoped></style>
