<template>
  <header class="bg-gray-100 shadow">
    <nav class="container mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center space-x-6">
        <!-- LOGO -->
        <NuxtLink to="/" class="text-xl font-bold text-rose-700">
          影音網站
        </NuxtLink>

        <!-- 導航連結 -->

        <!-- <NuxtLink to="/" class="text-gray-600 hover:text-rose-600 transition">
          首頁
        </NuxtLink> -->

        <NuxtLink
          :to="localePath('/video?id=5')"
          class="text-gray-600 hover:text-rose-600 transition"
        >
          熱門
        </NuxtLink>
        <NuxtLink
          :to="localePath('/subscriptions')"
          class="text-gray-600 hover:text-rose-600 transition"
        >
          訂閱
        </NuxtLink>

        <!-- 語言切換 -->
        <span
          class="cursor-pointer text-gray-600 hover:text-rose-600 transition"
          @click="showSwitchLang"
        >
          {{ t("choose_language") }}
        </span>
      </div>

      <!-- 搜索 & 登入按鈕 -->
      <div class="flex items-center space-x-6">
        <GlobalSearch />

        <!-- 登出按鈕 -->
        <button
          v-if="isAuthenticated"
          @click="logout2"
          class="px-4 py-2 rounded bg-rose-600 text-white hover:bg-rose-700 transition"
        >
          登出
        </button>

        <!-- 登入按鈕 -->
        <button
          v-else
          @click="showDialog"
          class="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-700 transition"
        >
          登入
        </button>
      </div>
    </nav>
  </header>

  <LangSwitch v-model:show="abc" />
</template>

<script setup>
const localePath = useLocalePath();
import useLoginStore from "~/stores/loginAndRegister";
const { t } = useI18n();

const loginStore = useLoginStore();

const isAuthenticated = computed(() => loginStore.isAuthenticated);

const showDialog = loginStore.showDialog;
const closeDialog = loginStore.closeDialog;
const logout2 = loginStore.logout;

const abc = ref(false);
const showSwitchLang = () => {
  abc.value = !abc.value;
};
</script>
