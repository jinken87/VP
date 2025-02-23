/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./pages/**/*.{vue,js,ts,jsx,tsx}", // Nuxt 頁面文件
    "./components/**/*.{vue,js,ts,jsx,tsx}", // Nuxt 組件文件
    "./app.vue", // Nuxt 主入口文件
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
