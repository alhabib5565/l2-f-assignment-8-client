import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cleaning-supplies-store-server-indol.vercel.app/api/v1",
  }),
  endpoints: () => ({}),
  tagTypes: [
    "main-category",
    "category",
    "sub-category",
    "brand",
    "product",
    "color",
    "order",
  ],
});
