<template>
  <div class="min-h-screen bg-white">
    <div class="fixed top-0 left-0 right-0 z-50 bg-white shadow">
      <AppHeaders />
    </div>
    <div class="pt-28 px-6">
      <NuxtPage />
    </div>
  </div>
  <LoginDialog v-model:show="isShowLogin" />
  <ChatRoom />
</template>

<script setup>
useHead({
  title: "影音網站",
  meta: [{ name: "description", content: "一個使用 Nuxt 3 開發的影音網站" }],
  link: [{ rel: "icon", type: "image/png", href: "/dvd-favicon.png" }],
});

import useLoginStore from "~/stores/loginAndRegister";

const loginStore = useLoginStore();

const isShowLogin = computed(() => loginStore.isShowDialog);

// watchEffect(() => {
//   isShowLogin.value = loginStore.isShowDialog;
// });
onMounted(() => {
  loginStore.checkAuth();
});
</script>
