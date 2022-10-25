import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";
import React from "react";

import styles from "./index.module.scss";

export interface CatalogConceptTableProps {
  rows: any;
  columns: GridColDef[];
}

export const CatalogConceptTable: React.FC<CatalogConceptTableProps> = ({ rows, columns }) => {
  return (
    <div className={styles["catalog-concept-table"]}>
      <DataGrid
        checkboxSelection
        disableColumnMenu
        hideFooterSelectedRowCount
        className={styles["data-grid"]}
        columns={columns}
        getRowClassName={() => {
          return styles["table-row"];
        }}
        getRowId={(row) => row.concept}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        pageSize={6}
        rows={rows ?? []}
        sx={{
          ".MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
      />
    </div>
  );
};
