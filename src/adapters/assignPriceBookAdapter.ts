import { IDistributor } from "interfaces/distributor";

export const assignPriceBookAdapter = (distributor: IDistributor, priceBookId: string) => {
  const id = distributor.distributorId;

  return { id, priceBookId };
};
