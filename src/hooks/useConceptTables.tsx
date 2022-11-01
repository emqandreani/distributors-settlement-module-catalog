import { CONCEPTS } from "constants/concepts";

import { useLocalSelector } from "app/store";
import { selectorPricebook } from "features/pricebook/slice";
import { IPriceBook } from "interfaces/pricebook";
import { useEffect, useState } from "react";
import { IServiceConceptItem } from "interfaces/service-concept";
import { IDistributionConceptItem } from "interfaces/distribution-concept";
import { selectorSearch } from "features/search/slice";

const useConceptTables = (priceBook: IPriceBook) => {
  const [filteredServices, setFilteredServices] = useState<IServiceConceptItem[] | null>(null);
  const [filteredDistribution, setFilteredDistribution] = useState<
    IDistributionConceptItem[] | null
  >(null);

  const { serviceConceptItems, distributionConceptItems } = priceBook as IPriceBook;
  const { flag, searchValue, selector } = useLocalSelector(selectorSearch);

  useEffect(() => {
    if (flag === CONCEPTS.SERVICE && selector === "pricebook") {
      const filtered = serviceConceptItems.filter((c) =>
        c.description
          .trim()
          .toLocaleLowerCase()
          .includes(searchValue as string)
      );

      setFilteredServices(filtered as IServiceConceptItem[]);
    }
    if (flag === CONCEPTS.DISTRIBUTION && selector === "pricebook") {
      const filtered = distributionConceptItems.filter((c) =>
        c.description
          .trim()
          .toLocaleLowerCase()
          .includes(searchValue as string)
      );

      setFilteredDistribution(filtered as IDistributionConceptItem[]);
    }

    return () => {
      setFilteredDistribution(null);
      setFilteredServices(null);
    };
  }, [distributionConceptItems, flag, searchValue, selector, serviceConceptItems]);

  return { filteredDistribution, filteredServices };
};

export default useConceptTables;
