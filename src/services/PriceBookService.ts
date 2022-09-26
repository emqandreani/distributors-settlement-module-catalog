import env from "@architecture-it/react-env";
import { IPriceBookDto } from "interfaces/DTO/PriceBookDto";
import { IUpdatePriceBookDto } from "interfaces/DTO/UpdatePriceBookDto";

import { get, post, put } from "./apiService";

const PRICEBOOKS_ENDPOINT = env("PRICEBOOK_ENDPOINT") ?? "";
const PRICEBOOK_PUT_ENDPOINT = env("PRICEBOOK_PUT_ENDPOINT") ?? "";

export const getPriceBooks = (id?: string) => {
  return get(PRICEBOOKS_ENDPOINT, id);
};

export const postPriceBook = (data: IPriceBookDto) => post(PRICEBOOKS_ENDPOINT, data);

export const putPriceBook = (data: IUpdatePriceBookDto) =>
  put(`${PRICEBOOKS_ENDPOINT}/${PRICEBOOK_PUT_ENDPOINT}`, data);
