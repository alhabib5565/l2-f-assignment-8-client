"use server";

import { TAddReviewData } from "@/type";
import { revalidateTag } from "next/cache";

export const createProductFeedback = async (
  data: TAddReviewData,
  accessToken: string
) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/feedbacks/create-feedback`,
    // "http://localhost:5000/api/v1/feedbacks/create-feedback",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(data),
    }
  );
  revalidateTag("productDetails");
  return await response.json();
};
