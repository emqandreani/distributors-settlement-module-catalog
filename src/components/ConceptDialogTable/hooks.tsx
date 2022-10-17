import { GridSelectionModel } from "@mui/x-data-grid";
import { useLocalDispatch, useLocalSelector } from "app/store";
import { addConceptItems, selectorPricebook } from "features/pricebook/slice";
import { IPriceBookConceptsTable } from "interfaces/pricebook";

import { useEffect, useState } from "react";

const useConceptDialogTable = (rows: IPriceBookConceptsTable[]) => {
  const [addedServices, setAddedServices] = useState<IPriceBookConceptsTable[]>([]);
  const [addedDistribution, setAddedDistribution] = useState<IPriceBookConceptsTable[]>([]);

  const { selectedConcept } = useLocalSelector(selectorPricebook);

  const dispatch = useLocalDispatch();

  const handleSelection = (model: GridSelectionModel) => {
    const selectedRows = rows.filter((row) => model.indexOf(row.id) >= 0);

    selectedConcept === "service" &&
      setAddedServices(
        selectedRows.filter(({ priceBookItemTypeName }) => priceBookItemTypeName == "Service")
      );

    selectedConcept === "distribution" &&
      setAddedDistribution(
        selectedRows.filter(({ priceBookItemTypeName }) => priceBookItemTypeName == "Distribution")
      );
  };

  useEffect(() => {
    if (addedServices.length | addedDistribution.length) {
      dispatch(addConceptItems(addedServices.concat(addedDistribution)));
    }

    return () => {};
  }, [addedDistribution, addedServices, dispatch]);

  return { handleSelection };
};

export default useConceptDialogTable;
