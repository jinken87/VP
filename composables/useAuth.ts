import { useSupabase } from "@/composables/supabase";
import bcrypt from "bcryptjs";

const supabase = useSupabase();

// 註冊用戶（密碼加密後存入資料庫）
export const registerUser = async (
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
export const loginUser = async (email: string, password: string) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) throw new Error("帳號不存在");

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) throw new Error("密碼錯誤");

  return user; // 登入成功
};

// 登出（刪除 localStorage）
export const logoutUser = () => {
  localStorage.removeItem("user");
  window.location.reload();
};
