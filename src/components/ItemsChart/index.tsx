import { ACTIONS_COL, ITEMS_CHART_COLS } from "constants/tableColumns";

import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { NoRowsItemChart } from "components/NoRows";
import { IPriceBookConceptsTable } from "interfaces/pricebook";

import styles from "./index.module.scss";
import useItemChart from "./hooks";

export interface ItemsChartProps {
  rows: IPriceBookConceptsTable[];
  title: string;
}

export const ItemsChart: React.FC<ItemsChartProps> = ({ title, rows }) => {
  const { cellModesModel, handleCellFocus } = useItemChart();

  return (
    <div className={styles["items-chart-wrapper"]}>
      <h1>{title}</h1>
      <DataGrid
        disableColumnMenu
        disableSelectionOnClick
        hideFooterSelectedRowCount
        cellModesModel={cellModesModel}
        className={styles["data-table"]}
        columns={[...ITEMS_CHART_COLS, ACTIONS_COL]}
        components={{
          NoRowsOverlay: NoRowsItemChart,
        }}
        componentsProps={{
          cell: {
            onFocus: handleCellFocus,
          },
        }}
        experimentalFeatures={{ newEditingApi: true }}
        getRowClassName={() => {
          return styles["table-row"];
        }}
        pageSize={8}
        rows={rows}
        sx={{
          ".MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
        // onCellEditStop={(params: GridCellEditStopParams, event: MuiEvent) => {
        //   if (params.reason === GridCellEditStopReasons.cellFocusOut) {
        //     event.defaultMuiPrevented = true;
        //   }
        // }}
      />
    </div>
  );
};
