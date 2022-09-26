import { ACTIONS_COL } from "constants/tableColumns";

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IPriceBookConceptsTable } from "adapters/priceBookConceptsTableAdapter";
import { NoRowsPriceBookConcept } from "components/NoRows";

import styles from "./index.module.scss";

export interface PriceBookConceptTableProps {
  columns: GridColDef[];
  rows: IPriceBookConceptsTable[];
  isActive?: boolean;
}

export const PriceBookConceptTable: React.FC<PriceBookConceptTableProps> = ({ columns, rows }) => {
  return (
    <div className={styles["data-container"]}>
      {columns.length > 0 && (
        <DataGrid
          disableColumnMenu
          disableSelectionOnClick
          hideFooterSelectedRowCount
          className={styles["data-table"]}
          columns={[...columns, ACTIONS_COL]}
          components={{
            NoRowsOverlay: NoRowsPriceBookConcept,
          }}
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
        />
      )}
    </div>
  );
};
