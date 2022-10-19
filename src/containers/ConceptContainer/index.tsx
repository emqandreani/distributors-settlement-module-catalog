import { priceBookConceptColumns } from "constants/priceBookConceptColumns";

import { priceBookConceptsTableAdapter } from "adapters/priceBookConceptsTableAdapter";
import { ConceptDialogTable } from "components/ConceptDialogTable";
import React from "react";
import { useSelector } from "react-redux";
import { ItemsChart } from "components/ItemsChart";
import { DialogConceptTableFilters } from "components/DialogConceptTableFilters";
import useConceptTables from "hooks/useConceptTables";
import useConceptContainer from "containers/ConceptContainer/hooks";
import { selectorPricebook } from "features/pricebook/slice";
import { IPriceBook } from "interfaces/pricebook";
import { IPriceBookItem } from "interfaces/pricebook-item";

import styles from "./index.module.scss";

export interface ConceptContainerProps {}

export const ConceptContainer: React.FC<ConceptContainerProps> = () => {
  const { currentPriceBook } = useConceptContainer();
  const { data } = useSelector(selectorPricebook);

  const { filteredDistribution, filteredServices } = useConceptTables(
    currentPriceBook ?? (data as IPriceBook)
  );

  const { basePriceBookForAddition, selectedConcept, addedConcepts } =
    useSelector(selectorPricebook);

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
