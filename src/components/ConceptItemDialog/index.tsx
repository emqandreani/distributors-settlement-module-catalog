import { Button } from "@architecture-it/stylesystem";
import { faArrowLeft, faPlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { PrimaryButton } from "components/PrimaryButton";
import { ConceptContainer } from "containers/ConceptContainer";
import { toggleConceptDialog } from "features/layout";
import { addConceptItems } from "features/pricebook";
import React from "react";
import useDispatchPriceBookItem from "./hooks";

import styles from "./index.module.scss";

export interface ConceptItemDialogProps {
  open: boolean;
  priceBookName: string;
}

export const ConceptItemDialog: React.FC<ConceptItemDialogProps> = ({ open, priceBookName }) => {
  const { dispatch, handleDispatchItems } = useDispatchPriceBookItem();

  return (
    <Dialog fullWidth className={styles["dialog-wrapper"]} maxWidth="xl" open={open}>
      <DialogTitle className={styles["__title"]}>
        <FontAwesomeIcon icon={faPlus} />
        <span> Agregar item facturable</span>
      </DialogTitle>
      <DialogTitle className={styles["__subtitle"]}>
        <strong>Libro de precios:</strong> {priceBookName}
      </DialogTitle>
      <DialogContent sx={{ height: 400 }}>
        <ConceptContainer />
      </DialogContent>
      <DialogActions>
        <PrimaryButton
          icon={faArrowLeft}
          text="Volver"
          onClick={() => {
            dispatch(addConceptItems([]));
            dispatch(toggleConceptDialog(false));
          }}
        />
        <Button
          color="primary"
          text="Confirmar"
          variant="contained"
          onClick={() => {
            handleDispatchItems();
            dispatch(addConceptItems([]));
            dispatch(toggleConceptDialog(false));
          }}
        />
      </DialogActions>
    </Dialog>
  );
};
