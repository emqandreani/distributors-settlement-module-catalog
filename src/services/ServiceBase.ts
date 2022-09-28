import { publish } from "@architecture-it/microfront-utils";
import env from "@architecture-it/react-env";
import axios, { AxiosInstance } from "axios";

export default abstract class ServiceBase {
  protected readonly client: AxiosInstance;

  constructor(auth = true) {
    this.client = axios.create({
      baseURL: `${env("CATALOG_API_URL")}/`,
    });

    if (auth) {
      this.client.interceptors.request.use((config) => {
        config.headers!.Authorization = "Bearer " + localStorage.getItem("token");

        return config;
      });
    }

    this.client.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response.status === 401) {
          publish("onUnauthorized");
        }

        return error;
      }
    );
  }
}
