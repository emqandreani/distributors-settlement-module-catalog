import { GridSelectionModel } from "@mui/x-data-grid";
import { selectAssignedDistributors } from "features/distributor";
import { IDistributor } from "interfaces/distributor";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useAssignedDistributors = (rows: IDistributor[]) => {
  const [assignedDistributors, setAssignedDistributors] = useState<null | IDistributor[]>(null);
  const dispatch = useDispatch();

  const handleSelection = (model: GridSelectionModel) => {
    const selectedRows = rows.filter((row) => model.indexOf(row.distributorId) >= 0);

    setAssignedDistributors(selectedRows);
  };

  useEffect(() => {
    if (assignedDistributors?.length) {
      dispatch(selectAssignedDistributors(assignedDistributors));
    }
  }, [assignedDistributors, dispatch]);

  return { handleSelection };
};

export default useAssignedDistributors;
