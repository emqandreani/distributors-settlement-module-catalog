import { IPriceBookItem } from "./PriceBookItem";

export interface IConceptItem {
  priceBookItemId: string;
  distributionConceptId?: string;
  serviceConceptId?: string;
  priceBookItem: IPriceBookItem;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
