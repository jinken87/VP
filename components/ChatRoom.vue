<template>
  <div v-if="!isTalking" class="chat-close fixed bottom-2 right-2">
    <img
      class="w-40 h-40 rounded-full shadow cursor-pointer"
      :src="Chat"
      alt=""
      @click="isTalking = true"
    />
  </div>
  <div
    v-else
    class="chat-container fixed bottom-8 right-8 w-[400px] h-[720px] rounded-3xl bg-white shadow-2xl"
  >
    <div
      class="relative h-14 bg-[rgb(239,204,227)] rounded-t-3xl rounede-r-3xl"
    >
      <img class="absolute top-[-52px] left-2 w-28 h-28" :src="Chat" alt="" />
      <div class="w-full h-14 px-4 flex items-center">
        <span class="ml-20 flex-1 text-center">{{ t("chatroom") }}</span>
        <img
          class="h-8 w-8 cursor-pointer"
          :src="Close"
          alt=""
          @click="isTalking = false"
        />
      </div>
    </div>

    <div
      ref="chatContainer"
      class="chat-messages px-2 h-[600px] border-b-2 border-gray-300 overflow-auto scrollbar-no-track"
      @scroll="handleScroll"
    >
      <div
        v-for="msg in useChat.messageData"
        :key="msg.id"
        class="chat-message gap-1 flex items-center p-1"
      >
        <div>
          <img
            :src="msg.thumbnail"
            alt=""
            class="chat-avatar h-12 w-12 rounded-full"
          />
        </div>
        <span class="char-name text-lg text-gray-600">{{
          `${msg.username} : `
        }}</span>
        <!-- <span class="chat-user">{{ msg.sender_id }}</span> -->
        <span
          v-if="msg.type === 'text'"
          class="chat-text text-base text-gray-500"
          >{{ msg.content }}</span
        >
        <img
          v-else-if="msg.type === 'image'"
          :src="getImageUrl(msg.content)"
          class="chat-image"
        />
        <video v-else-if="msg.type === 'video'" controls class="chat-video">
          <source :src="getImageUrl(msg.content)" type="video/mp4" />
        </video>
      </div>
    </div>
    <div
      class="chat-input h-12 m-2 flex items-center border-2 border-gray-200 bg-gray-200 rounded-3xl"
    >
      <input
        v-model="newMessage"
        class="flex-1 rounded-3xl pl-4 bg-gray-200 focus:outline-none focus:border-transparent"
        @keyup.enter="sendMessage"
        placeholder="輸入訊息..."
      />
      <img
        class="pr-4 w-12 h-8 cursor-pointer"
        :src="Send"
        alt=""
        @click="sendMessage"
      />
    </div>
    <div
      v-if="showScrollButton"
      class="absolute gap-2 flex justify-center items-center w-40 px-2 top-20 left-1/2 bg-orange-100 border border-gray-100 rounded-full -translate-x-1/2 shadow hover:bg-[rgb(239,204,227)] cursor-pointer transition-all duration-300 ease-in-out"
    >
      <span class="cursor-pointer" @click="toMessageBottom">滾到底部</span>
      <img class="w-4 h-4 cursor-pointer" :src="Down" alt="" />
    </div>
  </div>
</template>

<script setup>
import useChatStore from "~/stores/chat";
import { useUserStore } from "~/stores/users";
import useLoginStore from "~/stores/loginAndRegister";
import Chat from "~/assets/img/chat.png";
import Close from "~/assets/img/close-icon.png";
import Send from "~/assets/img/send-icon.png";
import Down from "~/assets/img/down-icon.png";

const { t } = useI18n();
const loginStore = useLoginStore();
const useChat = useChatStore();
const useUser = useUserStore();

const chatContainer = ref(null);
const isTalking = ref(false);
const newMessage = ref("");
const showScrollButton = ref(false);

const userInfo = computed(() => loginStore.userInfo);

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  console.log(useUser, "useUser");
  console.log(userInfo.value, "loginStore.id,");

  await useChat.sendMessage(
    userInfo.value.id,
    userInfo.value.username,
    newMessage.value,
    userInfo.value.thumbnail
  );
  newMessage.value = "";
  toMessageBottom();

  //   useChat.getMessages();
};

const handleScroll = () => {
  if (chatContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = chatContainer.value;
    // 如果 scrollTop 小於最大滾動值（加上容差）就顯示按鈕
    showScrollButton.value = scrollTop < scrollHeight - clientHeight - 100;
  }
};

const toMessageBottom = () => {
  setTimeout(() => {
    chatContainer.value.scrollTo({
      top: chatContainer.value.scrollHeight,
      behavior: "smooth",
    });
  }, 100);
};
onMounted(() => {
  useChat.getMessages();
  useChat.getUnreadMessages(new Date().toISOString());
});
</script>
