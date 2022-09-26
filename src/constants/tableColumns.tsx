import React from "react";
import { GridActionsColDef, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { ActionsCellItem } from "components/ActionsCellItem";

export const PRICEBOOKS_COLS: GridColDef[] = [
  {
    field: "affectedDistributors",
    headerName: "DA",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: true,
  },
  {
    field: "lastMonthSettlement",
    headerName: "TL",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: true,
  },
  {
    field: "currentMonthSettlement",
    headerName: "L",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: true,
  },
  {
    field: "subPriceBooks",
    headerName: "Sub Libros",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: true,
  },
  {
    field: "createdBy",
    headerName: "Creador",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: true,
  },
  {
    field: "createdAt",
    headerName: "Fecha",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: true,
  },
];

export const DISTRIBUTOR_COLS: GridColDef[] = [
  {
    field: "fullNameWithDni",
    headerName: "Usuario",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: true,
  },
  {
    field: "branchName",
    headerName: "Sucursal",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: true,
  },
  {
    field: "vehicleName",
    headerName: "Vehículo",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: true,
  },
  {
    field: "priceBookName",
    headerName: "Libro",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: true,
  },
];

export const ITEMS_CHART_COLS: GridColDef[] = [
  {
    field: "concept",
    headerName: "ID",
    headerAlign: "center",
    align: "center",
    width: 50,
    sortable: true,
  },
  {
    field: "description",
    headerName: "Item",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: true,
  },
  {
    field: "amount",
    headerName: "Importe",
    headerAlign: "center",
    editable: true,
    align: "center",
    flex: 1,
    width: 50,
    sortable: true,
  },
];

export const ACTIONS_COL: GridActionsColDef = {
  field: "actions",
  headerName: " ",
  width: 50,
  sortable: false,
  type: "actions",
  getActions: (params: GridRowParams) => [
    <ActionsCellItem key={params.row.id} id={params.row.id} type="Delete" />,
  ],
};
