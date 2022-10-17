import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";
import React from "react";

import styles from "./index.module.scss";
import { IPriceBookConceptsTable } from "interfaces/pricebook";
import useConceptDialogTable from "./hooks";

export interface ConceptDialogTableProps {
  columns: GridColDef[];
  rows: IPriceBookConceptsTable[] | [];
}

export const ConceptDialogTable: React.FC<ConceptDialogTableProps> = ({ rows, columns }) => {
  const { handleSelection } = useConceptDialogTable(rows);

  return (
    <div className={styles["concept-dialog-container"]}>
      <DataGrid
        checkboxSelection
        disableColumnMenu
        hideFooterSelectedRowCount
        className={styles["data-grid"]}
        columns={columns}
        getRowClassName={() => {
          return styles["table-row"];
        }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        pageSize={6}
        rows={rows ?? []}
        sx={{
          ".MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
        onSelectionModelChange={handleSelection}
      />
    </div>
  );
};
