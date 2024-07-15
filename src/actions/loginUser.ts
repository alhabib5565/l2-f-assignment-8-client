"use server";

import { FieldValues } from "react-hook-form";

export const loginUser = async (data: FieldValues) => {
  const response = await fetch(`${process.env.SERVER_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};
