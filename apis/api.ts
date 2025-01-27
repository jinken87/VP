import axios from 'axios';

// 創建 Axios 實例
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/rest/v1`, // 替換為你的 Supabase Base URL
  headers: {
    apikey: import.meta.env.VITE_ANON_KEY, // 替換為你的 anon key
    // Authorization: `Bearer your-anon-key`, // 如果需要身份驗證
    'Content-Type': 'application/json', // 設置默認的 Content-Type
  },
});

// 錯誤攔截器
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error); // 讓錯誤可被捕捉
  }
);

export default apiClient;
