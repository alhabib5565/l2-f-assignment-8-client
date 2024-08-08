"use server";

import { store } from "@/redux/store";
import { TAddReviewData } from "@/type";
import { revalidateTag } from "next/cache";

export const addReview = async (data: TAddReviewData) => {
  const accessToken = store.getState()?.auth?.token;

  const response = await fetch(
    `${process.env.SERVER_URL}/feedbacks/create-feedback`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      body: JSON.stringify(data),
    }
  );
  revalidateTag("reviews");
  return await response.json();
};
