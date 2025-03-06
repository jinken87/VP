<!-- <template>
  <Carousel autoplay :interval="3000">
    <img src="https://picsum.photos/id/234/200/200" alt="圖片1" />
    <img src="https://picsum.photos/id/235/200/200" alt="圖片2" />
    <img src="https://picsum.photos/id/236/200/200" alt="圖片3" />
  </Carousel>
  <Elcarousel class="flex" autoplay :interval="3000" height="200px" motion-blur>
    <el-carousel-item v-for="item in 4" :key="item">
      <h3 class="small justify-center" text="2xl">{{ item }}</h3>
    </el-carousel-item>
  </Elcarousel>
  
</template> -->
<template>
  <ElCarousel autoplay :interval="3000" height="200px" motion-blur>
    <ElCarouselItem v-for="item in props.videoList" :key="item">
      <slot name="item"> </slot>

      <!-- <h3 style="font-size: 2rem; text-align: center">{{ item }}</h3> -->
      <img
        :src="`https://picsum.photos/id/${230 + item}/200/200`"
        alt="圖片1"
      />
    </ElCarouselItem>
  </ElCarousel>
</template>

<script setup>
const props = defineProps({
  videoList: {
    type: Array,
    default: () => [],
  },
});
</script>
