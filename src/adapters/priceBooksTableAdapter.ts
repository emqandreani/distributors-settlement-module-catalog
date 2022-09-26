import { capitalize } from "@mui/material";
import { differenceInDays } from "date-fns";
import { IPriceBook } from "interfaces/PriceBook";
export interface IPriceBooksTable {
  id: string;
  name: string;
  state: string[];
  affectedDistributors: string;
  lastMonthSettlement: string;
  currentMonthSettlement: string;
  subPriceBooks: number;
  startDate?: string;
  endDate?: string;
  remainingDays?: number;
  createdBy: string;
  createdAt: string;
  actions: string;
}

export const priceBooksTableAdapter = (pricebooks: IPriceBook[]) => {
  return pricebooks.map(
    ({
      id,
      priceBookId,
      name,
      priceBookState,
      isActive,
      affectedDistributors,
      lastMonthSettlement,
      currentMonthSettlement,
      subPriceBooks,
      startDate,
      endDate,
      createdAt,
      createdBy,
    }) => {
      return {
        id,
        priceBookId,
        name: name.toLocaleUpperCase(),
        state: [
          capitalize(priceBookState.description ?? ""),
          endDate ? differenceInDays(new Date(endDate), new Date()).toLocaleString() : "",
        ],
        actions: isActive ? "read" : "edit",
        affectedDistributors: `${affectedDistributors}`,
        lastMonthSettlement: `$${lastMonthSettlement}`,
        currentMonthSettlement: `$${currentMonthSettlement}`,
        subPriceBooks: subPriceBooks,
        startDate: startDate ? new Date(startDate).toLocaleDateString() : undefined,
        endDate: endDate ? new Date(endDate).toLocaleDateString() : undefined,
        remainingDays: endDate ? differenceInDays(new Date(endDate), new Date()) : undefined,
        createdAt: new Date(createdAt).toLocaleDateString(),
        createdBy,
      };
    }
  );
};
