import { IApplicationLevel } from "interfaces/ApplicationLevel";
import { IBaseSlice } from "interfaces/base-slice";
import { IPriceBookItem } from "interfaces/pricebook-item";
import { IPriceBookState } from "interfaces/PriceBookState";
import { IResquest } from "interfaces/Request";

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
export interface IPostPriceBookDto {
  name: string;
  startDate: string;
  endDate: string;
  priceBookParentId: string;
}
export interface IUpdatePriceBookDto {
  id: string;
  startDate: string;
  endDate: string;
}
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
export interface IPriceBookConceptsTable {
  priceBookId: string;
  id: string;
  concept: number;
  description: string;
  amount: string;
  createdAt: string;
  createdBy: string;
  actions: string;
  events: number;
  condition: string;
  ownerPriceBookId: string;
  creatorPriceBookId: string;
  priceBookItemTypeId: string;
  priceBookItemTypeName: string;
}

export interface InitialStateProps extends IBaseSlice {
  data: IPriceBook | {};
  addedConcepts: IPriceBookConceptsTable[] | [];
  subPriceBooks: IPriceBook[] | [];
  mappedPriceBooks: IPriceBook[];
  activePriceBooks: IPriceBook[] | [];
  draftPriceBooks: IPriceBook[] | [];
  consolidatedPriceBooks: IPriceBook[] | [];
  unConsolidatedPriceBooks: IPriceBook[] | [];
  expiredPriceBooks: IPriceBook[] | [];
  filteredPriceBooks: IPriceBook[] | null;
  basePriceBookForAddition: IPriceBook | null;
  selectedRegionalPriceBookForAddition: IPriceBook | null;
  selectedBranchPriceBookForAddition: IPriceBook | null;
  selectedVehiclePriceBookForAddition: IPriceBook | null;
  selectedDistributorPriceBookForAddition: IPriceBook | null;
  savedNewPriceBook: boolean;
  savedEditedPriceBook: boolean;
  newPriceBook: IPostPriceBookDto | null;
  editedPriceBook: IUpdatePriceBookDto | null;
  newPriceBookConcepts: IPriceBookConceptsTable[] | [];
  stateFilterFlag: string | null;
  selectedConcept: string | null;
  // filteredConceptFlag: IConceptFlag | null;
  baseSimulatedPriceBook: string | null;
  newSimulatedPriceBook: string | null;
  getPriceBooksRequest: string | null;
  postPriceBookRequest: IResquest | null;
  putPriceBookRequest: IResquest | null;
}
