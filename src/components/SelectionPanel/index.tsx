import React from "react";
import baseIcon from "assets/icons/tarifario_linea-gris-relleno.svg";
import newIcon from "assets/icons/simulacion_linea-gris-relleno.svg";
import { Select } from "@architecture-it/stylesystem";
import { MenuItem } from "@mui/material";
import useSelectionPanel from "hooks/useSelectionPanel";

import styles from "./index.module.scss";

export interface SelectionPanelProps {
  type: "base" | "new";
  headerText: string;
}

export const SelectionPanel: React.FC<SelectionPanelProps> = ({ type, headerText }) => {
  const { value, handleChange } = useSelectionPanel(type);

  return (
    <div className={styles["selection-panel-container"]}>
      <div className={styles["selection-header-wrapper"]}>
        <img
          alt={`${type}_icon`}
          className={styles["header-wrapper-icon"]}
          src={type === "base" ? baseIcon : newIcon}
        />
        <p className={styles["header-wrapper-text"]}>{headerText}</p>
      </div>
      <form className={styles["select-wrapper"]}>
        <Select label="Por zona" name="regionalPb" onChange={handleChange}>
          <MenuItem value="defaultRegional">Por zona</MenuItem>
        </Select>
        <Select label="Por sucursal" name="branchPb" onChange={handleChange}>
          <MenuItem value="defaultBranch">Por sucursal</MenuItem>
        </Select>
        <Select label="Por vehículo" name="vehiclePb" onChange={handleChange}>
          <MenuItem value="defaultVehicle">Por vehículo</MenuItem>
        </Select>
        <Select label="Por transportista" name="distributorPb" onChange={handleChange}>
          <MenuItem value="defaultDistributor">Por transportista</MenuItem>
        </Select>
      </form>
      <p>Seleccionado: {value ?? ""}</p>
    </div>
  );
};
