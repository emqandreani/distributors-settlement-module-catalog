import { IPriceBookItemType } from "./PriceBookItemType";

export interface IPriceBookItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  concept: number;
  description: string;
  amount: number;
  lastMonthSettlement: number;
  currentMonthSettlement: number;
  events: number;
  percentage: number;
  isOptional: boolean;
  ownerPriceBookId: string;
  creatorPriceBookId: string;
  priceBookItemType: IPriceBookItemType;
  ownerPriceBook: string;
  creatorPriceBook: string;
}
