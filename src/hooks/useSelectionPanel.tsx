import { SelectChangeEvent } from "@mui/material";
import { selectBaseSimulatedPriceBook, selectNewSimulatedPriceBook } from "app/slices/priceBooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useSelectionPanel = (type: "base" | "new") => {
  const [value, setValue] = useState<string | null>(null);
  const dispatch = useDispatch();
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setValue(event.target.value as string);
  };

  useEffect(() => {
    if (value) {
      type === "base"
        ? dispatch(selectBaseSimulatedPriceBook(value))
        : dispatch(selectNewSimulatedPriceBook(value));
    }
  }, [value, type, dispatch]);

  return { value, handleChange };
};

export default useSelectionPanel;
