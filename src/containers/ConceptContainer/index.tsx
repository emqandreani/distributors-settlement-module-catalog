import { priceBookConceptColumns } from "constants/priceBookConceptColumns";

import { priceBookConceptsTableAdapter } from "adapters/priceBookConceptsTableAdapter";
import { ConceptDialogTable } from "components/ConceptDialogTable";
import React from "react";
import { ItemsChart } from "components/ItemsChart";
import { DialogConceptTableFilters } from "components/DialogConceptTableFilters";
import useConceptTables from "hooks/useConceptTables";
import useConceptContainer from "containers/ConceptContainer/hooks";
import { selectorPricebook } from "features/pricebook/slice";
import { IPriceBook } from "interfaces/pricebook";
import { useLocalSelector } from "app/store";
import { IDistributionConceptItem } from "interfaces/distribution-concept";
import { IServiceConceptItem } from "interfaces/service-concept";

import styles from "./index.module.scss";

export interface ConceptContainerProps {}

export const ConceptContainer: React.FC<ConceptContainerProps> = () => {
  const { currentPriceBook } = useConceptContainer();
  const { data } = useLocalSelector(selectorPricebook);

  const { filteredDistribution, filteredServices } = useConceptTables(
    currentPriceBook ?? (data as IPriceBook)
  );

  const { basePriceBookForAddition, selectedConcept, addedConcepts } =
    useLocalSelector(selectorPricebook);

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
                      ? (currentPriceBook.distributionConceptItems as IDistributionConceptItem[])
                      : (currentPriceBook.serviceConceptItems as IServiceConceptItem[]),
                    selectedConcept
                  )
            }
          />
        )}
        {filteredServices && selectedConcept && (
          <ConceptDialogTable
            columns={priceBookConceptColumns}
            rows={priceBookConceptsTableAdapter(
              basePriceBookForAddition as IPriceBook,
              filteredServices,
              selectedConcept
            )}
          />
        )}
        {filteredDistribution && selectedConcept && (
          <ConceptDialogTable
            columns={priceBookConceptColumns}
            rows={priceBookConceptsTableAdapter(
              basePriceBookForAddition as IPriceBook,
              filteredDistribution,
              selectedConcept
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
