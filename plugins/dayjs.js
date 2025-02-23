// import dayjs from "dayjs"; // 使用 * as 來確保正確導入
// import "dayjs/locale/zh-cn";
// import relativeTime from "dayjs/plugin/relativeTime";

// dayjs.default.extend(relativeTime); // 確保使用正確的 dayjs 導出
// dayjs.default.locale("zh-cn");

// export default defineNuxtPlugin(() => {
//   return {
//     provide: {
//       dayjs: dayjs.default || dayjs, // 兼容不同的 dayjs 導出方式
//     },
//   };
// });

// plugins/dayjs.ts
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";
import "dayjs/locale/vi";
import "dayjs/locale/zh-tw";
import relativeTime from "dayjs/plugin/relativeTime";

const dayjsInstance = dayjs.default || dayjs;
dayjsInstance.extend(relativeTime);

// export default defineNuxtPlugin((nuxtApp) => {
//   const { locale } = useI18n();
//   dayjs.locale(locale.value);

//   nuxtApp.hook("i18n:localeSwitched", (newLocale) => {
//     dayjs.locale(newLocale);
//   });
//   nuxtApp.provide("dayjs", dayjs);
// });

export default defineNuxtPlugin((nuxtApp) => {
  console.log("Dayjs plugin initialized"); // 添加調試日誌
  // 获取 i18n 实例
  const i18n = nuxtApp.$i18n;

  const localeMap = {
    // "zh-cn": "zh-tw",
    // "zh-tw": "zh-tw",
    zh: "zh-tw",
    en: "en",
    vi: "vi",
  };
  console.log("0000000", i18n);

  // 设置初始语言
  const currentLocale = localeMap[i18n.locale.value] || "zh-tw";
  console.log("Initial locale:", currentLocale); // 添加調試日誌
  dayjsInstance.locale(currentLocale);

  // 监听语言切换
  // nuxtApp.hook("i18n:localeSwitched", (newLocale) => {
  //   const mapped = localeMap[newLocale] ? localeMap[newLocale] : "zh-tw";
  //   console.log("Language switched:", newLocale, "-> mapped to:", mapped); // 添加調試日誌
  //   dayjsInstance.locale(mapped);
  // });
  nuxtApp.hook("i18n:localeSwitched", (event) => {
    // 从事件对象中获取新的语言代码
    const newLocale = typeof event === "object" ? event.newLocale : event;
    const mapped = localeMap[newLocale] || "zh-tw";

    console.log(`Language switching from ${i18n.locale.value} to ${newLocale}`);
    console.log(`Dayjs locale mapped to: ${mapped}`);

    dayjsInstance.locale(mapped);
  });

  // 提供 dayjs 实例
  return {
    provide: {
      dayjs: dayjsInstance,
    },
  };
});
