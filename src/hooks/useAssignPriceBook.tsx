import { assignPriceBookAdapter } from "adapters/assignPriceBookAdapter";
import { assignDistributors, selectorDistributor } from "app/slices/distributor";
import { selectorPriceBooks } from "app/slices/priceBooks";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAssignPriceBook = () => {
  const { assignedDistributors } = useSelector(selectorDistributor);
  const {
    selectedBranchPriceBookForAddition,
    selectedRegionalPriceBookForAddition,
    selectedVehiclePriceBookForAddition,
  } = useSelector(selectorPriceBooks);

  const dispatch = useDispatch();

  const selectedPbId = useMemo(() => {
    return selectedVehiclePriceBookForAddition?.id
      ? selectedVehiclePriceBookForAddition?.id
      : selectedBranchPriceBookForAddition?.id
      ? selectedBranchPriceBookForAddition.id
      : selectedRegionalPriceBookForAddition?.id
      ? selectedRegionalPriceBookForAddition.id
      : "";
  }, [
    selectedBranchPriceBookForAddition,
    selectedRegionalPriceBookForAddition,
    selectedVehiclePriceBookForAddition,
  ]);

  const handleAssignPriceBook = useCallback(() => {
    if (assignedDistributors.length > 1) {
      assignedDistributors.map((distributor) =>
        dispatch(assignDistributors(assignPriceBookAdapter(distributor, selectedPbId)))
      );
    } else {
      dispatch(assignDistributors(assignPriceBookAdapter(assignedDistributors[0], selectedPbId)));
    }
  }, [assignedDistributors, dispatch, selectedPbId]);

  return { handleAssignPriceBook };
};

export default useAssignPriceBook;
