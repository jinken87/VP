import { defineStore } from "pinia";

import { getVideoList } from "~/apis/videos";

import type { videos } from "./type";

export default defineStore("videos", () => {
  const videoPointerNone = ref(false);

  // 定義狀態
  const videoList = ref<videos[]>([]);

  const getVideo = async () => {
    console.log("videoList.value :>> ", videoList.value);
    videoList.value = await getVideoList();
  };

  const openVideoPointer = () => {
    videoPointerNone.value = false;
  };
  const closeVideoPointer = () => {
    videoPointerNone.value = true;
  };

  // 返回所有值和方法
  return {
    videoList,
    videoPointerNone,
    getVideo,
    openVideoPointer,
    closeVideoPointer,
  };
});
