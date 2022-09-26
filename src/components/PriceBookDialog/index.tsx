import { Button } from "@architecture-it/stylesystem/Button";
import { faArrowLeft } from "@fortawesome/pro-regular-svg-icons";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import {
  addNewPriceBook,
  createPriceBook,
  modifyPriceBook,
  saveEditedPriceBook,
  saveNewPriceBook,
  selectorPriceBooks,
  updatePriceBook,
} from "app/slices/priceBooks";
import { PrimaryButton } from "components/PrimaryButton";
import { IPriceBookDto } from "interfaces/DTO/PriceBookDto";
import { IUpdatePriceBookDto } from "interfaces/DTO/UpdatePriceBookDto";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./index.module.scss";

export interface PriceBookDialogProps {
  open: boolean;
  requestType: "edit" | "create";
}

export const PriceBookDialog: React.FC<PriceBookDialogProps> = ({ open, requestType }) => {
  const dispatch = useDispatch();
  const { newPriceBook, editedPriceBook } = useSelector(selectorPriceBooks);

  return (
    <Dialog
      className={styles["dialog-wrapper"]}
      maxWidth="xl"
      open={open}
      sx={{
        "& .MuiPaper-root": {
          padding: "1rem",
          borderRadius: "1rem",
        },
      }}
    >
      <DialogTitle className={styles["__title"]}>
        {requestType === "create" ? "Nuevo libro de precios" : "Editar libro de precios"}
      </DialogTitle>
      <DialogContent style={{ color: "var(--gray-800)" }}>
        <p>
          <strong>Nombre: </strong>
          {newPriceBook?.name ?? editedPriceBook?.id}
        </p>
        <p>
          <strong>Vigencia: </strong>

          {requestType === "create" && (
            <>
              {new Date(newPriceBook?.startDate ?? new Date(Date.now())).toLocaleDateString()} -{" "}
              {new Date(newPriceBook?.endDate ?? new Date(Date.now())).toLocaleDateString()}
            </>
          )}
          {requestType === "edit" && (
            <>
              {new Date(editedPriceBook?.startDate ?? new Date(Date.now())).toLocaleDateString()} -{" "}
              {new Date(editedPriceBook?.endDate ?? new Date(Date.now())).toLocaleDateString()}
            </>
          )}
        </p>
        <hr />
        <h3>¿Desea {requestType === "create" ? "crear" : "editar"} este libro?</h3>
      </DialogContent>
      <DialogActions>
        <PrimaryButton
          icon={faArrowLeft}
          text="Cancelar"
          onClick={
            requestType === "create"
              ? () => {
                  dispatch(saveNewPriceBook(false));
                  dispatch(addNewPriceBook(null));
                }
              : () => {
                  dispatch(saveEditedPriceBook(false));
                  dispatch(updatePriceBook(null));
                }
          }
        />
        <Button
          color="primary"
          text="Confirmar"
          variant="contained"
          onClick={
            requestType === "create"
              ? () => {
                  dispatch(createPriceBook(newPriceBook as IPriceBookDto));
                  dispatch(saveNewPriceBook(false));
                  dispatch(addNewPriceBook(null));
                }
              : () => {
                  dispatch(modifyPriceBook(editedPriceBook as IUpdatePriceBookDto));
                  dispatch(saveEditedPriceBook(false));
                  dispatch(updatePriceBook(null));
                }
          }
        />
      </DialogActions>
    </Dialog>
  );
};
