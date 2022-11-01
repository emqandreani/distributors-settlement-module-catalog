import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { Checkbox } from "@mui/material";
import { useLocalDispatch, useLocalSelector } from "app/store";
import { PrimaryButton } from "components/PrimaryButton";
import { SearchInput } from "components/SearchInput";
import { selectorPricebook, setFilteredDataPricebook } from "features/pricebook/slice";
import { setSearchValues } from "features/search";
import usePriceBookTableFilters from "hooks/usePriceBookTableFilters";
import { IApplicationLevelTypeName } from "interfaces/enums";
import { IPriceBook } from "interfaces/pricebook";
import React, { useEffect, useState } from "react";

import styles from "./index.module.scss";
export interface PriceBookTableFiltersProps {}

export const PriceBookTableFilters: React.FC<PriceBookTableFiltersProps> = () => {
  const { FILTER_STATES, checkRef, handleCheck } = usePriceBookTableFilters();
  const [value, setValue] = useState<string>("");
  const { data } = useLocalSelector(selectorPricebook);
  const dispatch = useLocalDispatch();
  const {
    applicationLevel: { applicationLevelTypeName },
  } = data as IPriceBook;

  useEffect(() => {
    if (!value.length) {
      //Clearing filtered data, need to extend to others searches
      dispatch(setFilteredDataPricebook(null));
    }
  }, [dispatch, value.length]);

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
        {applicationLevelTypeName !== IApplicationLevelTypeName.Vehicle && (
          <PrimaryButton icon={faPlus} path="/catalogo/manage/create" text="Agregar nuevo libro" />
        )}
        <SearchInput
          handleSearch={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setValue(e.target.value.trim().toLocaleLowerCase());
          }}
          handleSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            dispatch(
              setSearchValues({
                selector: "pricebook",
                flag: "pricebook",
                searchValue: value,
              })
            );
          }}
          value={value}
        />
      </div>
    </div>
  );
};
