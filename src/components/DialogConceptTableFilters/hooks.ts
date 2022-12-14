import { searchConceptFlag, selectConcept } from "features/pricebook";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useSelectConceptFilter = () => {
  const [selectValue, setSelectValue] = useState<"service" | "distribution" | null>(null);
  const handleSelectValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValue(event.target.value as "service" | "distribution");
    dispatch(searchConceptFlag(null));
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectValue) dispatch(selectConcept(selectValue));
  }, [selectValue, dispatch]);

  return { selectValue, handleSelectValue };
};

export default useSelectConceptFilter;
