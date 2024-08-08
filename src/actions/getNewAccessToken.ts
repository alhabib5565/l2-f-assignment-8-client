import { axiosInstance } from "@/helper/axiosInstance";

export const getNewAccessToken = async () => {
  return axiosInstance({
    baseURL:
      // "https://cleaning-supplies-store-server-indol.vercel.app/api/v1/auth/refresh-toekn",
      "http://localhost:5000/api/v1/auth/refresh-toekn",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
