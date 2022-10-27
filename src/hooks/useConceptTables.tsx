import { CONCEPTS } from "constants/concepts";

import { useLocalSelector } from "app/store";
import { selectorPricebook } from "features/pricebook/slice";
import { IPriceBook } from "interfaces/pricebook";
import { IPriceBookItem } from "interfaces/pricebook-item";
import { useEffect, useState } from "react";
import { IServiceConceptItem } from "interfaces/service-concept";
import { IDistributionConceptItem } from "interfaces/distribution-concept";

const useConceptTables = (priceBook: IPriceBook) => {
  const [filteredServices, setFilteredServices] = useState<IServiceConceptItem[] | null>(null);
  const [filteredDistribution, setFilteredDistribution] = useState<
    IDistributionConceptItem[] | null
  >(null);

  const { filteredConceptFlag } = useLocalSelector(selectorPricebook);
  const { serviceConceptItems, distributionConceptItems } = priceBook as IPriceBook;

  useEffect(() => {
    if (filteredConceptFlag?.type === CONCEPTS.SERVICE && serviceConceptItems) {
      const filtered = serviceConceptItems.filter((c) =>
        c.description
          .trim()
          .toLocaleLowerCase()
          .includes(filteredConceptFlag?.flag as string)
      );

      setFilteredServices(filtered as IServiceConceptItem[]);
    }
    if (filteredConceptFlag?.type === CONCEPTS.DISTRIBUTION && distributionConceptItems) {
      const filtered = distributionConceptItems.filter((c) =>
        c.description
          .trim()
          .toLocaleLowerCase()
          .includes(filteredConceptFlag?.flag as string)
      );

      setFilteredDistribution(filtered as IDistributionConceptItem[]);
    }

    return () => {
      setFilteredDistribution(null);
      setFilteredServices(null);
    };
  }, [
    filteredConceptFlag?.type,
    filteredConceptFlag?.flag,
    serviceConceptItems,
    distributionConceptItems,
  ]);

  return { filteredDistribution, filteredServices };
};

export default useConceptTables;
