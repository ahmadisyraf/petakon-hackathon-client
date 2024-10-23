import axios from "axios";
import { useSessionStore } from "@/store/user"; // Import the session store

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
});

apiClient.interceptors.request.use(
  (config) => {
    const { accessToken } = useSessionStore();
    if (accessToken) {
      config.headers.Authorization = "Bearer " + accessToken;

      console.log(accessToken);
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default apiClient;
