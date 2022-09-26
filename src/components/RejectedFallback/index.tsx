import { Button } from "@architecture-it/stylesystem";
import React from "react";

import styles from "./index.module.scss";

export interface RejectedFallbackProps {}

export const RejectedFallback: React.FC<RejectedFallbackProps> = () => {
  return (
    <div className={styles.root}>
      <h1>Por favor, reinicia tu sesión de usuario</h1>
      <a href="/login">
        <Button color="primary" text={"Volver a login"} variant={"contained"} />
      </a>
    </div>
  );
};
