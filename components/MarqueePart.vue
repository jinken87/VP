<template>
  <!-- <marquee
    behavior="scroll"
    direction="right"
    scrollamount="5"
    scrolldelay="50"
  >
    ' Ken影音網站～～～～～～!!!!!!!!!!!!!'</marquee
  > -->
  <marquee
    class="bg-gray-200 border border-gray-200 rounded-lg shadow-lg"
    direction="down"
    width="80"
    height="60"
    behavior="alternate"
    scrollamount="2"
    scrolldelay="50"
  >
    <marquee behavior="alternate">
      <!-- This text will bounce -->
      <img class="w-10 h-10" :src="Dvd" alt="" />
    </marquee>
  </marquee>
</template>
<script setup>
import Dvd from "~/assets/img/dvd-icon.png";
</script>
