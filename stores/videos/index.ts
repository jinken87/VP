
import { defineStore } from 'pinia'

import {getVideoList} from "~/apis/videos";

import type {videos} from './type'

export default defineStore('videos', () => {
  // 定義狀態
  const videoList=ref<videos[]>([])

  const getVideo = async () =>{
    console.log('videoList.value :>> ', videoList.value);
    videoList.value = await getVideoList();
  }


  // 返回所有值和方法
  return { 
    videoList,  getVideo 
  }
})