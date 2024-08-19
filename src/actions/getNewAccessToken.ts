import { axiosInstance } from "@/helper/axiosInstance";

export const getNewAccessToken = async () => {
  try {
    const response = await axiosInstance({
      url: "https://cleaning-supplies-store-server-indol.vercel.app/api/v1/auth/refresh-toekn",
      // Adjusted endpoint URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    // Handle the error appropriately
    console.error("Error getting new access token:", error);
    throw error;
  }
};
