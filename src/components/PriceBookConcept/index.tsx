import { faAngleDown } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { IPriceBookConceptsTable } from "adapters/priceBookConceptsTableAdapter";
import { searchConceptFlag } from "app/slices/priceBooks";
import { PriceBookConceptTable } from "components/PriceBookConceptTable";
import { SearchInput } from "components/SearchInput";
import useSearchInput from "hooks/useSearchInput";
import React from "react";

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
  const { value, handleSubmit, handleSearch } = useSearchInput({
    extraPayload: type,
    submitAction: searchConceptFlag,
  });

  //Need to control this defaultExpanded

  return (
    <>
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
          <SearchInput handleSearch={handleSearch} handleSubmit={handleSubmit} value={value} />
          <PriceBookConceptTable columns={priceBookConceptColumns} rows={rows} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
