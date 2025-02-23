// import { storeToRefs } from "pinia";
// import { defineI18nConfig } from '@nuxtjs/i18n';
import { defineNuxtConfig } from "nuxt/config";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "@/assets/css/tailwind.css", // 添加 Tailwind 的 CSS 文件路徑
    "element-plus/dist/index.css",
  ],
  plugins: ["~/plugins/dayjs.js"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devServer: {
    // host: "192.168.3.247",
    host: "0.0.0.0",
    port: 3000,
  },

  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    // "@pinia/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "definePiniaStore", "storeToRefs"],
      },
    ],
  ],
  build: {
    transpile: ["element-plus", "dayjs"],
  },
  i18n: {
    // vueI18n: "./i18n.config.ts",
    defaultLocale: "zh",
    locales: [
      { code: "en", iso: "en-US", name: "English", file: "en.json" },
      { code: "zh", iso: "zh-TW", name: "中文", file: "zh.json" },
      { code: "vi", iso: "vi-VN", name: "越南", file: "vi.json" },
    ],
    lazy: true, // 懶加載語言檔案，減少初始載入大小
    langDir: "locales/", // 指定語言檔案所在的資料夾
    strategy: "prefix",
    // strategy: "prefix_and_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: true,
      fallbackLocale: "zh",
      // redirectOn: "root",
    },
  },
  vite: {
    resolve: {
      alias: {
        dayjs: "dayjs/esm",
      },
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
});
