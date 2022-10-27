import { IDistributionConceptItem } from "interfaces/distribution-concept";
import { IServiceConceptItem } from "interfaces/service-concept";
export const distributionTableAdapter = (conceptItems: IDistributionConceptItem[]) => {
  return conceptItems.map((el) => {
    return {
      concept: el.distributionConceptId,
      name: el.description,
      description: el.description,
      createdBy: el.createdBy,
      createdAt: new Date(el.createdAt).toLocaleDateString(),
    };
  });
};

export const serviceTableAdapter = (conceptItems: IServiceConceptItem[]) => {
  return conceptItems.map((el) => {
    return {
      concept: el.serviceConceptId,
      name: el.description,
      description: el.description,
      createdBy: el.createdBy,
      createdAt: new Date(el.createdAt).toLocaleDateString(),
    };
  });
};
