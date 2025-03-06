import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  // app: {
  //   head: {
  //     link: [
  //       { rel: "icon", type: "image/png", href: "/assets/img/dvd-icon.png" },
  //     ],
  //   },
  // },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["marquee"].includes(tag),
    },
  },
  css: ["@/assets/css/tailwind.css", "element-plus/dist/index.css"],
  plugins: ["~/plugins/dayjs.js", "~/plugins/element-plus.js"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },

  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    // "@pinia/nuxt",
    "@element-plus/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "definePiniaStore", "storeToRefs"],
      },
    ],
  ],
  build: {
    transpile: ["element-plus"],
  },
  i18n: {
    // vueI18n: "./i18n.config.ts",
    defaultLocale: "zh",
    locales: [
      { code: "en", iso: "en-US", name: "English", file: "en.json" },
      { code: "zh", iso: "zh-TW", name: "中文", file: "zh.json" },
      { code: "vi", iso: "vi-VN", name: "越南", file: "vi.json" },
    ],
    lazy: true,
    langDir: "locales/",
    strategy: "prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: true,
      fallbackLocale: "zh",
    },
  },
  // pwa: {
  //   manifest: {
  //     icons: [
  //       {
  //         src: '/icons/icon-192x192.png',
  //         sizes: '192x192',
  //         type: 'image/png'
  //       },
  //       {
  //         src: '/icons/icon-512x512.png',
  //         sizes: '512x512',
  //         type: 'image/png'
  //       }
  //     ]
  //   }
  // },
  vite: {},
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
});
