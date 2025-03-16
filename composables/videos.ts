export const goToDetail = (id: string | number) => {
  const router = useRouter();
  const localePath = useLocalePath();

  router.push(localePath({ path: "/video", query: { id } }));
};

export const goToUserInfo = (username: string) => {
  const router = useRouter();
  const localePath = useLocalePath();

  router.push(localePath({ path: "/info", query: { username } }));
};

export const getPassTime = (inputDate: string | number) => {
  const { $dayjs } = useNuxtApp(); // 使用 useNuxtApp 获取 $dayjs
  return $dayjs(inputDate).fromNow();
};
