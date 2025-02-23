<template>
  <div>
    <!-- <p @click="showLoginModal">123</p> -->
    <!-- <p>{{ userList }}</p> -->
    <!-- <div>{{ videoList }}</div> -->
    <!-- <div>{{ videoId }}</div> -->
    <!-- <div>{{ videoData }}</div> -->
    <!-- <span @click="go">go</span> -->
    <VideoPlayer :videoData="videoData" />
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/users";
import useVideoStore from "~/stores/videos";

import useLoginStore from "~/stores/loginAndRegister";

const loginStore = useLoginStore();
const videoStore = useVideoStore();

const router = useRouter();
const route = useRoute();
const useUser = useUserStore();

const videoId = computed(() => {
  return route.query.id;
});

const videoList = computed(() => {
  return videoStore.videoList;
});

const videoData = computed(() => {
  const data = videoList.value.filter((video) => video.id == videoId.value);
  return data[0];
});

const userName = computed(() => {
  return route.query.name;
});

const userList = computed(() => {
  return useUser.userList.filter((user) => user.name == userName.value);
});

const showLoginModal = loginStore.showLogin;

const go = () => {
  router.push({ path: "/" });
};

onMounted(async () => {
  await useUser.getUsers();
  await videoStore.getVideo();
  console.log("用戶列表:", userList.value);
});
</script>
