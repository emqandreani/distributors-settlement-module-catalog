import env from "@architecture-it/react-env";
import { IServiceConceptItem } from "interfaces/service-concept";
import ServiceBase from "services/ServiceBase";

const SERVICE_CONCEPT_ENDPOINT = env("SERVICE_CONCEPT_ENDPOINT");

class ServiceConceptService extends ServiceBase {
  constructor() {
    super();
  }
  getServiceConcept = (id?: string) =>
    this.client.get<IServiceConceptItem[]>(SERVICE_CONCEPT_ENDPOINT, id as any);
}

export default new ServiceConceptService();
