import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";
import React from "react";

import styles from "./index.module.scss";

export interface CatalogConceptTableRow {
  concept: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
}

export interface CatalogConceptTableProps {
  rows: CatalogConceptTableRow[];
  columns: GridColDef[];
}

export const CatalogConceptTable: React.FC<CatalogConceptTableProps> = ({ rows, columns }) => {
  return (
    <DataGrid
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
  );
};
