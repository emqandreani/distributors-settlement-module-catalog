import { useLocalDispatch, useLocalSelector } from "app/store";
import {
  selectorDistributionConcept,
  setFilteredData as setFilteredDataDistribution,
} from "features/distribution-concept/slice";
import { selectorSearch } from "features/search/slice";
import { selectorServiceConcept } from "features/service-concept/slice";
import React, { useEffect } from "react";

const useReduxSearch = () => {
  const { flag, searchValue, selector } = useLocalSelector(selectorSearch);
  const { ...distributionConceptProps } = useLocalSelector(selectorDistributionConcept);
  const { ...serviceConceptProps } = useLocalSelector(selectorServiceConcept);
  const dispatch = useLocalDispatch();

  useEffect(() => {
    switch (selector) {
      case "distributionConcept":
        const result = distributionConceptProps.data.filter(
          (el) =>
            el.description.toLocaleLowerCase().trim() === searchValue?.trim().toLocaleLowerCase()
        );

        console.log(result);
        dispatch(setFilteredDataDistribution(result));
        break;

      default:
        break;
    }

    return () => {};
  }, [dispatch, distributionConceptProps.data, searchValue, selector]);
};

export default useReduxSearch;
