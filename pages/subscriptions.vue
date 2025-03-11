<template>
  <main class="container mx-auto px-4 py-8">
    <span>{{ sub }}</span>
    <div v-if="videoList">
      <VideoCard :videoList="videoList" />
    </div>
    <div v-else class="grid gap-8 md:grid-cols-[2fr_1fr]">
      <div class="space-y-6">
        <VideoPlayer />
        <div class="bg-white rounded-lg shadow p-6 space-y-4 text-3xl">
          <div class="cursor-pointer" @click="abcc">
            <p>55666</p>
          </div>
          <div>{{ userList }}</div>
          <h2 class="text-xl font-bold">評論</h2>
          <div
            v-for="comment in comments"
            :key="comment.id"
            class="flex space-x-4"
          >
            <img
              :src="comment.avatar"
              :alt="comment.username"
              class="w-10 h-10 rounded-full"
            />
            <div>
              <p class="font-medium">{{ comment.username }}</p>
              <p class="text-gray-600">
                {{ comment.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <RecommendedVideos :videoList="recommendedVideos" />
    </div>
  </main>
  <!-- <el-dialog v-model="abc" title="登入" width="30%">
      <template #default>
        <p>5678900000</p>
      </template>
    </el-dialog> -->
  <LoginModal
    v-if="showLoginModal"
    @close="showLoginModal = false"
    @login="login"
  />
</template>

<script setup>
import { useUserStore } from "~/stores/users";
import useVideoStore from "~/stores/videos";
// import useLoginStore from "~/stores/loginAndRegister";
// import { ElDialog } from "element-plus";
const abc = ref(false);

// const loginStore = useLoginStore()
const supabase = useSupabase();

const useUser = useUserStore();

const videoStore = useVideoStore();

const videoList = computed(() => {
  return videoStore.videoList;
});

const recommendedVideos = computed(() => {
  return videoList.value.filter((video) => video.recommended);
});

const showLoginModal = useState("showLoginModal", () => false);
const isLoggedIn = useState("isLoggedIn", () => false);

const userList = computed(() => {
  return useUser.userList;
});

const comments = ref([
  {
    id: 1,
    username: "用戶1",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "這個視頻真的很棒!",
  },
  {
    id: 2,
    username: "用戶2",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "學到了很多,謝謝分享!",
  },
]);

const login = (username) => {
  isLoggedIn.value = true;
  showLoginModal.value = false;
  console.log(`${username} 已登入`);
};

const abcc = () => {
  abc.value = !abc.value;
  console.log("dd", abc.value);
};

definePageMeta({
  layout: "default",
});

onMounted(async () => {
  await useUser.getUsers();
  await videoStore.getVideo();
  console.log("用戶列表:", userList.value);
});
</script>
