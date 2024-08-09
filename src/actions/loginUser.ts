import { FieldValues } from "react-hook-form";

export const loginUser = async (data: FieldValues) => {
  const res = await fetch(
    `https://cleaning-supplies-store-server-indol.vercel.app/api/v1/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
      cache: "no-store",
    }
  );
  const userInfo = await res.json();
  return userInfo;
};
