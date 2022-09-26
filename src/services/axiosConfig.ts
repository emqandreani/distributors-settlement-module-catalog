import { getClientSecretToken } from "helpers/getClientSecretToken";
import env from "@architecture-it/react-env";

const { secret } = getClientSecretToken();

const axiosConfig = {
  baseURL: env("CATALOG_API_URL"),
  mode: "no-cors",
  headers: {
    Accept: "application/json, text/plain, */*",
    Authorization: `Bearer ${secret}`,
  },
};

export default axiosConfig;
