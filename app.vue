<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <AppHeaders />
    <NuxtPage />
  </div>
</template>

<script setup>
useHead({
  title: '影音網站',
  meta: [{ name: 'description', content: '一個使用 Nuxt 3 開發的影音網站' }],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
});
</script>
