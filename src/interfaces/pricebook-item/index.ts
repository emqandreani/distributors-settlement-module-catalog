import { IBaseSlice } from "interfaces/base-slice";

export interface IPricebookItemPostDTO {
  concept: number;
  description: string;
  amount: number;
  condition: boolean;
  ownerPriceBookId: string;
  creatorPriceBookId: string;
  events: number;
  priceBookItemTypeId: string;
}
export interface IPriceBookItemType {
  id: string;
  description: string;
}

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

export interface InitialStateProps extends IBaseSlice {
  response: string | null;
}
