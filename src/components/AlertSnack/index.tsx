import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

import styles from "./index.module.scss";

export interface AlertSnackProps {
  open: boolean;
  onClose: () => void;
  type: string;
  message: string;
}

export const AlertSnack: React.FC<AlertSnackProps> = ({ open, type, message, onClose }) => {
  const [severity, setSeverity] = useState<"success" | "info" | "warning" | "error">();

  useEffect(() => {
    if (type === "deleted") {
      setSeverity("error");
    } else if (type === "updated") {
      setSeverity("success");
    } else if (type === "added") {
      setSeverity("info");
    }

    return () => {
      setSeverity(undefined);
    };
  }, [type]);

  if (type) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        className={styles["alert-snackbar"]}
        open={open}
      >
        <Alert severity={severity} onClose={onClose}>
          {message}
        </Alert>
      </Snackbar>
    );
  }

  return null;
};
