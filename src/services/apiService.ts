import axios from "axios";

import axiosConfig from "./axiosConfig";

const INSTANCE = axios.create(axiosConfig);

export const get = (url: string, id: string | null = null) => {
  const processedURL = id ? `${url}/${id}` : url;

  return INSTANCE.get(processedURL, { params: id });
};

export const post = (url: string, data: Object) => INSTANCE.post(url, data);

export const put = (url: string, data: Object) => INSTANCE.put(url, data);
