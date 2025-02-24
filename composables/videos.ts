export const goToDetail = (id: string | number) => {
  const router = useRouter();
  router.push({ path: "/video", query: { id } });
};
