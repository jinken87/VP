import apiClient from "~/apis/api";
// import type {videos} from '../videos/type'

interface videos {
  id: string;
  name: string;
  description: string;
  url: string;
  thumbnail: string;
  category: string;
  tags: string;
  created_at: number;
}
export const getVideoList = async (): Promise<videos[]> => {
  try {
    const response = await apiClient.get("/videos");

    return response?.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// export const getVideoList = async (): Promise<videos[]> => {
//     const response = await apiClient.get('/videos');
//     return response.data as videos[];
//   };
