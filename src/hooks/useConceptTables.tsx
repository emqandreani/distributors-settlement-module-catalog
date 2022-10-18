import { CONCEPTS } from "constants/concepts";
import { selectorPricebook } from "features/pricebook/slice";
import { IPriceBook } from "interfaces/pricebook";
import { IPriceBookItem } from "interfaces/pricebook-item";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useConceptTables = (priceBook: IPriceBook) => {
  const [filteredServices, setFilteredServices] = useState<IPriceBookItem[] | null>(null);
  const [filteredDistribution, setFilteredDistribution] = useState<IPriceBookItem[] | null>(null);

  const { filteredConceptFlag } = useSelector(selectorPricebook);
  const { serviceConceptItems, distributionConceptItems } = priceBook as IPriceBook;

  useEffect(() => {
    if (filteredConceptFlag?.type === CONCEPTS.SERVICE && serviceConceptItems) {
      const filtered = serviceConceptItems.filter((c) =>
        c.description
          .trim()
          .toLocaleLowerCase()
          .includes(filteredConceptFlag?.flag as string)
      );

      setFilteredServices(filtered as IPriceBookItem[]);
    }
    if (filteredConceptFlag?.type === CONCEPTS.DISTRIBUTION && distributionConceptItems) {
      const filtered = distributionConceptItems.filter((c) =>
        c.description
          .trim()
          .toLocaleLowerCase()
          .includes(filteredConceptFlag?.flag as string)
      );

      setFilteredDistribution(filtered as IPriceBookItem[]);
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
