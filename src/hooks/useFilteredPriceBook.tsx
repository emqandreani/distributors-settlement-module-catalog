import { PRICEBOOKS_STATES } from "constants/pricebookStates";

import { useLocalDispatch, useLocalSelector } from "app/store";
import { selectorPricebook, selectPriceBook } from "features/pricebook/slice";
import { IPriceBook } from "interfaces/pricebook";
import { useEffect, useState } from "react";

const useFilteredPriceBook = () => {
  const [filteredPriceBooks, setFilteredPriceBooks] = useState<IPriceBook[] | null>(null);
  const dispatch = useLocalDispatch();

  const { ...priceBooksDynamicsProps } = useLocalSelector(selectorPricebook);

  useEffect(() => {
    if (priceBooksDynamicsProps.stateFilterFlag) {
      switch (priceBooksDynamicsProps.stateFilterFlag) {
        case PRICEBOOKS_STATES.ACTIVE:
          setFilteredPriceBooks(priceBooksDynamicsProps.activePriceBooks);
          break;
        case PRICEBOOKS_STATES.DRAFT:
          setFilteredPriceBooks(priceBooksDynamicsProps.draftPriceBooks);
          break;
        case PRICEBOOKS_STATES.CONSOLIDATED:
          setFilteredPriceBooks(priceBooksDynamicsProps.consolidatedPriceBooks);
          break;
        case PRICEBOOKS_STATES.UNCONSOLIDATED:
          setFilteredPriceBooks(priceBooksDynamicsProps.unConsolidatedPriceBooks);
          break;
        case PRICEBOOKS_STATES.EXPIRED:
          setFilteredPriceBooks(priceBooksDynamicsProps.expiredPriceBooks);
          break;
      }
    }
    if (priceBooksDynamicsProps.filteredDataPricebook) {
      setFilteredPriceBooks(priceBooksDynamicsProps.filteredDataPricebook);
    }

    return () => {
      setFilteredPriceBooks(null);
    };
  }, [
    dispatch,
    priceBooksDynamicsProps.activePriceBooks,
    priceBooksDynamicsProps.consolidatedPriceBooks,
    priceBooksDynamicsProps.draftPriceBooks,
    priceBooksDynamicsProps.expiredPriceBooks,
    priceBooksDynamicsProps.filteredDataPricebook,
    priceBooksDynamicsProps.stateFilterFlag,
    priceBooksDynamicsProps.unConsolidatedPriceBooks,
  ]);

  return { filteredPriceBooks };
};

export default useFilteredPriceBook;
