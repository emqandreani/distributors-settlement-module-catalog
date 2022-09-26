import env from "@architecture-it/react-env";
import { IAssignDistributorDto } from "interfaces/DTO/AssignDistributorDto";

import { get, put } from "./apiService";

const DISTRIBUTOR_ENDPOINT = env("DISTRIBUTOR_ENDPOINT");
const DISTRIBUTOR_PBASSIGN_ENDPOINT = env("DISTRIBUTOR_PBASSIGN_ENDPOINT");

export const getAllDistributors = () => {
  return get(DISTRIBUTOR_ENDPOINT);
};

/*Assign PriceBook to distributor */
export const putDistributors = (distributor: IAssignDistributorDto) =>
  put(`${DISTRIBUTOR_ENDPOINT}/${DISTRIBUTOR_PBASSIGN_ENDPOINT}`, distributor);
