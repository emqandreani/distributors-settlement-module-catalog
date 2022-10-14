import { assignPriceBookAdapter } from "adapters/assignPriceBookAdapter";
import { useLocalDispatch, useLocalSelector } from "app/store";
import { assignDistributors } from "features/distributor/asyncActions";
import { selectorDistributor } from "features/distributor/slice";
import { selectorPricebook } from "features/pricebook/slice";


import { useCallback, useMemo } from "react";

const useAssignPriceBook = () => {
  const { assignedDistributors } = useLocalSelector(selectorDistributor);
  const {
    selectedBranchPriceBookForAddition,
    selectedRegionalPriceBookForAddition,
    selectedVehiclePriceBookForAddition,
  } = useLocalSelector(selectorPricebook);

  const dispatch = useLocalDispatch();

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
    if (assignedDistributors && assignedDistributors?.length > 1) {
      assignedDistributors.map((distributor) =>
        dispatch(assignDistributors(assignPriceBookAdapter(distributor, selectedPbId)))
      );
    } else if (assignedDistributors) {
      dispatch(assignDistributors(assignPriceBookAdapter(assignedDistributors[0], selectedPbId)));
    } else {
        return
    }
  }, [assignedDistributors, dispatch, selectedPbId]);

  return { handleAssignPriceBook };
};

export default useAssignPriceBook;
