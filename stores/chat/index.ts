import { defineStore } from "pinia";

import { useSupabase } from "~/composables/supabase";

export default defineStore("chat", () => {
  const supabase = useSupabase();
  const messageData = ref<any[]>([]);

  //   const lastReadTime = new Date().toISOString();
  const unReadCount = ref(0);

  // 監聽 messages 表的變更
  supabase
    .channel("chatroom")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        messageData.value.push(payload.new);
      }
    )
    .subscribe((status) => {
      if (status) {
        console.log("status", status);
      }
    });

  const sendMessage = async (
    userId: string,
    username: string,
    content: string,
    thumbnail: string,
    type = "text"
  ) => {
    await supabase.from("messages").insert([
      {
        // sender_id: user.id, // 當前用戶 ID
        sender_id: userId,
        username,
        content,
        thumbnail: thumbnail,
        type,
      },
    ]);
  };

  const uploadFile = async (userId: string, file: File) => {
    const { data, error } = await supabase.storage
      .from("chat-media")
      .upload(`messages/${file.name}`, file);

    if (data) {
      await sendMessage(userId, data.path, "image"); // 這裡用 'image' 或 'video'
    }
  };

  const getMessages = async () => {
    const { data: messages } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true });

    messageData.value = messages || [];
  };

  const getUnreadMessages = async (lastReadTime: string) => {
    const { count } = await supabase
      .from("messages")
      .select("*", { count: "exact" })
      .gt("created_at", lastReadTime); // lastReadTime 最後讀取的時間

    unReadCount.value = count || 0;
  };

  return {
    messageData,
    unReadCount,
    getMessages,
    sendMessage,
    uploadFile,
    getUnreadMessages,
  };
});
