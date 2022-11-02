import {
  DataGrid,
  GridActionsCellItem,
  GridActionsColDef,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { NoRowsPriceBook } from "components/NoRows";
import { StateCellRow } from "components/StateCellRow";
import { IPriceBooksTable } from "interfaces/pricebook";
import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./index.module.scss";

export interface PricebookTableProps {
  columns: GridColDef[];
  rows: IPriceBooksTable[];
  isActive?: boolean;
}

const idColumn: GridColDef = {
  field: "priceBookId",
  headerName: "ID",
  headerAlign: "center",
  align: "center",
  width: 50,
  sortable: true,
  renderCell: ({ value, row }) => {
    return (
      <Link className={styles["link-row"]} to={`${row.id}`}>
        {value}
      </Link>
    );
  },
};

const nameColumn: GridColDef = {
  field: "name",
  headerName: "Libro",
  headerAlign: "center",
  align: "center",
  flex: 1,
  renderCell: ({ value, row }) => {
    return (
      <Link className={styles["link-row"]} to={`${row.id}`}>
        {value}
      </Link>
    );
  },
};

const stateColumn: GridColDef = {
  field: "state",
  headerName: "Estado",
  headerAlign: "center",
  align: "center",
  flex: 1,
  renderCell: ({ value }) => {
    return <StateCellRow values={value} />;
  },
};

const customColumns = [idColumn, nameColumn, stateColumn];

export const PriceBookTable: React.FC<PricebookTableProps> = ({ columns, rows }) => {
  const navigate = useNavigate();

  const actionsColumn: GridActionsColDef = useMemo(() => {
    return {
      field: "actions",
      headerName: " ",
      width: 50,
      sortable: false,
      type: "actions",
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={params.id}
          showInMenu
          label="Ver"
          onClick={() => navigate(`./${params.id}`)}
        />,
        <GridActionsCellItem key={params.id} disabled showInMenu label="Duplicar" />,
        <GridActionsCellItem
          key={params.id}
          disabled
          showInMenu
          label="Editar"
          onClick={() => navigate(`/catalogo/manage/edit/${params.id}`)}
        />,
        <GridActionsCellItem key={params.id} disabled showInMenu label="Solicitar Aprobación" />,
        <GridActionsCellItem key={params.id} disabled showInMenu label="Simular" />,
      ],
    };
  }, [navigate]);

  return (
    <div className={styles["data-container"]}>
      {columns.length > 0 && (
        <DataGrid
          autoPageSize
          disableColumnMenu
          disableSelectionOnClick
          hideFooterSelectedRowCount
          className={styles["data-table"]}
          columns={[actionsColumn, ...customColumns].concat(columns)}
          components={{ NoRowsOverlay: NoRowsPriceBook }}
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
