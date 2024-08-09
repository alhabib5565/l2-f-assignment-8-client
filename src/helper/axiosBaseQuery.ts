import { TMeta } from "@/type";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

import type { AxiosRequestConfig, AxiosError } from "axios";
import { axiosInstance } from "./axiosInstance";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      body?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      meta?: TMeta;
      contentType?: string;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, body, params, headers, contentType }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data: body,
        params,
        headers: {
          ...headers,
          "Content-Type": contentType || "application/json",
        },
      });
      return result;
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
