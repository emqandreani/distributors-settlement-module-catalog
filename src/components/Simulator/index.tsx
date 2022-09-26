import { faArrowLeft, faSave } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectorPriceBooks } from "app/slices/priceBooks";
import { SecondaryButton } from "components/SecondaryButton";
import { SelectionPanel } from "components/SelectionPanel";
import { SimulatorPanel } from "components/SimulatorPanel";
import { Toggler } from "components/Toggler";
import { IPriceBook } from "interfaces/PriceBook";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./index.module.scss";

export interface SimulatorProps {}

export const Simulator: React.FC<SimulatorProps> = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { priceBook } = useSelector(selectorPriceBooks);

  const handleSelection = () => {
    setIsSelected(true);
  };

  return (
    <div className={styles["simulator-container"]}>
      <div className={styles["buttons-wrapper"]}>
        <SecondaryButton icon={faArrowLeft} path="./.." text="Volver" />
        <button className={styles["simulator-button"]} type="button" onClick={handleSelection}>
          <FontAwesomeIcon icon={faSave} />
          <span>{isSelected ? "Guardar borrador" : "Comparar"}</span>
        </button>
      </div>
      {isSelected && (
        <span className={styles["inline-flex"]}>
          <Toggler />
        </span>
      )}
      <div className={styles["panels-wrapper"]}>
        {!isSelected && (
          <>
            <SelectionPanel headerText="Seleccione libro de precio base" type="base" />{" "}
            <SelectionPanel headerText="Seleccione libro de precio a comparar" type="new" />
          </>
        )}
        {isSelected && priceBook && (
          <>
            <SimulatorPanel priceBook={priceBook as IPriceBook} type="base" />
            <SimulatorPanel priceBook={priceBook as IPriceBook} type="new" />
          </>
        )}
      </div>
    </div>
  );
};