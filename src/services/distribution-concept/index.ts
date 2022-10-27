import env from "@architecture-it/react-env";
import { IDistributionConceptItem } from "interfaces/distribution-concept";
import ServiceBase from "services/ServiceBase";

const DISTRIBUTION_CONCEPT_ENDPOINT = env("DISTRIBUTION_CONCEPT_ENDPOINT");

class DistributionConceptService extends ServiceBase {
  constructor() {
    super();
  }
  getDistributionConcept = (id?: string) =>
    this.client.get<IDistributionConceptItem[]>(DISTRIBUTION_CONCEPT_ENDPOINT, id as any);
}

export default new DistributionConceptService();
