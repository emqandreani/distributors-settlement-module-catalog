import { SelectChangeEvent } from "@mui/material";
import {
  selectBranchPriceBookForAddition,
  selectDistributorPriceBookForAddition,
  selectorPriceBooks,
  selectRegionalPriceBookForAddition,
  selectVehiclePriceBookForAddition,
} from "app/slices/priceBooks";
import { IPriceBook } from "interfaces/PriceBook";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useApplicationLevelFilters = () => {
  const [selectedPbName, setSelectedPbName] = useState<string | null>("Master"); // Needed in dialog header

  const [regionalValue, setRegionalValue] = useState<string | null>(null);
  const [branchValue, setBranchValue] = useState<string | null>(null);
  const [vehicleValue, setVehicleValue] = useState<string | null>(null);
  const [distributorValue, setDistributorValue] = useState<string | null>(null);

  const {
    basePriceBookForAddition,
    selectedRegionalPriceBookForAddition,
    selectedBranchPriceBookForAddition,
    selectedVehiclePriceBookForAddition,
  } = useSelector(selectorPriceBooks);

  const dispatch = useDispatch();

  const handleRegionalValue = useCallback((event: SelectChangeEvent<unknown>) => {
    event.preventDefault();
    setRegionalValue(event.target.value as string);
  }, []);
  const handleBranchValue = useCallback((event: SelectChangeEvent<unknown>) => {
    event.preventDefault();
    setBranchValue(event.target.value as string);
  }, []);
  const handleVehicleValue = useCallback((event: SelectChangeEvent<unknown>) => {
    event.preventDefault();
    setVehicleValue(event.target.value as string);
  }, []);
  const handleDistributorValue = useCallback((event: SelectChangeEvent<unknown>) => {
    event.preventDefault();
    setDistributorValue(event.target.value as string);
  }, []);

  useEffect(() => {
    if (regionalValue) {
      const selected = basePriceBookForAddition?.priceBookChildren.find(
        ({ id }) => id == regionalValue
      );

      setSelectedPbName(selected?.name as string);

      dispatch(selectRegionalPriceBookForAddition(selected as IPriceBook));
    }
    if (branchValue) {
      const selected = selectedRegionalPriceBookForAddition?.priceBookChildren.find(
        ({ id }) => id == branchValue
      );

      setSelectedPbName(selected?.name as string);

      dispatch(selectBranchPriceBookForAddition(selected as IPriceBook));
    }
    if (vehicleValue) {
      const selected = selectedBranchPriceBookForAddition?.priceBookChildren.find(
        ({ id }) => id == vehicleValue
      );

      setSelectedPbName(selected?.name as string);

      dispatch(selectVehiclePriceBookForAddition(selected as IPriceBook));
    }
    if (distributorValue) {
      const selected = selectedVehiclePriceBookForAddition?.priceBookChildren.find(
        ({ id }) => id == distributorValue
      );

      setSelectedPbName(selected?.name as string);
      dispatch(selectDistributorPriceBookForAddition(selected as IPriceBook));
    }
  }, [
    regionalValue,
    branchValue,
    vehicleValue,
    dispatch,
    basePriceBookForAddition?.priceBookChildren,
    selectedRegionalPriceBookForAddition?.priceBookChildren,
    selectedBranchPriceBookForAddition?.priceBookChildren,
    distributorValue,
    selectedVehiclePriceBookForAddition?.priceBookChildren,
  ]);

  return {
    regionalValue,
    branchValue,
    vehicleValue,
    distributorValue,
    handleRegionalValue,
    handleBranchValue,
    handleVehicleValue,
    handleDistributorValue,
    selectedPbName,
  };
};

export default useApplicationLevelFilters;
