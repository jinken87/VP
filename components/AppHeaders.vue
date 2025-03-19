<template>
  <header class="bg-gray-100 shadow">
    <nav class="container mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center space-x-6">
        <!-- LOGO -->
        <NuxtLink :to="localePath('/')" class="text-xl font-bold text-rose-700">
          <MarqueePart />
        </NuxtLink>

        <!-- 導航連結 -->

        <NuxtLink
          :to="localePath('/')"
          class="text-gray-600 hover:text-rose-600 transition"
        >
          {{ t("home") }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/subscriptions')"
          class="text-gray-600 hover:text-rose-600 transition"
        >
          {{ t("subscribe") }}
        </NuxtLink>

        <!-- 語言切換 -->
        <span
          class="cursor-pointer text-gray-600 hover:text-rose-600 transition"
          @click="showSwitchLang"
        >
          {{ t("choose_language") }}
        </span>
        <!-- <div class="flex items-center">
          <MarqueePart />
        </div> -->
      </div>

      <!-- 搜索 & 登入按鈕 -->
      <div class="flex items-center space-x-6">
        <GlobalSearch />

        <div
          v-if="Object.keys(userInfo).length > 0"
          class="userinfo gap-2 flex p-2 items-center cursor-pointer"
          @click="goToUserInfo(userInfo?.username)"
        >
          <img
            class="w-12 h-12 rounded-full"
            :src="userInfo.thumbnail"
            alt="avatar"
          />
          <span class="text-2xl">{{ userInfo.username }}</span>
        </div>
        <!-- 登出按鈕 -->
        <button
          v-if="isAuthenticated"
          @click="logout"
          class="px-4 py-2 rounded bg-rose-600 text-white hover:bg-rose-700 transition"
        >
          {{ t("logout") }}
        </button>

        <!-- 登入按鈕 -->
        <button
          v-else
          @click="showDialog"
          class="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-700 transition"
        >
          {{ t("login") }}
        </button>
      </div>
    </nav>
  </header>

  <LangSwitch v-model:show="isSwitchLangShow" />
</template>

<script setup>
import useLoginStore from "~/stores/loginAndRegister";

const { t } = useI18n();
const localePath = useLocalePath();
const loginStore = useLoginStore();

const isSwitchLangShow = ref(false);

const isAuthenticated = computed(() => loginStore.isAuthenticated);
const userInfo = computed(() => loginStore.userInfo);

const showDialog = loginStore.showDialog;
const closeDialog = loginStore.closeDialog;
const logout = loginStore.logout;

const showSwitchLang = () => {
  isSwitchLangShow.value = !isSwitchLangShow.value;
};
</script>
