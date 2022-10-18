import { differenceInDays } from "date-fns";
import { IPriceBook } from "interfaces/pricebook";

export const priceBookHeaderAdapater = (pricebook: IPriceBook) => {
  const {
    priceBookId,
    name,
    priceBookState,
    startDate,
    endDate,
    affectedDistributors,
    currentMonthSettlement,
    createdBy,
    createdAt,
    priceBookParentId,
  } = pricebook;

  const remainingDays = differenceInDays(new Date(endDate), new Date());

  return {
    index: priceBookId,
    name,
    priceBookState: priceBookState.description ?? "",
    priceBookParentId,
    startDate: new Date(startDate).toLocaleDateString(),
    endDate: new Date(endDate).toLocaleDateString(),
    remainingDays,
    affectedDistributors,
    currentMonthSettlement,
    createdAt: new Date(createdAt).toLocaleDateString(),
    createdBy,
  };
};
