import { CONCEPT_COL } from "constants/tableColumns";

import { CatalogConceptTable } from "components/CatalogConceptTable";
import React from "react";
import { SecondaryButton } from "components/SecondaryButton";
import { faArrowLeft, faPlus } from "@fortawesome/pro-regular-svg-icons";
import { PrimaryButton } from "components/PrimaryButton";
import { AccordionWrapper } from "components/AccordionWrapper";
import { SearchInput } from "components/SearchInput";
import { useLocalDispatch, useLocalSelector } from "app/store";
import { selectorLayout, toggleCatalogDialog } from "features/layout/slice";
import { CatalogConceptDialog } from "components/CatalogConceptDialog";

import styles from "./index.module.scss";

const CatalogConceptsPage = () => {
  const { toggleCatalogConceptDialog } = useLocalSelector(selectorLayout);
  const dispatch = useLocalDispatch();

  return (
    <div className={styles["concept-container"]}>
      <div className={styles["buttons-wrapper"]}>
        <SecondaryButton icon={faArrowLeft} path="./.." text="Volver" />
        <PrimaryButton
          icon={faPlus}
          text="Crear concepto"
          onClick={() => dispatch(toggleCatalogDialog(true))}
        />
      </div>
      <hr />
      <AccordionWrapper defaultOpen title="Conceptos de distribución">
        <SearchInput
          handleSearch={() => console.log("Distribution search")}
          handleSubmit={() => console.log("handleSubmit distribution")}
          value={"distribution value"}
        />
        <CatalogConceptTable columns={CONCEPT_COL} rows={[]} />
      </AccordionWrapper>
      <AccordionWrapper defaultOpen title="Conceptos de servicio">
        <SearchInput
          handleSearch={() => console.log("service search")}
          handleSubmit={() => console.log("handleSubmit service")}
          value={"service value"}
        />
        <CatalogConceptTable columns={CONCEPT_COL} rows={[]} />
      </AccordionWrapper>
      {toggleCatalogConceptDialog && <CatalogConceptDialog open={toggleCatalogConceptDialog} />}
    </div>
  );
};

export default CatalogConceptsPage;
