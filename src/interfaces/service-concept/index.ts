import { IBaseSlice } from "interfaces/base-slice";
import { IAtedBy } from "interfaces/enums";

export interface IServiceConceptItem {
  serviceConceptId: string;
  startDate: Date;
  endDate: Date;
  dayOfTheMonth: null;
  periodicity: string;
  periodicityType: string;
  daysOfTheWeek: null;
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
export interface InitialStateProps extends IBaseSlice {
  data: IServiceConceptItem[];
  filteredData: IServiceConceptItem[] | null;
}
