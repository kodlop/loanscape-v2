"use server";

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const client = axios.create({
  baseURL: process.env.BACKEND_URL,
});

export const request = async (options: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse) => {
    return response?.data?.data;
  };

  const onError = (error: AxiosError) => {
    console.error("Request Failed:", error.config);
    return Promise.reject(error.response?.data);
  };

  return client({
    ...options,
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  })
    .then(onSuccess)
    .catch(onError);
};
