import { STATUS } from "constants/status";

import { Button } from "@architecture-it/stylesystem";
import { selectorDistributor } from "app/slices/distributor";
import { ApplicationLevelFilters } from "components/ApplicationLevelFilters";
import { DistributorsChartList } from "components/DistributorsChartList";
import useAssignPriceBook from "hooks/useAssignPriceBook";
import React from "react";
import { useSelector } from "react-redux";

import styles from "./index.module.scss";

export interface DistributorsChartProps {}

export const DistributorsChart: React.FC<DistributorsChartProps> = () => {
  const { handleAssignPriceBook } = useAssignPriceBook();
  const { assignDistributorsRequest } = useSelector(selectorDistributor);

  return (
    <div className={styles["distributors-chart-container"]}>
      <h2>Asignar libro</h2>
      <ApplicationLevelFilters type="assign" />
      <div className={styles["inline_flex"]}>
        <p>
          <strong>Libro seleccionado:</strong>
        </p>
        <Button
          color="primary"
          disabled={assignDistributorsRequest?.status === STATUS.PENDING}
          text="Asignar"
          type="button"
          variant="contained"
          onClick={handleAssignPriceBook}
        />
      </div>
      <div className={styles["inline_flex"]}>
        <strong>
          <p className={styles["red_text"]}>Usuarios a asignar:</p>
        </strong>
      </div>
      <hr className={styles["divider"]} />
      <DistributorsChartList />
    </div>
  );
};
