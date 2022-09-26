import useToggler from "hooks/useToggler";
import React from "react";

import styles from "./index.module.scss";

export interface TogglerProps {}

export const Toggler: React.FC<TogglerProps> = () => {
  const { checked, toggleCheck } = useToggler();

  return (
    <div className={styles["toggler-container"]}>
      <div
        className={styles["toggler-wrapper"]}
        style={{ backgroundColor: checked ? "var(--secondary-blue)" : "var(--gray-300)" }}
      >
        <input
          checked={checked}
          className={styles["toggler-input"]}
          id="toggler"
          type="checkbox"
          onChange={toggleCheck}
        />
        <label className={styles["toggler-label"]} htmlFor="toggler">
          <div className={styles["toggler-ball"]} />
        </label>
      </div>
      <p className={styles["toggler-text"]}>
        {checked ? "Mostrar libro base" : "Ocultar libro base"}
      </p>
    </div>
  );
};
