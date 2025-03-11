<template>
  <div class="flex gap-4">
    <div class="info-container gap-4 flex flex-col w-[890px] ml-[52px]">
      <div class="flex items-center gap-8">
        <img
          class="w-48 h-48 rounded-full"
          :src="userData?.thumbnail"
          alt="avatar"
        />
        <div class="flex flex-col gap-2">
          <span class="text-2xl">{{ userData?.username || "" }}</span>
          <span>{{ userData?.email || "" }}</span>
          <span>{{ userData?.description || "" }}</span>
          <button
            class="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            @click="toggleSubscription(userData.id)"
          >
            {{ isSubscribed(userData.id) ? "取消訂閱" : t("subscribe") }}
          </button>
        </div>
      </div>
      <div
        class="relative flex items-end gap-4 pb-2 text-2xl border-b-[1px] border-gray-600"
      >
        <span
          :class="{ 'font-bold  text-[rgb(239,204,227)]': !isVideo }"
          class="cursor-pointer"
          @click="switchTab(EntityType.USER)"
          >{{ "關於" }}</span
        >
        <span
          :class="{ 'font-bold  text-[rgb(239,204,227)]': isVideo }"
          class="cursor-pointer"
          @click="switchTab(EntityType.VIDEO)"
          >{{ "影片" }}</span
        >
        <div
          class="absolute bottom-0 h-[3px] bg-red-600 transition-all duration-300"
          :style="{
            width: `${underlineWidth}px`,
            transform: `translateX(${underlinePosition}px)`,
          }"
        ></div>
      </div>
      <div v-if="tabValue === EntityType.VIDEO" class="pb-2">
        <div v-if="videoList.length > 0">
          <VideoSlider :videoList="videoList" />
        </div>
        <div v-else>
          {{ 暫無影片 }}
        </div>
      </div>
      <div v-else class="pb-2">
        <div class="user-table self-start">
          <el-card style="max-width: 890px">
            <template #header>
              <strong>用戶資訊</strong>
            </template>

            <el-form label-width="80px">
              <el-form-item
                v-for="(item, index) in formList"
                :label="stageData[item].label"
                :key="index"
              >
                <el-input
                  class="flex flex-1"
                  v-model="stageData[item].value"
                  :disabled="stageData[item].disable"
                />
                <span v-if="isMy" class="w-[50px] ml-4 cursor-pointer">
                  <div v-if="!stageData[item].disable" class="flex gap-2">
                    <img
                      class="w-6 h-6"
                      :src="ConfirmIocn"
                      alt=""
                      @click="upDateValue(item)"
                    />
                    <img
                      class="w-6 h-6"
                      :src="CancelIcon"
                      alt=""
                      @click="cancelValue(item)"
                    />
                  </div>
                  <div v-else>
                    <img
                      v-if="item !== 'vip' && item !== 'username'"
                      class="w-6 h-6"
                      :src="EditIcon"
                      alt=""
                      @click="editInput(item)"
                    />
                  </div>
                </span>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </div>
      <div>
        <span
          class="relative flex items-end gap-4 pb-2 text-2xl border-b-[1px] border-gray-600"
          >{{ "社群軟體" }}</span
        >
        <div class="social-media flex justify-between mt-2 mx-7 mb-16">
          <div
            v-for="(item, index) in actionList"
            class="action-item max-w-[560px] flex flex-col flex-wrap justify-center items-center cursor-pointer"
            :key="index"
            @click="actionFunctions(item, $event)"
          >
            <img
              class="action-img w-12 h-12"
              :src="item?.icon"
              alt="item.icon"
            />
            <span
              class="action-name mt-2 text-gray-950 text-xs font-normal text"
              >{{ item?.label }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 max-w-[336px] pr-2">
      <RecommendedVideos
        :videoList="recommendedVideos"
        :key="recommendedVideos.length + 'info'"
      />
    </div>
  </div>
</template>

<script setup>
import useSubsciption from "~/stores/subscriptions";
import { useUserStore } from "~/stores/users";
import useVideoStore from "~/stores/videos";
import useLoginStore from "~/stores/loginAndRegister";
import { EntityType } from "~/types/search";
import FBIcon from "~/assets/img/fb-icon.png";
import MSGIcon from "~/assets/img/msg-icon.png";
import IGIcon from "~/assets/img/ig-icon.png";
import XIcon from "~/assets/img/x-icon.png";
import WCIcon from "~/assets/img/wc-icon.png";
import SaveImgIcon from "~/assets/img/download-icon.png";
import CopyLinkIcon from "~/assets/img/copy-icon.png";
import ShareIcon from "~/assets/img/share-icon.png";
import EditIcon from "~/assets/img/edit-icon.png";
import ConfirmIocn from "~/assets/img/confirm-icon.png";
import CancelIcon from "~/assets/img/cancel-icon.png";
import { useNuxtApp } from "#app";
import { useRequestURL } from "#app";

const { t } = useI18n();
const route = useRoute();
const nuxtApp = useNuxtApp();
const useUser = useUserStore();
const loginStore = useLoginStore();
const videoStore = useVideoStore();
const subscribeStore = useSubsciption();

const username = computed(() => {
  return route.query.username;
});

const currentUrl = process.client
  ? window.location.origin
  : useRequestURL().origin;
const language = nuxtApp.$i18n.locale.value;
const userShareUrl = `${currentUrl}/${language}/info?username=${username.value}`;

const actionList = [
  {
    label: t("social_facebook"),
    icon: FBIcon,
    // link: "https://www.facebook.com/",
    link: `https://www.facebook.com/sharer/sharer.php?u=${userShareUrl}`,
  },
  {
    label: t("social_message"),
    icon: MSGIcon,
    // link: "https://www.messenger.com/",
    // link: `fb-messenger://share/?link=${encodeURIComponent(userShareUrl)}`,
    link: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
      userShareUrl
    )}&app_id=你的FB應用程式ID&redirect_uri=${encodeURIComponent(
      userShareUrl
    )}`,
  },
  {
    label: t("social_instagram"),
    icon: IGIcon,
    // link: "https://www.instagram.com/",
    copylink: true,
  },
  {
    label: t("social_x"),
    icon: XIcon,
    link: `https://x.com/share?url=${encodeURIComponent(userShareUrl)}`,
    // link: "https://x.com/"
  },
  {
    label: t("social_wechat"),
    icon: WCIcon,
    // link: "https://www.wechat.com/zh_HK/",
    copylink: true,
  },
  { label: t("link_copy"), icon: CopyLinkIcon, copylink: true },
  { label: t("photo_save"), icon: SaveImgIcon, saveImg: true },
  { label: t("share"), icon: ShareIcon, blank: true },
];

const tabValue = ref(1);
const underlineWidth = ref(0);
const underlinePosition = ref(0);

const stageData = reactive({
  username: { label: t("username"), value: "", disable: true },
  email: { label: t("email"), value: "", disable: true },
  description: { label: t("description"), value: "", disable: true },
  vip: { label: t("vip"), value: "1", disable: true },
});

const formList = ["username", "email", "description", "vip"];

const loginUser = computed(() => loginStore?.userInfo);

const userInfo = computed(() => loginStore.userInfo);
const userId = computed(() => userInfo.value.id);

const isMy = computed(() => {
  return loginUser.value?.username === username.value;
});

const isVideo = computed(() => tabValue.value === EntityType.VIDEO);

const userData = computed(() => {
  return (
    useUser.userList.find((user) => user.username === username.value) || {}
  );
});

const recommendedVideos = computed(() => {
  return videoStore.videoList?.filter((item) => item.recommended);
});

const videoList = computed(() => {
  return videoStore.videoList?.filter(
    (item) => item.username === username.value
  );
});

const isSubscribed = (targetId) => {
  return subscribeStore.isSubscribed(targetId);
};

const toggleSubscription = async (targetId) => {
  if (!loginStore.isAuthenticated) {
    loginStore.showDialog();
    return;
  }
  subscribeStore.toggleSubscription(userId.value, targetId);
};

const copyDetailLink = (e) => {
  e.stopPropagation();
  const language = nuxtApp.$i18n.locale.value;
  const url = `${window.location.origin}/${language}/info?username=${username.value}`;
  navigator.clipboard.writeText(url);
  ElMessage({
    type: "success",
    message: t("my_task_inv_link_copy_toast_done"),
    grouping: true,
  });
};

const actionFunctions = (item, e) => {
  e.stopPropagation();

  if (item.link) {
    window.open(item.link, "_blank", "noopener,noreferrer");
  }
  if (item.saveImg) {
    saveImg(e);
  }
  if (item.copylink) {
    copyDetailLink(e);
  }
  if (item.blank) {
    showExpertInfo();
  }
};

const updateUnderline = () => {
  nextTick(() => {
    const activeTab = document.querySelectorAll("span.cursor-pointer")[
      tabValue.value === EntityType.USER ? 1 : 2
    ];
    if (activeTab) {
      underlineWidth.value = activeTab.offsetWidth;
      underlinePosition.value = activeTab.offsetLeft;
    }
  });
};

const switchTab = (item) => {
  tabValue.value = item;
};

const editInput = (item) => {
  stageData[item].disable = false;
};

const upDateValue = async (item) => {
  try {
    await useUser.updateUser(username.value, {
      email: stageData.email.value,
      description: stageData.description.value,
    });
    console.log("成功更新用戶:", {
      email: stageData.email.value,
      description: stageData.description.value,
    });
  } catch (error) {
    console.error("更新用戶失敗:", error);
  }

  disableInput(item);
};

const cancelValue = (item) => {
  stageData[item].value = userData.value[item];
  disableInput(item);
};

const disableInput = (item) => {
  stageData[item].disable = true;
};

const initData = () => {
  Object.keys(stageData).forEach((key) => {
    if (key in userData.value) {
      Object.assign(stageData[key], { value: userData.value[key] });
    }
  });
};

watch(
  [userData, tabValue],
  () => {
    updateUnderline();
    initData();
  },
  { immediate: true }
);

watch(
  recommendedVideos.value,
  (newVal) => {
    console.log("推薦影片數據更新：", newVal);
  },
  { immediate: true }
);

onMounted(async () => {
  await useUser.getUsers();
  await videoStore.getVideo();
  await initData();
});
</script>

<style lang="scss" scoped></style>
