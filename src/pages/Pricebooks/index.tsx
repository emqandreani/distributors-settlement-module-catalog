import { PRICEBOOKS_COLS } from "constants/tableColumns";
import {
  conceptsByDistributionTableTitle,
  conceptsByServiceTableTitle,
} from "constants/tableTitles";
import { priceBookConceptColumns } from "constants/priceBookConceptColumns";

import React, { ReactNode } from "react";
import { PriceBookTable } from "components/PriceBookTable";
import { priceBooksTableAdapter } from "adapters/priceBooksTableAdapter";
import { PriceBookTableFilters } from "components/PriceBookTableFilters";
import { PriceBookConcept } from "components/PriceBookConcept";
import { priceBookHeaderAdapater } from "adapters/priceBookHeaderAdapter";
import { PricebookHeader } from "components/PricebookHeader";
import useConceptTables from "hooks/useConceptTables";
import { ConceptItemDialog } from "components/ConceptItemDialog";
import useFilteredPriceBook from "hooks/useFilteredPriceBook";
import { priceBookConceptsTableAdapter } from "adapters/priceBookConceptsTableAdapter";
import { selectorPricebook } from "features/pricebook/slice";
import { selectorLayout } from "features/layout/slice";
import { IPriceBookItem } from "interfaces/pricebook-item";
import { IPriceBook } from "interfaces/pricebook";
import { useLocalSelector } from "app/store";

import styles from "./index.module.scss";
import useSelectPriceBook from "./hooks";

interface ManagePricebookPageProps {
  children: ReactNode;
}

const PriceBookPage = () => {
  const { filteredPriceBooks } = useFilteredPriceBook();
  const { endLevel } = useSelectPriceBook();

  const { ...priceBooksDynamicsProps } = useLocalSelector(selectorPricebook);

  const { toggleConceptItemDialog } = useLocalSelector(selectorLayout);
  const { filteredDistribution, filteredServices } = useConceptTables(
    priceBooksDynamicsProps.data as IPriceBook
  );
  const { serviceConceptItems, distributionConceptItems } =
    priceBooksDynamicsProps.data as IPriceBook;

  const { ...headerProps } = priceBookHeaderAdapater(priceBooksDynamicsProps.data as IPriceBook);

  return (
    <div className={styles["catalogs-page-container"]}>
      {priceBooksDynamicsProps.subPriceBooks && priceBooksDynamicsProps.data && (
        <>
          <PricebookHeader backTo={{ name: "Volver", path: "./.." }} />

          <PriceBookConcept
            defaultOpen={endLevel}
            priceBookConceptColumns={priceBookConceptColumns}
            rows={priceBookConceptsTableAdapter(
              priceBooksDynamicsProps.data as IPriceBook,
              filteredDistribution ?? (distributionConceptItems as IPriceBookItem[])
            )}
            tableTitle={conceptsByDistributionTableTitle}
            type="distribution"
          />

          <PriceBookConcept
            defaultOpen={endLevel}
            priceBookConceptColumns={priceBookConceptColumns}
            rows={priceBookConceptsTableAdapter(
              priceBooksDynamicsProps.data as IPriceBook,
              filteredServices ?? (serviceConceptItems as IPriceBookItem[])
            )}
            tableTitle={conceptsByServiceTableTitle}
            type="service"
          />
          {!endLevel && (
            <>
              <PriceBookTableFilters />
              <PriceBookTable
                columns={PRICEBOOKS_COLS}
                rows={priceBooksTableAdapter(
                  filteredPriceBooks ?? priceBooksDynamicsProps.subPriceBooks
                )}
              />
            </>
          )}
        </>
      )}
      ;
      {toggleConceptItemDialog && (
        <ConceptItemDialog
          open={toggleConceptItemDialog}
          priceBookName={`${headerProps.index} / ${headerProps.name}`}
        />
      )}
    </div>
  );
};

export const ManagePriceBookPage = ({ children }: ManagePricebookPageProps) => {
  return <div className={styles["catalogs-page-container"]}>{children}</div>;
};

export default PriceBookPage;
