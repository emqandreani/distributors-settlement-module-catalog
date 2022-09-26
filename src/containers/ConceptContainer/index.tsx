import { priceBookConceptColumns } from "constants/priceBookConceptColumns";

import { priceBookConceptsTableAdapter } from "adapters/priceBookConceptsTableAdapter";
import { selectorPriceBooks } from "app/slices/priceBooks";
import { ConceptDialogTable } from "components/ConceptDialogTable";
import { IPriceBook } from "interfaces/PriceBook";
import React from "react";
import { useSelector } from "react-redux";
import { ItemsChart } from "components/ItemsChart";
import { DialogConceptTableFilters } from "components/DialogConceptTableFilters";
import { IPriceBookItem } from "interfaces/PriceBookItem";
import useConceptTables from "hooks/useConceptTables";
import useConceptContainer from "hooks/useConceptContainer";

import styles from "./index.module.scss";

export interface ConceptContainerProps {}

export const ConceptContainer: React.FC<ConceptContainerProps> = () => {
  const { currentPriceBook } = useConceptContainer();
  const { priceBook } = useSelector(selectorPriceBooks);

  const { filteredDistribution, filteredServices } = useConceptTables(
    currentPriceBook ?? (priceBook as IPriceBook)
  );

  const { basePriceBookForAddition, selectedConcept, addedConcepts } =
    useSelector(selectorPriceBooks);

  return (
    <div className={styles["concept-container"]}>
      <DialogConceptTableFilters />
      <div className={styles["__tables-wrapper"]}>
        {currentPriceBook && !filteredDistribution && !filteredServices && (
          <ConceptDialogTable
            columns={priceBookConceptColumns}
            rows={
              !selectedConcept
                ? []
                : priceBookConceptsTableAdapter(
                    basePriceBookForAddition as IPriceBook,
                    selectedConcept === "distribution"
                      ? (currentPriceBook.distributionConceptItems as IPriceBookItem[])
                      : (currentPriceBook.serviceConceptItems as IPriceBookItem[])
                  )
            }
          />
        )}
        {filteredServices && (
          <ConceptDialogTable
            columns={priceBookConceptColumns}
            rows={priceBookConceptsTableAdapter(
              basePriceBookForAddition as IPriceBook,
              filteredServices
            )}
          />
        )}
        {filteredDistribution && (
          <ConceptDialogTable
            columns={priceBookConceptColumns}
            rows={priceBookConceptsTableAdapter(
              basePriceBookForAddition as IPriceBook,
              filteredDistribution
            )}
          />
        )}
        <ItemsChart rows={addedConcepts ?? []} title="Items a agregar" />
      </div>
    </div>
  );
};
{
}
