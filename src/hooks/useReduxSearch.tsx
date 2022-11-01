import { useLocalDispatch, useLocalSelector } from "app/store";
import {
  selectorDistributionConcept,
  setFilteredDataDistribution,
} from "features/distribution-concept/slice";
import { selectorPricebook, setFilteredDataPricebook } from "features/pricebook/slice";
import { selectorSearch } from "features/search/slice";
import { selectorServiceConcept, setFilteredDataService } from "features/service-concept/slice";
import { useEffect } from "react";

const useReduxSearch = () => {
  const { flag, searchValue, selector } = useLocalSelector(selectorSearch);
  const { ...distributionConceptProps } = useLocalSelector(selectorDistributionConcept);
  const { ...serviceConceptProps } = useLocalSelector(selectorServiceConcept);
  const { ...pricebookProps } = useLocalSelector(selectorPricebook);
  const dispatch = useLocalDispatch();

  useEffect(() => {
    switch (selector) {
      case "distributionConcept":
        dispatch(
          setFilteredDataDistribution(
            distributionConceptProps.data.filter((el) =>
              el.description
                .toLocaleLowerCase()
                .trim()
                .includes(searchValue!.toLocaleLowerCase().trim() as string)
            )
          )
        );
        break;
      case "serviceConcept":
        dispatch(
          setFilteredDataService(
            serviceConceptProps.data.filter((el) =>
              el.description
                .toLocaleLowerCase()
                .trim()
                .includes(searchValue!.toLocaleLowerCase().trim())
            )
          )
        );
        break;
      case "pricebook":
        dispatch(
          setFilteredDataPricebook(
            pricebookProps.subPriceBooks.filter(
              (p) =>
                p.name
                  .trim()
                  .toLocaleLowerCase()
                  .includes(searchValue as string) ||
                p.createdBy
                  .trim()
                  .toLocaleLowerCase()
                  .includes(searchValue as string)
            )
          )
        );
        break;
      default:
        break;
    }
  }, [
    dispatch,
    distributionConceptProps.data,
    pricebookProps.subPriceBooks,
    searchValue,
    selector,
    serviceConceptProps.data,
  ]);
};

export default useReduxSearch;
