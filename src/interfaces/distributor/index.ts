import { IBaseSlice } from "interfaces/base-slice";

export interface IDistributor {
  distributorId: string;
  fullNameWithDni: string;
  branchName: string;
  branchId: string;
  vehicleName: string;
  vehicleId: string;
  priceBookId: null | string;
  priceBookIdName: string;
  priceBookName: null | string;
}
export interface IAssignDistributorDto {
  id: string;
  priceBookId: string;
}

export interface IPostResponse {
  status: string;
  id: string;
  priceBookId: string;
}

export interface InitialStateProps extends IBaseSlice {
  data: IDistributor[];
  assignedDistributors: IDistributor[] | null;
  postResponse: IPostResponse | null;
}
