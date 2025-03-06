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
