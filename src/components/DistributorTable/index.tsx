import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";
import useAssignedDistributors from "hooks/useAssignedDistributors";
import { IDistributor } from "interfaces/distributor";
import React from "react";

import styles from "./index.module.scss";

export interface DistributorTableProps {
  columns: GridColDef[];
  rows: IDistributor[] | [];
}

export const DistributorTable: React.FC<DistributorTableProps> = ({ columns, rows }) => {
  const { handleSelection } = useAssignedDistributors(rows);

  return (
    <div className={styles["distributor-table-container"]}>
      <DataGrid
        checkboxSelection
        disableColumnMenu
        hideFooterSelectedRowCount
        className={styles["data-grid"]}
        columns={columns}
        getRowClassName={() => {
          return styles["table-row"];
        }}
        getRowId={(row) => row.distributorId}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        pageSize={20}
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
