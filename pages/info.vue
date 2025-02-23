<template>
  <div>
    <!-- <p @click="showLoginModal">123</p> -->
    <p>{{ userList }}</p>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/users";

import useLoginStore from "~/stores/loginAndRegister";

// const loginStore = useLoginStore();

// const router = useRouter();
const route = useRoute();
const useUser = useUserStore();

const userName = computed(() => {
  return route.query.name;
});

const userList = computed(() => {
  return useUser.userList.filter((user) => user.name == userName.value);
});

// const showLoginModal = loginStore.showLogin;

onMounted(async () => {
  await useUser.getUsers();
  console.log("用戶列表:", userList.value);
});
</script>
