<template>
  <div ref="searchRef" @click="openSearch" class="relative">
    <form @submit.prevent="search" class="relative w-[400px]">
      <input
        v-model="searchQuery"
        type="search"
        :placeholder="t('search')"
        class="pl-8 pr-2 py-1 w-full rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-300"
        @input="search"
      />
      <button
        type="submit"
        class="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
    <div
      v-if="isSearch"
      class="absolute w-[400px] h-[300px] mt-1 flex justify-center rounded-2xl bg-white text-purple-500"
    >
      <div
        v-if="emptyResults"
        class="results-empty justify-center items-center flex w-full h-full"
      >
        <p>{{ emptyResults }}</p>
      </div>
      <div v-if="searchResults.length > 0" class="results-container w-full">
        <div>{{ searchResults }}</div>
        <div
          v-for="item in searchResults"
          :key="item?.id"
          class="results-item flex flex-col w-full px-4 py-2 hover:bg-gray-100 rounded-xl cursor-pointer z-20"
          @click="goToDetail(item)"
        >
          <div class="flex text-lg font-bold">
            {{ item.title }}
          </div>
          <div class="flex">
            {{ item.description }}
          </div>
          <div>
            {{ item.id }}
          </div>
        </div>
      </div>
      <div
        v-if="searchResults.length === 0 && !emptyResults"
        class="justify-center items-center flex flex-col w-full h-full"
      >
        <img :src="Empty" alt="" class="w-40 h-40 mb-4" />
        <p>{{ t("no_search_results") }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { EntityType } from "~/types/search";
import { onClickOutside } from "@vueuse/core";
import { debounce } from "lodash-es";
import { useUserStore } from "~/stores/users";
import useVideoStore from "~/stores/videos";
import Empty from "~/assets/img/empty.jpeg";

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const videoStore = useVideoStore();
const searchRef = ref(null);
const isSearch = ref(false);
const selectValue = ref(EntityType.VIDEO);
const searchQuery = ref("");
const searchResults = ref([]);
const emptyResults = ref(t("search_cannot_be_empty"));

const openSearch = async () => {
  isSearch.value = true;
  videoStore.closeVideoPointer();
  await userStore.getUsers();
};
const goToDetail = (item) => {
  // e.stopPropagation();
  // router.push({
  //   name: "video",
  //   params: { id: e.id },
  // });
  router.push({ path: "/video", query: { id: item.id } });
};

const search = debounce(async () => {
  console.log("Searching for:", searchQuery.value);
  if (searchQuery.value.length === 0) {
    searchResults.value = [];
    emptyResults.value = t("search_cannot_be_empty");
    return;
  }
  if (searchQuery.value.length < 2) {
    searchResults.value = [];
    emptyResults.value = t("search_must_be_at_least_2_chars");
    return;
  }
  if (selectValue.value === EntityType.VIDEO) {
    emptyResults.value = "";
    await videoStore.getVideo();
    searchResults.value = videoStore.videoList;
    searchResults.value = searchResults.value.filter((video) =>
      video.title
        .toLowerCase()
        .includes(
          searchQuery.value.toLowerCase() ||
            video.description
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase())
        )
    );
  }
  if (selectValue.value === EntityType.USER) {
    emptyResults.value = "";
    await userStore.getUsers();
    searchResults.value = userStore.userList;
    searchResults.value = searchResults.value.filter((user) =>
      user.userName.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // 實現搜索邏輯
}, 300);

onClickOutside(searchRef, () => {
  isSearch.value = false;
  videoStore.openVideoPointer();
});
</script>

<style lang="scss" scoped>
::v-deep(input[type="search"]::-webkit-clear-button) {
  display: none;
  cursor: pointer;
}
input[type="search"]::-webkit-search-cancel-button {
  cursor: pointer;
}
</style>
