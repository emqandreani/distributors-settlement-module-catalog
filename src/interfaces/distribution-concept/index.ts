import { IAtedBy } from "interfaces/enums";

export interface IDistributionConceptItem {
  distributionConceptId: string;
  concept: number;
  description: string;
  amount: number;
  isOptional: boolean;
  ownerPriceBookId: string;
  ownerPriceBook: string;
  creatorPriceBookId: string;
  creatorPriceBook: string;
  events: number;
  priceBookItemTypeId: string;
  priceBookItemTypeDescription: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: IAtedBy;
  updatedBy: IAtedBy;
}
