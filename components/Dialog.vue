<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-bold">
            {{ props.title }}
          </h2>
          <img
            :src="IconClose"
            alt="Close"
            class="w-6 h-6 cursor-pointer"
            @click="closeDialog"
          />
        </div>
        <div class="mt-4 text-gray-700">
          <slot name="content"></slot>
        </div>
        <div class="mt-4 text-gray-700">
          <slot name="footer"></slot>
        </div>
        <div
          v-if="!hasSlot('content')"
          class="mt-4 text-gray-700"
          v-html="props.content"
        ></div>
        <div v-if="!hasSlot('footer')" class="mt-4 flex justify-end space-x-2">
          <button class="px-4 py-2 bg-gray-300 rounded" @click="closeDialog">
            {{ props.cancelText }}
          </button>
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded"
            @click="submit"
          >
            {{ props.confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import IconClose from "~/assets/img/close-icon.png";
const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  content: {
    type: String,
    default:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui consequatur laborum incidunt aspernatur illo tempore maiores necessitatibus excepturi facere, nisi, iusto quisquam officiis quidem fuga voluptates inventore repellendus eaque ut",
  },
  confirmText: {
    type: String,
    default: "OK",
  },
  cancelText: {
    type: String,
    default: "NO WAY",
  },
});
const modelValue = defineModel();

const slots = useSlots(); // 用來檢查 slot 是否存在

// 判斷 slot 是否存在
const hasSlot = (name) => !!slots[name];

const closeDialog = () => {
  modelValue.value = false;
};
</script>
