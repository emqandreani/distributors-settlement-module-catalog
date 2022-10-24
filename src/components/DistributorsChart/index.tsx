import { STATUS } from "constants/status";

import { Button } from "@architecture-it/stylesystem";
import { ApplicationLevelFilters } from "components/ApplicationLevelFilters";
import { DistributorsChartList } from "components/DistributorsChartList";
import React from "react";
import { selectorDistributor } from "features/distributor/slice";
import { useLocalSelector } from "app/store";

import styles from "./index.module.scss";
import useAssignPriceBook from "./hooks";

export interface DistributorsChartProps {}

export const DistributorsChart: React.FC<DistributorsChartProps> = () => {
  const { handleAssignPriceBook } = useAssignPriceBook();
  const { postResponse } = useLocalSelector(selectorDistributor);

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
          disabled={postResponse?.status === STATUS.PENDING}
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
