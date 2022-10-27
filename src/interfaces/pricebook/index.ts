import { IApplicationLevel } from "interfaces/application-level";
import { IBaseSlice } from "interfaces/base-slice";
import { IDistributionConceptItem } from "interfaces/distribution-concept";
import { IAtedBy } from "interfaces/enums";
import { IPriceBookState } from "interfaces/pricebook-state";
import { IResquest } from "interfaces/requests";
import { IServiceConceptItem } from "interfaces/service-concept";

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
  priceBookParent: null;
  distributionConceptItems: IDistributionConceptItem[];
  serviceConceptItems: IServiceConceptItem[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: IAtedBy;
  updatedBy: IAtedBy;
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

export interface IConceptFlag {
  type: string;
  flag: string;
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
  selectedConcept: "service" | "distribution" | null;
  filteredConceptFlag: IConceptFlag | null;
  baseSimulatedPriceBook: string | null;
  newSimulatedPriceBook: string | null;
  getPriceBooksRequest: string | null;
  postPriceBookRequest: IResquest | null;
  putPriceBookRequest: IResquest | null;
}
