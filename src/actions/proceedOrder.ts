"use server";

import { FieldValues } from "react-hook-form";

export const proceedOrder = async (data: FieldValues, accessToken: string) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/orders/create-order`,
    // "http://localhost:5000/api/v1/orders/create-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );
  return await response.json();
};
