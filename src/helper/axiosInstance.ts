import { getNewAccessToken } from "@/actions/getNewAccessToken";
import { updateToken } from "@/redux/features/authSlice/authSlice";
import { store } from "@/redux/store";
import {
  IGenericErrorResponse,
  ResponseSuccessType,
} from "@/type/response.type";
import axios from "axios";

export const axiosInstance = axios.create();
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = store.getState()?.auth?.token;
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(error, "request error");
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject: ResponseSuccessType = {
      data: response?.data,
      meta: response?.data,
    };
    return responseObject;
  },

  async function (error) {
    const config = error.config;

    if (error?.response?.status === 401 && !config.sent) {
      config.sent = true;
      const response = await getNewAccessToken();

      const accessToken = response?.data?.data?.accessToken;
      config.headers["Authorization"] = accessToken;
      store.dispatch(updateToken({ accessToken }));
      return axiosInstance(config);
    } else {
      const responseObject: IGenericErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong!!!",
        errorMessages: error?.response?.data?.message,
      };
      // return Promise.reject(error);
      return { error: responseObject };
    }
  }
);
