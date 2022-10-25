import { CONCEPT_COL } from "constants/tableColumns";

import { CatalogConceptTable } from "components/CatalogConceptTable";
import React from "react";

import styles from "./index.module.scss";

const CatalogConceptsPage = () => {
  return (
    <div className={styles["concept-container"]}>
      <CatalogConceptTable columns={CONCEPT_COL} rows={[]} />
    </div>
  );
};

export default CatalogConceptsPage;
