import { Button, Input } from "@architecture-it/stylesystem";
import { faArrowLeft } from "@fortawesome/pro-regular-svg-icons";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
} from "@mui/material";
import { PrimaryButton } from "components/PrimaryButton";
import React from "react";

import styles from "./index.module.scss";

export interface CatalogConceptDialogProps {
  open: boolean;
}

export const CatalogConceptDialog: React.FC<CatalogConceptDialogProps> = ({ open }) => {
  return (
    <Dialog className={styles["catalog-concept-dialog-container"]} maxWidth="lg" open={open}>
      <DialogTitle className={styles["dialog-title"]}>+ Crear concepto</DialogTitle>
      <DialogContent className={styles["checkbox-wrapper"]}>
        <FormLabel>
          <Checkbox value="value" />
          Conceptos de distribucion
        </FormLabel>
        <FormLabel>
          <Checkbox value="value" />
          Conceptos de servicio
        </FormLabel>
      </DialogContent>
      <DialogContent className={styles["textfield-wrapper"]}>
        <FormLabel>
          <Input placeholder="Nombre" value="" />
        </FormLabel>
        <FormLabel sx={{ height: "200px" }}>
          <Input placeholder="Descripcion" size="medium" value="" />
        </FormLabel>
      </DialogContent>
      <DialogActions>
        <PrimaryButton icon={faArrowLeft} text="Volver" />
        <Button text="Confirmar" variant="contained" />
      </DialogActions>
    </Dialog>
  );
};
