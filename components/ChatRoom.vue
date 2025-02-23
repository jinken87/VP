<template>
  <div v-if="!isTalking" class="chat-close fixed bottom-0 right-0">
    <img
      class="w-40 h-40 cursor-pointer"
      :src="Chat"
      alt=""
      @click="isTalking = true"
    />
  </div>
  <div
    v-else
    class="chat-container fixed bottom-8 right-8 w-[400px] h-[800px] rounded-3xl bg-white shadow-2xl"
  >
    <div
      class="relative h-14 bg-[rgb(239,204,227)] rounded-t-3xl rounede-r-3xl"
    >
      <img class="absolute top-[-52px] left-2 w-28 h-28" :src="Chat" alt="" />
      <div class="w-full h-14 px-4 flex items-center">
        <span class="ml-20 flex-1 text-center">聊天室</span>
        <img
          class="h-8 w-8 cursor-pointer"
          :src="Close"
          alt=""
          @click="isTalking = false"
        />
      </div>
      <!-- <span class="absolute top-2 left-14 text-2xl font-bold">聊天室</span> -->
    </div>

    <div class="chat-messages">
      <div
        v-for="msg in useChat.messageData"
        :key="msg.id"
        class="chat-message"
      >
        <span class="char-name">{{ msg.username }}</span>
        <!-- <span class="chat-user">{{ msg.sender_id }}</span> -->
        <span v-if="msg.type === 'text'" class="chat-text">{{
          msg.content
        }}</span>
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
    <div class="chat-input">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="輸入訊息..."
      />
      <button @click="sendMessage">發送</button>
    </div>
  </div>
</template>

<script setup>
import useChatStore from "~/stores/chat";
import { useUserStore } from "~/stores/users";
import useLoginStore from "~/stores/loginAndRegister";
import Chat from "~/assets/img/chat.png";
import Close from "~/assets/img/close-icon.png";

const loginStore = useLoginStore();
const useChat = useChatStore();
const useUser = useUserStore();

const isTalking = ref(false);
const newMessage = ref("");

const userInfo = computed(() => loginStore.userInfo);

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  console.log(useUser, "useUser");
  console.log(userInfo.value, "loginStore.id,");

  await useChat.sendMessage(
    userInfo.value.id,
    userInfo.value.username,
    newMessage.value
  );
  newMessage.value = "";
  //   useChat.getMessages();
};

onMounted(() => {
  useChat.getMessages();
  useChat.getUnreadMessages(new Date().toISOString());
});
</script>
