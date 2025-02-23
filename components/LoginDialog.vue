<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-8 rounded-lg w-96">
      <h2 class="text-2xl font-bold mb-4">登入</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="username" class="block mb-2">用戶名</label>
          <input
            v-model="username"
            id="username"
            type="text"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="username" class="block mb-2">信箱</label>
          <input
            v-model="email"
            id="username"
            type="text"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-2">密碼</label>
          <input
            v-model="password"
            id="password"
            type="password"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          登入
        </button>
      </form>
      <button
        @click="closeDialog"
        class="mt-4 text-gray-600 hover:text-gray-800"
      >
        關閉
      </button>
      <p>{{ loginStore.isShowDialog }}</p>
      <span class="cursor-pointer" @click="handleRegister">註冊</span>
    </div>
  </div>
</template>

<script setup>
import useLoginStore from "~/stores/loginAndRegister";

const loginStore = useLoginStore();
const closeDialog = loginStore.closeDialog;

const username = ref("");
const email = ref("");
const password = ref("");

const emit = defineEmits(["close", "login"]);

const validator = () => {
  if (
    username.value.length <= 1 ||
    email.value.length <= 1 ||
    password.value.length <= 1
  ) {
    return false;
  }
  return true;
};

const handleLogin = async () => {
  if (!validator()) return alert("2");

  //   loginStore.login(email.value, password.value);
  try {
    const user = await loginStore.login(email.value, password.value);
    localStorage.setItem("user", JSON.stringify(user)); // 儲存用戶資訊
    await loginStore.checkAuth();
    alert("登入成功！");
    loginStore.closeDialog();
  } catch (err) {
    alert(err.message);
  }
  // 這裡應該實現實際的登入邏輯
  //   emit("login", username.value);
};
const handleRegister = async () => {
  if (!validator()) return alert("2");
  //   loginStore.register(email.value, password.value, username.value);
  try {
    await loginStore.register(email.value, password.value, username.value);
    alert("註冊成功，請登入");
    loginStore.closeDialog();
  } catch (err) {
    alert(err.message);
  }
};
</script>
