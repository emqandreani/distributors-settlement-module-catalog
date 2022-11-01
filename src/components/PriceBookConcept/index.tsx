import { CONCEPTS } from "constants/concepts";

import { faAngleDown } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useLocalDispatch } from "app/store";
import { PriceBookConceptTable } from "components/PriceBookConceptTable";
import { SearchInput } from "components/SearchInput";
import { searchConceptFlag } from "features/pricebook";
import { setSearchValues } from "features/search";
import useSearchInput from "hooks/useSearchInput";
import { IPriceBookConceptsTable } from "interfaces/pricebook";
import React, { useState } from "react";

import styles from "./index.module.scss";

export interface PriceBookConceptProps {
  tableTitle: string;
  rows: IPriceBookConceptsTable[];
  priceBookConceptColumns: GridColDef[];
  defaultOpen: boolean;
  type: "service" | "distribution";
}

export const PriceBookConcept: React.FC<PriceBookConceptProps> = ({
  tableTitle,
  rows,
  priceBookConceptColumns,
  defaultOpen,
  type,
}) => {
  const [distriValue, setDistriValue] = useState<string>("");
  const [serviValue, setServiValue] = useState<string>("");
  //Need to control this defaultExpanded
  const dispatch = useLocalDispatch();

  const handleDistriSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDistriValue(e.target.value);
  };

  const handleServiSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setServiValue(e.target.value);
  };

  const handleDistriSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      setSearchValues({
        flag: CONCEPTS.DISTRIBUTION,
        searchValue: distriValue,
        selector: "pricebook",
      })
    );
  };

  const handleServiSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      setSearchValues({
        flag: CONCEPTS.SERVICE,
        searchValue: serviValue,
        selector: "pricebook",
      })
    );
  };

  return (
    <Accordion className={styles["concept-accordion-wrapper"]} defaultExpanded={defaultOpen}>
      <AccordionSummary
        aria-controls="panel2a-content"
        expandIcon={<FontAwesomeIcon className={styles["angle-down-icon"]} icon={faAngleDown} />}
        id="panel2a-header"
      >
        <div className={styles["pricebook-concept-header-top"]}>
          <h2 className={styles["pricebook-concept-title"]}>{tableTitle}</h2>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <SearchInput
          handleSearch={type === CONCEPTS.DISTRIBUTION ? handleDistriSearch : handleServiSearch}
          handleSubmit={type === CONCEPTS.DISTRIBUTION ? handleDistriSubmit : handleServiSubmit}
          value={type === CONCEPTS.DISTRIBUTION ? distriValue : serviValue}
        />
        <PriceBookConceptTable columns={priceBookConceptColumns} rows={rows} />
      </AccordionDetails>
    </Accordion>
  );
};
