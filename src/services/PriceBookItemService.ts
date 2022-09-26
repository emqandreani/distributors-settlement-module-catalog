import env from "@architecture-it/react-env";

import { post } from "./apiService";

const PRICEBOOK_ITEM_ENDPOINT = env("PRICEBOOK_ITEM_ENDPOINT");
const PRICEBOOK_ITEM_ENDPOINT_MULTIPLE = env("PRICEBOOK_ITEM_ENDPOINT_MULTIPLE");

export const postConceptItem = (data: Object) => post(PRICEBOOK_ITEM_ENDPOINT, data);
export const postConceptItemsArray = (data: Object[]) =>
  post(`${PRICEBOOK_ITEM_ENDPOINT}/${PRICEBOOK_ITEM_ENDPOINT_MULTIPLE}`, data);
