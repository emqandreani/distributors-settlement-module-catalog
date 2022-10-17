import { priceBookConceptColumns } from "constants/priceBookConceptColumns";
import { PANEL_TYPE } from "constants/simulatorPanels";

import { priceBookHeaderAdapater } from "adapters/priceBookHeaderAdapter";
import { PriceBookConcept } from "components/PriceBookConcept";

import React from "react";
import { useSelector } from "react-redux";

import { Input } from "@architecture-it/stylesystem";

import { priceBookConceptsTableAdapter } from "adapters/priceBookConceptsTableAdapter";

import styles from "./index.module.scss";
import { IPriceBook } from "interfaces/pricebook";
import { selectorLayout } from "features/layout/slice";
import { IPriceBookItem } from "interfaces/pricebook-item";

export interface SimulatorPanelProps {
  priceBook: IPriceBook;
  type: "base" | "new";
}

export const SimulatorPanel: React.FC<SimulatorPanelProps> = ({ priceBook, type }) => {
  const { ...headerProps } = priceBookHeaderAdapater(priceBook as IPriceBook);
  const { toggleSimulatorPanel } = useSelector(selectorLayout);
  const handleToggleStyles = (isToggled: boolean, type: "base" | "new") => {
    return isToggled && type === PANEL_TYPE.BASE
      ? "hidden"
      : isToggled && type === PANEL_TYPE.NEW
      ? "simulator-panel-container-collapsed"
      : "simulator-panel-container";
  };

  return (
    <div className={styles[handleToggleStyles(toggleSimulatorPanel, type)]}>
      <div className={styles["simulator-header-wrapper"]}>
        {type === PANEL_TYPE.BASE && (
          <h2 className={styles["inline-flex"]}>
            <strong>{headerProps.name}</strong>
            <span
              className={
                styles[
                  `${headerProps.priceBookState.replace(/\s/g, "").toLocaleLowerCase()}-state-value`
                ]
              }
            >
              ({headerProps.priceBookState})
            </span>
          </h2>
        )}
        {type === PANEL_TYPE.NEW && (
          <div className={styles["inline-flex"]}>
            <h2>Nombre:</h2>
            <Input title="Ingrese nombre" value={headerProps.name} />
          </div>
        )}
        {type === PANEL_TYPE.BASE && (
          <span className={styles["inline-flex"]}>
            <p>
              <strong>Vigencia:</strong> {headerProps.startDate} - {headerProps.endDate}
            </p>
            <p className={styles["remaining-days-value"]}>
              (Quedan {headerProps.remainingDays} días de vigencia)
            </p>
          </span>
        )}
        {type === PANEL_TYPE.NEW && (
          <span className={styles["inline-flex"]}>
            <p>
              <strong>Vigencia: </strong>
            </p>
            <Input placeholder="Desde" size="medium" type="date" />
            <Input placeholder="Hasta" size="medium" type="date" />
          </span>
        )}
      </div>
      <hr className={styles["wrapper-divider"]} />
      <div className={styles["simulator-info-wrapper"]}>
        <p className={styles["inline-flex"]}>
          <strong>Cantidad de conceptos: </strong>
          {Number(priceBook.serviceConceptItems?.length) +
            Number(priceBook.distributionConceptItems?.length) ?? ""}
        </p>
        {type === PANEL_TYPE.BASE && (
          <p className={styles["inline-flex"]}>
            <strong>Distribuidores afectados: </strong>
            {priceBook.affectedDistributors}
          </p>
        )}
        {type === PANEL_TYPE.NEW && (
          <div className={styles["inline-flex"]}>
            <strong>Distribuidores afectados: </strong>
            <Input size="small" type="number" value={priceBook.affectedDistributors} />
          </div>
        )}
        <p className={styles["inline-flex"]}>
          <strong>Liquidado hasta la fecha: </strong>${priceBook.currentMonthSettlement}
        </p>
        <p className={styles["inline-flex"]}>
          <strong>Creador: </strong>
          {priceBook.createdBy}
        </p>
        <p className={styles["inline-flex"]}>
          <strong>Fecha: </strong>
          {new Date(priceBook.createdAt).toLocaleDateString()}
        </p>
      </div>
      <hr className={styles["wrapper-divider"]} />
      <PriceBookConcept
        defaultOpen={true}
        priceBookConceptColumns={priceBookConceptColumns}
        rows={priceBookConceptsTableAdapter(
          priceBook,
          priceBook.distributionConceptItems as IPriceBookItem[]
        )}
        tableTitle="Conceptos de distribución"
        type="distribution"
      />
      <PriceBookConcept
        defaultOpen={true}
        priceBookConceptColumns={priceBookConceptColumns}
        rows={priceBookConceptsTableAdapter(
          priceBook,
          priceBook.serviceConceptItems as IPriceBookItem[]
        )}
        tableTitle="Conceptos de servicio"
        type="service"
      />
    </div>
  );
};
