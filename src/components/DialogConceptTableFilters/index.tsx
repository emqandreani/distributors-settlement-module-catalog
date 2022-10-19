import { Checkbox, FormLabel } from "@mui/material";
import { useLocalSelector } from "app/store";
import { ApplicationLevelFilters } from "components/ApplicationLevelFilters";
import { SearchInput } from "components/SearchInput";
import { searchConceptFlag, selectorPricebook } from "features/pricebook/slice";
import useSearchInput from "hooks/useSearchInput";
import React from "react";
import { useSelector } from "react-redux";

import useSelectConceptFilter from "./hooks";
import styles from "./index.module.scss";

export interface DialogConceptTableFiltersProps {}

export const DialogConceptTableFilters: React.FC<DialogConceptTableFiltersProps> = () => {
  const { selectedConcept } = useLocalSelector(selectorPricebook);
  const { selectValue, handleSelectValue } = useSelectConceptFilter();
  const { value, handleSubmit, handleSearch } = useSearchInput({
    submitAction: searchConceptFlag,
    extraPayload: selectedConcept,
  });

  return (
    <div className={styles["concept-table-filters-wrapper"]}>
      <ApplicationLevelFilters type="addItem" />
      <hr />
      <div className={styles["__inline-flex"]}>
        <FormLabel>
          <Checkbox
            checked={selectValue === "distribution" ?? false}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
            value="distribution"
            onChange={handleSelectValue}
          />
          Conceptos de distribucion
        </FormLabel>
        <FormLabel>
          <Checkbox
            checked={selectedConcept === "service" ? true : selectValue === "service" ?? false}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
            value="service"
            onChange={handleSelectValue}
          />
          Conceptos de servicios
        </FormLabel>
        <SearchInput handleSearch={handleSearch} handleSubmit={handleSubmit} value={value} />
      </div>
    </div>
  );
};
