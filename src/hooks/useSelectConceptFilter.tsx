import { searchConceptFlag, selectConcept } from "app/slices/priceBooks";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useSelectConceptFilter = () => {
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const handleSelectValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValue(event.target.value);
    dispatch(searchConceptFlag(null));
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectValue) dispatch(selectConcept(selectValue));
  }, [selectValue, dispatch]);

  return { selectValue, handleSelectValue };
};

export default useSelectConceptFilter;
