import { Select } from "@architecture-it/stylesystem";
import { MenuItem } from "@mui/material";
import { useLocalSelector } from "app/store";
import { selectorPricebook } from "features/pricebook/slice";
import React from "react";

import useApplicationLevelFilters from "./hooks";
import styles from "./index.module.scss";

export interface ApplicationLevelFiltersProps {
  type: "assign" | "addItem";
}

export const ApplicationLevelFilters: React.FC<ApplicationLevelFiltersProps> = ({ type }) => {
  const {
    regionalValue,
    branchValue,
    vehicleValue,
    distributorValue,
    handleRegionalValue,
    handleBranchValue,
    handleVehicleValue,
    handleDistributorValue,
  } = useApplicationLevelFilters();
  const {
    basePriceBookForAddition,
    selectedRegionalPriceBookForAddition,
    selectedBranchPriceBookForAddition,
    selectedVehiclePriceBookForAddition,
  } = useLocalSelector(selectorPricebook);

  return (
    <div className={styles["application-level-wrapper"]}>
      <Select
        className={styles["__select"]}
        label="Por zona"
        name={basePriceBookForAddition?.name}
        value={regionalValue ?? ""}
        onChange={handleRegionalValue}
      >
        <MenuItem value={basePriceBookForAddition?.id}>Default</MenuItem>
        {basePriceBookForAddition &&
          basePriceBookForAddition.priceBookChildren.map(({ id, name }) => {
            return (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            );
          })}
      </Select>
      {selectedRegionalPriceBookForAddition &&
        selectedRegionalPriceBookForAddition?.priceBookChildren.length > 0 && (
          <Select
            className={styles["__select"]}
            label="Por sucursal"
            name={selectedRegionalPriceBookForAddition?.name}
            value={branchValue ?? ""}
            onChange={handleBranchValue}
          >
            <MenuItem value={selectedRegionalPriceBookForAddition?.id}>Default</MenuItem>
            {selectedRegionalPriceBookForAddition &&
              selectedRegionalPriceBookForAddition.priceBookChildren.map(({ id, name }) => {
                return (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                );
              })}
          </Select>
        )}
      {selectedBranchPriceBookForAddition &&
        selectedBranchPriceBookForAddition?.priceBookChildren.length > 0 && (
          <Select
            className={styles["__select"]}
            label="Por vehículo"
            name={selectedBranchPriceBookForAddition?.name}
            value={vehicleValue ?? ""}
            onChange={handleVehicleValue}
          >
            <MenuItem value={selectedBranchPriceBookForAddition.id}>Default</MenuItem>
            {selectedBranchPriceBookForAddition &&
              selectedBranchPriceBookForAddition.priceBookChildren.map(({ id, name }) => {
                return (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                );
              })}
          </Select>
        )}
      {selectedVehiclePriceBookForAddition &&
        type === "addItem" &&
        selectedVehiclePriceBookForAddition?.priceBookChildren.length > 0 && (
          <Select
            className={styles["__select"]}
            label="Por transportista"
            name={selectedVehiclePriceBookForAddition?.name}
            value={distributorValue ?? ""}
            onChange={handleDistributorValue}
          >
            <MenuItem value={selectedVehiclePriceBookForAddition.id}>Default</MenuItem>
            {selectedVehiclePriceBookForAddition &&
              selectedVehiclePriceBookForAddition.priceBookChildren.map(({ id, name }) => {
                return (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                );
              })}
          </Select>
        )}
    </div>
  );
};
