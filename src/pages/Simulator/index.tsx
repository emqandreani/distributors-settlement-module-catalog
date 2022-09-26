import { Simulator } from "components/Simulator";
import React from "react";

import styles from "./index.module.scss";
const CatalogSimulatorPage = () => {
  return (
    <div className={styles["simulator-page-container"]}>
      <Simulator />
    </div>
  );
};

export default CatalogSimulatorPage;
