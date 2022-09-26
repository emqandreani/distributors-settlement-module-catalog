import { selectorPriceBooks } from "app/slices/priceBooks";
import { IPriceBook } from "interfaces/PriceBook";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useConceptContainer = () => {
  const [currentPriceBook, setCurrentPriceBook] = useState<IPriceBook | null>(null);

  const {
    basePriceBookForAddition,
    selectedRegionalPriceBookForAddition,
    selectedBranchPriceBookForAddition,
    selectedVehiclePriceBookForAddition,
    selectedDistributorPriceBookForAddition,
  } = useSelector(selectorPriceBooks);

  useEffect(() => {
    if (basePriceBookForAddition) setCurrentPriceBook(basePriceBookForAddition);
    if (selectedRegionalPriceBookForAddition)
      setCurrentPriceBook(selectedRegionalPriceBookForAddition);
    if (selectedBranchPriceBookForAddition) setCurrentPriceBook(selectedBranchPriceBookForAddition);
    if (selectedVehiclePriceBookForAddition)
      setCurrentPriceBook(selectedVehiclePriceBookForAddition);
    if (selectedDistributorPriceBookForAddition)
      setCurrentPriceBook(selectedDistributorPriceBookForAddition);
  }, [
    basePriceBookForAddition,
    selectedBranchPriceBookForAddition,
    selectedDistributorPriceBookForAddition,
    selectedRegionalPriceBookForAddition,
    selectedVehiclePriceBookForAddition,
  ]);

  return { currentPriceBook };
};

export default useConceptContainer;
