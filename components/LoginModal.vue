<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-8 rounded-lg w-96">
      <h2 class="text-2xl font-bold mb-4">{{ t("login") }}</h2>
      <form @submit.prevent="handleLogin">
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
          {{ t("login") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const username = ref("");
const password = ref("");

const emit = defineEmits(["close", "login"]);
const { t } = useI18n();

const handleLogin = () => {
  // 這裡應該實現實際的登入邏輯
  emit("login", username.value);
};
</script>
