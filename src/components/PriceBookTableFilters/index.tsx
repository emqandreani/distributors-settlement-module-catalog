import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { Checkbox } from "@mui/material";
import { useLocalSelector } from "app/store";
import { PrimaryButton } from "components/PrimaryButton";
import { SearchInput } from "components/SearchInput";
import { filterPriceBookByString, selectorPricebook } from "features/pricebook/slice";
import usePriceBookTableFilters from "hooks/usePriceBookTableFilters";
import useSearchInput from "hooks/useSearchInput";
import { ApplicationLevelTypeName } from "interfaces/ApplicationLevel";
import { IPriceBook } from "interfaces/pricebook";
import React from "react";

import styles from "./index.module.scss";
export interface PriceBookTableFiltersProps {}

export const PriceBookTableFilters: React.FC<PriceBookTableFiltersProps> = () => {
  const { FILTER_STATES, checkRef, handleCheck } = usePriceBookTableFilters();
  const { value, handleSearch, handleSubmit } = useSearchInput({
    submitAction: filterPriceBookByString,
  });
  const { data } = useLocalSelector(selectorPricebook);
  const {
    applicationLevel: { applicationLevelTypeName },
  } = data as IPriceBook;

  return (
    <div className={styles["pricebook-filter-container"]}>
      <div className={styles["filter-wrapper-top"]}>
        {FILTER_STATES &&
          FILTER_STATES.map(({ name, value }) => {
            const stateClassNameStr = name.replace(/\s/g, "").toLocaleLowerCase();

            return (
              <label key={stateClassNameStr} className={styles["state-wrapper"]}>
                <Checkbox ref={checkRef} color="error" onChange={() => handleCheck(name)} />
                <p className={styles["state-name"]}>{name}</p>
                <span
                  className={styles[`${stateClassNameStr}-state-amount`]}
                  style={{ color: "white" }}
                >
                  {value}
                </span>
              </label>
            );
          })}
      </div>
      <div className={styles["filter-wrapper-bottom"]}>
        {applicationLevelTypeName !== ApplicationLevelTypeName.Vehicle && (
          <PrimaryButton icon={faPlus} path="/catalogo/manage/create" text="Agregar nuevo libro" />
        )}
        <SearchInput handleSearch={handleSearch} handleSubmit={handleSubmit} value={value} />
      </div>
    </div>
  );
};
