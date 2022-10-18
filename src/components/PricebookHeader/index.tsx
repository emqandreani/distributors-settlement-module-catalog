import { Input } from "@architecture-it/stylesystem";
import { faArrowLeft, faCodeCompare, faPlus, faSave } from "@fortawesome/pro-regular-svg-icons";
import { FormLabel, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { PrimaryButton } from "components/PrimaryButton";
import { SecondaryButton } from "components/SecondaryButton";
import React, { ReactNode, useMemo } from "react";
import { useDispatch } from "react-redux";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { usePriceBookHeader } from "./hooks";
import { useNavigate } from "react-router";

import styles from "./index.module.scss";
import { toggleConceptDialog } from "features/layout";
import { useLocalDispatch } from "app/store";
import { saveEditedPriceBook, saveNewPriceBook } from "features/pricebook";

export interface PricebookHeaderProps {
  backTo?: {
    name: string;
    path: string;
  };
}
interface PriceBookHeaderBaseProps {
  children: ReactNode;
  backTo?: {
    name: string;
    path: string;
  };
  saveBtn?: boolean;
}

const location = window.location.href;

const PriceBookHeaderBase: React.FC<PriceBookHeaderBaseProps> = ({ children, backTo, saveBtn }) => {
  const dispatch = useLocalDispatch();

  const navigate = useNavigate();

  return (
    <div className={styles["header-container"]}>
      <div className={styles["buttons-row"]}>
        <div className={styles["left-group"]}>
          {backTo && <SecondaryButton icon={faArrowLeft} path={backTo.path} text={backTo.name} />}
        </div>
        <div className={styles["right-group"]}>
          <PrimaryButton
            icon={faPlus}
            text="Asignar libro"
            onClick={() => navigate("/catalogo/assign")}
          />
          {!location.includes("create") && (
            <>
              <PrimaryButton
                icon={faPlus}
                text="Agregar item facturable"
                onClick={() => dispatch(toggleConceptDialog(true))}
              />
              <PrimaryButton icon={faCodeCompare} text="Simular" />
            </>
          )}

          {saveBtn && (
            <PrimaryButton
              icon={faSave}
              text="Guardar"
              onClick={() =>
                dispatch(
                  !location.includes("create") ? saveEditedPriceBook(true) : saveNewPriceBook(true)
                )
              }
            />
          )}
        </div>
      </div>
      {children}
      <hr className={styles["pricebook-divider"]} />
    </div>
  );
};

const PriceBookHeaderChildren: React.FC = () => {
  const {
    index,
    name,
    priceBookState,
    remainingDays,
    startDate,
    endDate,
    affectedDistributors,
    currentMonthSettlement,
    createdBy,
    createdAt,
  } = usePriceBookHeader();

  return (
    <>
      {" "}
      <div className={styles["pricebook-header-top"]}>
        <h2 className={styles["pricebook-name"]}>
          {index} / {name} ({priceBookState})
        </h2>
        <span className={styles["pricebook-vigency"]}>
          <p>
            <strong>Vigencia:</strong> {startDate} - {endDate}
          </p>
          <p className={styles["vigency-alert"]}>(Quedan {remainingDays} días de vigencia)</p>
        </span>
      </div>
      <hr className={styles["pricebook-divider"]} />
      <div className={styles["pricebook-header-bottom"]}>
        <p>
          <strong>Distribuidores afectados: </strong>
          {affectedDistributors}
        </p>
        <p>
          <strong>Liquidado hasta la fecha: </strong>${currentMonthSettlement}
        </p>
        <p>
          <strong>Creador: </strong>
          {createdBy}
        </p>
        <p>
          <strong>Fecha: </strong>
          {createdAt}
        </p>
      </div>
    </>
  );
};

export const PricebookHeader: React.FC<PricebookHeaderProps> = ({ backTo }) => {
  return (
    <PriceBookHeaderBase backTo={backTo}>
      <PriceBookHeaderChildren />
    </PriceBookHeaderBase>
  );
};

const PriceBookHeaderManageChildren: React.FC = () => {
  const {
    name,
    startDateValue,
    endDateValue,
    nameValue,
    handleStartDate,
    handleEndDate,
    handleNameValue,
    editPbId,
  } = usePriceBookHeader();

  return (
    <form className={styles["header-form"]}>
      <FormLabel className={styles["header-label"]}>
        {!editPbId && (
          <h3>
            <strong>Libro padre:</strong> {name}
          </h3>
        )}
      </FormLabel>
      <FormLabel className={styles["header-label"]}>
        {!editPbId ? (
          <>
            <h3>Nombre nuevo libro:</h3>
            <Input value={nameValue} onChange={handleNameValue} />
          </>
        ) : (
          <>
            <h3>
              Renombrar <strong>{name}</strong>:
            </h3>
            <Input value={nameValue} onChange={handleNameValue} />
          </>
        )}
      </FormLabel>
      <FormLabel className={styles["header-label"]}>
        <p>Vigencia:</p>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            inputFormat="dd/MM/yyyy"
            label="Desde"
            renderInput={(params) => <TextField {...params} />}
            value={startDateValue}
            onChange={handleStartDate}
          />
          <DatePicker
            inputFormat="dd/MM/yyyy"
            label="Hasta"
            renderInput={(params) => <TextField {...params} />}
            value={endDateValue}
            onChange={handleEndDate}
          />
        </LocalizationProvider>
      </FormLabel>
      <p>Cantidad de conceptos totales:</p>
    </form>
  );
};

export const PriceBookHeaderManage: React.FC<PricebookHeaderProps> = ({ backTo }) => {
  return (
    <PriceBookHeaderBase backTo={backTo} saveBtn={true}>
      <PriceBookHeaderManageChildren />
    </PriceBookHeaderBase>
  );
};
