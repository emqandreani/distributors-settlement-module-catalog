import { faArrowLeft, faSave } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SecondaryButton } from "components/SecondaryButton";
import { SelectionPanel } from "components/SelectionPanel";
import { SimulatorPanel } from "components/SimulatorPanel";
import { Toggler } from "components/Toggler";
import { selectorPricebook } from "features/pricebook/slice";
import { IPriceBook } from "interfaces/pricebook";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./index.module.scss";

export interface SimulatorProps {}

export const Simulator: React.FC<SimulatorProps> = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { data } = useSelector(selectorPricebook);

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
        {isSelected && data && (
          <>
            <SimulatorPanel priceBook={data as IPriceBook} type="base" />
            <SimulatorPanel priceBook={data as IPriceBook} type="new" />
          </>
        )}
      </div>
    </div>
  );
};
