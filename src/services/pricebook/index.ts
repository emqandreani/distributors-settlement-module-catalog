import env from "@architecture-it/react-env";
import { AxiosResponse } from "axios";
import { IUpdatePriceBookDto } from "interfaces/DTO/UpdatePriceBookDto";
import { IPriceBook } from "interfaces/PriceBook";
import { IResquest } from "interfaces/Request";
import ServiceBase from "services/ServiceBase";

const PRICEBOOKS_ENDPOINT = env("PRICEBOOK_ENDPOINT") ?? "";
const PRICEBOOK_PUT_ENDPOINT = env("PRICEBOOK_PUT_ENDPOINT") ?? "";

class PricebookService extends ServiceBase {
  constructor() {
    super();
  }

  getPricebook = (id?: string) => this.client.get<IPriceBook>(PRICEBOOKS_ENDPOINT, id as any);
  postPricebook = (data: IUpdatePriceBookDto) =>
    this.client.post<ResponseType, AxiosResponse<IResquest>>(
      `${PRICEBOOKS_ENDPOINT}/${PRICEBOOK_PUT_ENDPOINT}`,
      data
    );
  putPricebook = (data: IUpdatePriceBookDto) =>
    this.client.put<ResponseType, AxiosResponse<IResquest>>(
      `${PRICEBOOKS_ENDPOINT}/${PRICEBOOK_PUT_ENDPOINT}`,
      data
    );
}

export default new PricebookService();
