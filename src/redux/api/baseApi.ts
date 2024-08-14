import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../helper/axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://cleaning-supplies-store-server-indol.vercel.app/api/v1",
    // baseUrl: "http://localhost:5000/api/v1",
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
    "feedback",
    "users",
  ],
});
