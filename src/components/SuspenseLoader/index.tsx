import { CircularProgress } from "@mui/material";
import React from "react";

import styles from "./index.module.scss";

export interface SuspenseLoaderProps {}

export const SuspenseLoader: React.FC<SuspenseLoaderProps> = () => {
  return (
    <div className={styles["suspense-container"]}>
      <CircularProgress className={styles["suspense-loader"]} />
    </div>
  );
};
