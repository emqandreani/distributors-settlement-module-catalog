import { IDistributor } from "interfaces/Distributor";

export const assignPriceBookAdapter = (distributor: IDistributor, priceBookId: string) => {
  const id = distributor.distributorId;

  return { id, priceBookId };
};
