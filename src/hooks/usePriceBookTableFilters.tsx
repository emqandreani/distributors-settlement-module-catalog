import { useLocalDispatch, useLocalSelector } from "app/store";
import { selectorPricebook, selectStateFlag } from "features/pricebook/slice";
import { useCallback, useEffect, useRef, useState } from "react";

import useFilterStates from "./useFilterStates";

const usePriceBookTableFilters = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<null | string>(null);

  const dispatch = useLocalDispatch();

  const checkRef = useRef(null);
  const { ...priceBooksDynamicsProps } = useLocalSelector(selectorPricebook);
  const FILTER_STATES = useFilterStates(priceBooksDynamicsProps.subPriceBooks);

  const handleCheck = useCallback(
    (name: string) => {
      setIsChecked(!isChecked);
      selectedState ? setSelectedState(null) : setSelectedState(name);
    },
    [isChecked, selectedState]
  );

  useEffect(() => {
    if (selectedState) {
      dispatch(selectStateFlag(selectedState));
    }

    return () => {
      dispatch(selectStateFlag(null));
    };
  }, [selectedState, dispatch]);

  return { FILTER_STATES, checkRef, handleCheck };
};

export default usePriceBookTableFilters;
