"use server";

import { FieldValues } from "react-hook-form";

export const registerUser = async (data: FieldValues) => {
  console.log(data, "register data");
  const response = await fetch(`${process.env.SERVER_URL}/auth/create-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  const res = await response.json();
  console.log(res, "........");
  return res;
};
