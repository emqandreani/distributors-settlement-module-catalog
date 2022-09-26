import { IApplicationLevel } from "./ApplicationLevel";
import { IPriceBookItem } from "./PriceBookItem";
import { IPriceBookState } from "./PriceBookState";

export interface IPriceBook {
  priceBookId: string;
  name: string;
  affectedDistributors: number;
  lastMonthSettlement: number | number;
  currentMonthSettlement: number;
  subPriceBooks: number;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  priceBookState: IPriceBookState;
  priceBookParentId: null | string;
  priceBookChildren: IPriceBook[];
  applicationLevel: IApplicationLevel;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  distributionConceptItems?: IPriceBookItem[] | null;
  serviceConceptItems?: IPriceBookItem[] | null;
}
