<template>
  <!-- <Dialog v-model="show" :content="radioGroup" :submit-fuction="setLang" /> -->
  <Dialog v-model="show" :title="t('choose_language')">
    <template #content>
      <!-- <CarouselPart /> -->
      <div class="flex flex-col space-y-2">
        <label
          v-for="lang in langList"
          :key="lang.id"
          class="flex items-center space-x-2 cursor-pointer"
        >
          <input
            class="cursor-pointer"
            type="radio"
            v-model="selectedLang"
            :id="lang.id"
            name="language"
            :value="lang.id"
          />
          <span>{{ lang.name }}</span>
        </label>
      </div>
    </template>
    <template #footer>
      <div class="flex items-center space-x-4">
        <button
          @click="setLang(selectedLang)"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {{ t("confirm") }}
        </button>
        <button
          @click="show = false"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {{ t("cancel") }}
        </button>
      </div>
    </template>
  </Dialog>
</template>
<script setup>
const { t, setLocale } = useI18n();
const show = defineModel("show");

const langList = [
  { id: "en", name: "English" },
  { id: "zh", name: "中文" },
  { id: "vi", name: "Tiếng Việt" },
];

const selectedLang = ref("en");

const setLang = (lang) => {
  setLocale(lang);
  show.value = false; // 關閉彈窗
};

// const radioGroup = langList.map((lang) => {
//   return `
//     <div class="flex">
//       <input type='radio' id='${lang.id}' name='language' value='${lang.id}'></input>
//       <label for='${lang.id}'>${lang.name}</label>
//     </div>
//   `;
// });
// const setLang = (lang) => {
//   console.log(lang);
//   setLocale(lang);
// };
</script>

<!-- <div class="flex">
    <input type='radio' id='en' name='language' value='en'></input>
    <label for='en'>English</label>
    <input type='radio' id='zh' name='language' value='zh'></input>
    <label for='zh'>中文</label>
    </div>
`;
</script> -->
