import { useSupabase } from "~/composables/supabase";
import { useUserStore } from "~/stores/users";

export default defineStore("suscriptions", () => {
  const supabase = useSupabase();
  const route = useRoute();
  const router = useRouter();
  const user = useUserStore();
  const users = ref(null);
  const videos = ref<any[]>([]);
  const subscriptions = ref(new Set());

  const fetchChannel = async () => {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", route.params.id)
      .single();
    users.value = data;
  };

  const fetchVideos = async () => {
    const { data } = await supabase
      .from("videos")
      .select("*")
      .eq("user_id", route.params.id);
    videos.value = data ? data : [];
  };

  const fetchSubscriptions = async (userId) => {
    // if (!user.value) return;
    const { data } = await supabase
      .from("subscriptions")
      .select("subscribed_to")
      .eq("subscriber_id", userId);
    subscriptions.value = new Set(data?.map((sub) => sub.subscribed_to) || []);
  };

  const toggleSubscription = async (userId, channelId: string) => {
    console.log(userId, "userId");

    if (!userId) return alert("請先登入");
    if (subscriptions.value.has(channelId)) {
      await supabase
        .from("subscriptions")
        .delete()
        .match({ subscriber_id: userId, subscribed_to: channelId });
      subscriptions.value.delete(channelId);
    } else {
      await supabase
        .from("subscriptions")
        .insert({ subscriber_id: userId, subscribed_to: channelId });
      subscriptions.value.add(channelId);
    }
  };

  const isSubscribed = (channelId: string) => {
    console.log(subscriptions.value, "subscriptions.value");
    console.log(
      subscriptions.value.has(channelId),
      "subscriptions.value.has(channelId)"
    );

    return subscriptions.value.has(channelId);
  };

  const goToVideo = (id: string) => {
    router.push(`/video/${id}`);
  };

  //   onMounted(() => {
  //     fetchChannel();
  //     fetchVideos();
  //   });

  return {
    // users,
    subscriptions,
    isSubscribed,
    toggleSubscription,
    fetchSubscriptions,
  };
});
