import { GridCellModes, GridCellModesModel, GridRowId } from "@mui/x-data-grid";
import React, { useCallback, useMemo, useState } from "react";

interface SelectedCellParams {
  id: GridRowId;
  field: string;
}

const useItemChart = () => {
  const [selectedCellParams, setSelectedCellParams] = useState<SelectedCellParams | null>(null);
  const [cellModesModel, setCellModesModel] = useState<GridCellModesModel>({});

  const cellMode = useMemo(() => {
    if (!selectedCellParams) {
      return "view";
    }
    const { id, field } = selectedCellParams;

    return cellModesModel[id]?.[field]?.mode || "view";
  }, [cellModesModel, selectedCellParams]);

  const handleSaveOrEdit = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;

    if (cellMode === "edit") {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } },
      });
    } else {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } },
      });
    }
  };

  const handleCancel = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;

    setCellModesModel({
      ...cellModesModel,
      [id]: {
        ...cellModesModel[id],
        [field]: { mode: GridCellModes.View, ignoreModifications: true },
      },
    });
  };

  const handleCellFocus = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    const row = event.currentTarget.parentElement;
    const id = row!.dataset.id!;
    const field = event.currentTarget.dataset.field!;

    setSelectedCellParams({ id, field });
  }, []);

  return {
    selectedCellParams,
    cellModesModel,
    cellMode,
    handleCancel,
    handleCellFocus,
    handleSaveOrEdit,
  };
};

export default useItemChart;
