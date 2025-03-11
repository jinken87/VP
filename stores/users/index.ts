import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Users } from "./type";

import { supabase } from "../../supabase";

async function fetchUsers() {
  const { data, error } = await supabase
    .from("users") // 替換為你的資料表名稱
    .select("*"); // 取得所有欄位

  if (error) {
    console.error("Error fetching users:", error);
  } else {
    console.log("Users:", data);
    return data;
  }
}

// fetchUsers();

export const useUserStore = defineStore("users", () => {
  // 定義狀態
  const count = ref(0);
  const userList = ref<Users[]>([]);

  // 定義計算屬性
  const doubleCount = computed(() => count.value * 2);

  const getUsers = async () => {
    userList.value = (await fetchUsers()) || [];
  };

  const updateUser = async (username: string, updateFields: Partial<Users>) => {
    const { data, error } = await supabase
      .from("users")
      .update(updateFields)
      .eq("username", username)
      .select();

    if (error) {
      console.error("Supabase 更新失敗:", error);
      throw error;
    }

    if (data && data.length > 0) {
      const updatedUser = data[0];
      const index = userList.value.findIndex(
        (user) => user.username === username
      );
      if (index !== -1) {
        userList.value[index] = updatedUser;
      }
      return updatedUser;
    }
  };

  // 定義操作行為
  const increment = () => {
    count.value++;
  };

  const decrement = () => {
    count.value--;
  };

  // 返回所有值和方法
  return {
    userList,
    count,
    doubleCount,
    increment,
    decrement,
    getUsers,
    updateUser,
  };
});
