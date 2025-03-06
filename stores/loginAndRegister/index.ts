import { defineStore } from "pinia";
// import { getVideoList } from "~/apis/videos";
// import type {videos} from './type'
import { useSupabase } from "~/composables/supabase";
import bcrypt from "bcryptjs";

export default defineStore("login", () => {
  const supabase = useSupabase();

  // const isShowLogin = ref(false);
  const isShowRegister = ref(false);
  const isShowDialog = ref(false);

  const userInfo = ref({});

  const isAuthenticated = computed(() => {
    // !!userInfo.value
    console.log(
      "Objcet.keys(userInfo.value) :>> ",
      Object.keys(userInfo.value)
    );
    return Object.keys(userInfo.value).length > 0;
  });

  const showDialog = () => {
    isShowDialog.value = true;
  };
  const closeDialog = () => {
    isShowDialog.value = false;
  };

  // const showLogin = () => {
  //   isShowLogin.value = true;
  // };
  // const showRegister = () => {
  //   isShowLogin.value = true;
  // };

  // ✅ 讀取 localStorage 來檢查是否登入
  const checkAuth = () => {
    console.log("before");
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("storedUser", storedUser);
      userInfo.value = JSON.parse(storedUser);
    } else {
      console.log("else", userInfo.value);
      console.log("why", isAuthenticated.value);
      userInfo.value = {};
    }
  };

  // 註冊用戶（密碼加密後存入資料庫）
  const register = async (
    email: string,
    password: string,
    username: string
  ) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase.from("users").insert({
      email,
      password_hash: hashedPassword,
      username,
    });

    if (error) throw new Error(error.message);
    return { email, username };
  };

  // 登入用戶（檢查密碼）
  const login = async (username: string, password: string) => {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      // .eq("email", email)
      .single();

    if (error || !user) throw new Error("帳號不存在");

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) throw new Error("密碼錯誤");

    await checkAuth();

    return user; // 登入成功
  };

  // 登出（刪除 localStorage）
  const logout = async () => {
    localStorage.removeItem("user");
    await checkAuth();
    // window.location.reload();
  };

  // 返回所有值和方法
  return {
    userInfo,
    isAuthenticated,
    isShowDialog,
    // isShowLogin,
    isShowRegister,
    // showLogin,
    showDialog,
    checkAuth,
    closeDialog,
    // showRegister,
    register,
    login,
    logout,
  };
});
