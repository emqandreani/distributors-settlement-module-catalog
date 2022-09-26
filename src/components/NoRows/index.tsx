import React, { ReactNode } from "react";
import conceptTruck from "assets/icons/buscarUnidad_linea-gris-relleno.png";
import itemChartTruck from "assets/icons/agregarVehiculo-gris.png";
import userListIcon from "assets/icons/MicrosoftTeams-image.png";
import userAssignSuccess from "assets/icons/colaboradores_colaborador-exito-relleno-gris.png";

import styles from "./index.module.scss";

export interface NoRowsBaseProps {
  children: ReactNode;
}
export interface NoRowsProps {}

const TEXT = {
  PriceBookConcept: "Todavía no agregaste ningún concepto",
  ItemChart: "Todavía no agregaste ningún item",
  PriceBookTable: "Todavía no agregaste ningún libro de precio",
  UserList: "Todavía no agregaste usuarios a quienes asignar un libro de precio",
  UserListAssignSuccess: "¡Asignados con éxito!",
};

export const NoRows: React.FC<NoRowsBaseProps> = ({ children }) => {
  return <div className={styles["no-rows-container"]}>{children}</div>;
};

export const NoRowsItemChart: React.FC<NoRowsProps> = () => {
  return (
    <NoRows>
      <img src={itemChartTruck} />
      <h2>{TEXT.ItemChart}</h2>
    </NoRows>
  );
};
export const NoRowsPriceBookConcept: React.FC<NoRowsProps> = () => {
  return (
    <NoRows>
      <img src={conceptTruck} />
      <h2>{TEXT.PriceBookConcept}</h2>
    </NoRows>
  );
};
export const NoRowsPriceBook: React.FC<NoRowsProps> = () => {
  return (
    <NoRows>
      <img src={conceptTruck} />
      <h2>{TEXT.PriceBookTable}</h2>
    </NoRows>
  );
};

export const NoRowsUser: React.FC<NoRowsProps> = () => {
  return (
    <NoRows>
      <img src={userListIcon} />
      <h2>{TEXT.UserList}</h2>
    </NoRows>
  );
};

export const NoRowsUserSuccessAsssign: React.FC<NoRowsProps> = () => {
  return (
    <NoRows>
      <img src={userAssignSuccess} />
      <h3>{TEXT.UserListAssignSuccess}</h3>
    </NoRows>
  );
};
