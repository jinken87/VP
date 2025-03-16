<template>
  <Dialog v-model="show" :title="loginOrRegisterText">
    <template #content>
      <div class="bg-white rounded-lg">
        <h2 class="text-2xl font-bold mb-4">{{ t("login") }}</h2>
        <form @submit.prevent="handleConfirm">
          <div class="mb-4">
            <label for="username" class="block mb-2">{{ t("username") }}</label>
            <input
              v-model="username"
              id="username"
              type="text"
              class="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div v-if="isRegister" class="mb-4">
            <label for="username" class="block mb-2">{{ t("email") }}</label>
            <div class="flex gap-2 mb-4">
              <span
                class="p-1 border border-gray-200 bg-gray-200 rounded-lg shadow-md hover:bg-gray-500 cursor-pointer"
                @click="quickyEmail('@gmail.com')"
                >{{ "@gmail.com" }}</span
              >
              <span
                class="p-1 border border-gray-200 bg-gray-200 rounded-lg shadow-md hover:bg-gray-500 cursor-pointer"
                @click="quickyEmail('@mail')"
                >{{ "@mail" }}</span
              >
              <span
                class="p-1 border border-gray-200 bg-gray-200 rounded-lg shadow-md hover:bg-gray-500 cursor-pointer"
                @click="quickyEmail('@yahoo.com.tw')"
                >{{ "@yahoo.com.tw" }}</span
              >
            </div>
            <input
              v-model="email"
              id="username"
              type="text"
              class="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block mb-2">{{ t("password") }}</label>
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
            {{ loginOrRegisterText }}
          </button>
        </form>
      </div>
    </template>
    <template #footer>
      <el-divider>
        <span
          class="flex flex-auto text-center text-gray-500 cursor-pointer"
          @click="switchLoginOrRegister"
        >
          {{ isRegister ? t("hasAccount") : t("noAccount") }}</span
        >
      </el-divider>
    </template>
  </Dialog>
</template>

<script setup>
import useLoginStore from "~/stores/loginAndRegister";

const emit = defineEmits(["close", "login"]);
const { t } = useI18n();

const loginStore = useLoginStore();

const loginOrRegisterText = computed(() => {
  if (isRegister.value) return t("register");
  return t("login");
});

const isRegister = ref(false);
const username = ref("");
const email = ref("");
const password = ref("");

const show = computed({
  get: () => loginStore.isShowDialog,
  set: (val) => {
    if (!val) loginStore.closeDialog();
  },
});

const quickyEmail = (item) => {
  if (email.value.includes(item)) return;
  const split = email.value.split("@") || [];
  email.value = `${split.length > 0 ? split[0] : email.value}${item}`;
};

const validator = () => {
  if (
    username.value.length < 1 ||
    (isRegister.value && email.value.length < 1) ||
    password.value.length < 1
  ) {
    return false;
  }
  return true;
};

const switchLoginOrRegister = () => {
  isRegister.value = !isRegister.value;
  username.value = "";
  email.value = "";
  password.value = "";
};

const handleLogin = async () => {
  if (!validator()) {
    return ElMessage({
      showClose: true,
      message: t("username_email_or_password_cannot_be_empty"),
      type: "warning",
    });
  }

  try {
    const user = await loginStore.login(username.value, password.value);
    localStorage.setItem("user", JSON.stringify(user)); // 儲存用戶資訊
    await loginStore.checkAuth();
    ElMessage({
      showClose: true,
      message: t("login_success"),
      type: "success",
    });
    loginStore.closeDialog();
  } catch (err) {
    return ElMessage({
      showClose: true,
      message: err.message,
      type: "error",
    });
  }
};
const handleRegister = async () => {
  if (!validator()) {
    return ElMessage({
      showClose: true,
      message: t("username_email_or_password_cannot_be_empty"),
      type: "warning",
    });
  }
  try {
    await loginStore.register(email.value, password.value, username.value);
    ElMessage({
      showClose: true,
      message: t("register_success_please_login"),
      type: "success",
    });
    loginStore.closeDialog();
  } catch (err) {
    return ElMessage({
      showClose: true,
      message: err.message,
      type: "error",
    });
  }
};

const handleConfirm = async () => {
  if (isRegister.value) {
    await handleRegister();
  } else {
    await handleLogin();
  }
};
</script>
