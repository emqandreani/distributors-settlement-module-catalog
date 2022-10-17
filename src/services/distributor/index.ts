import env from "@architecture-it/react-env";
import { AxiosResponse } from "axios";
import { IAssignDistributorDto, IDistributor } from "interfaces/distributor";

import ServiceBase from "services/ServiceBase";

const DISTRIBUTOR_ENDPOINT = env("DISTRIBUTOR_ENDPOINT");
const DISTRIBUTOR_PBASSIGN_ENDPOINT = env("DISTRIBUTOR_PBASSIGN_ENDPOINT");

class DistributorService extends ServiceBase {
  constructor() {
    super();
  }

  getDistributor = () => this.client.get<IDistributor[]>(DISTRIBUTOR_ENDPOINT);
  putDistributor = (data: IAssignDistributorDto) =>
    this.client.put<ResponseType, AxiosResponse<IAssignDistributorDto>>(
      `${DISTRIBUTOR_ENDPOINT}/${DISTRIBUTOR_PBASSIGN_ENDPOINT}`,
      data
    );
}

export default new DistributorService();
