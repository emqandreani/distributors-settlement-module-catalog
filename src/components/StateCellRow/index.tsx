import React from "react";

import styles from "./index.module.scss";

export interface StateCellRowProps {
  values: string[];
}

export const StateCellRow: React.FC<StateCellRowProps> = ({ values }) => {
  return (
    <ul className={styles["state-cell-wrapper"]}>
      <li className={styles[`${values[0].replace(/\s/g, "").toLocaleLowerCase()}-state-value`]}>
        {values[0]}
      </li>
      {values[1] && <li className={styles["remaining-days-value"]}>(Quedan {values[1]} días)</li>}
    </ul>
  );
};
