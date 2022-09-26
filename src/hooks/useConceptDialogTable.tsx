import { GridSelectionModel } from "@mui/x-data-grid";
import { IPriceBookConceptsTable } from "adapters/priceBookConceptsTableAdapter";
import { addConceptItems, selectorPriceBooks } from "app/slices/priceBooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useConceptDialogTable = (rows: IPriceBookConceptsTable[]) => {
  const [addedServices, setAddedServices] = useState<IPriceBookConceptsTable[]>([]);
  const [addedDistribution, setAddedDistribution] = useState<IPriceBookConceptsTable[]>([]);

  const { selectedConcept } = useSelector(selectorPriceBooks);

  const dispatch = useDispatch();

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
