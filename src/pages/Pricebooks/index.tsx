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
import { useSelector } from "react-redux";
import { selectorPriceBooks } from "app/slices/priceBooks";
import { IPriceBook } from "interfaces/PriceBook";
import { PriceBookConcept } from "components/PriceBookConcept";
import { priceBookHeaderAdapater } from "adapters/priceBookHeaderAdapter";
import { PricebookHeader } from "components/PricebookHeader";
import useConceptTables from "hooks/useConceptTables";
import { ConceptItemDialog } from "components/ConceptItemDialog";
import { selectorLayout } from "app/slices/layout";
import { IPriceBookItem } from "interfaces/PriceBookItem";
import useFilteredPriceBook from "hooks/useFilteredPriceBook";
import useSelectPriceBook from "hooks/useSelectPriceBook";
import { priceBookConceptsTableAdapter } from "adapters/priceBookConceptsTableAdapter";

import styles from "./index.module.scss";

interface ManagePricebookPageProps {
  children: ReactNode;
}

const PriceBookPage = () => {
  const { filteredPriceBooks } = useFilteredPriceBook();
  const { endLevel } = useSelectPriceBook();

  const { ...priceBooksDynamicsProps } = useSelector(selectorPriceBooks);

  const { toggleConceptItemDialog } = useSelector(selectorLayout);
  const { filteredDistribution, filteredServices } = useConceptTables(
    priceBooksDynamicsProps.priceBook as IPriceBook
  );
  const { serviceConceptItems, distributionConceptItems } =
    priceBooksDynamicsProps.priceBook as IPriceBook;

  const { ...headerProps } = priceBookHeaderAdapater(
    priceBooksDynamicsProps.priceBook as IPriceBook
  );

  return (
    <div className={styles["catalogs-page-container"]}>
      {priceBooksDynamicsProps.subPriceBooks && priceBooksDynamicsProps.priceBook && (
        <>
          <PricebookHeader backTo={{ name: "Volver", path: "./.." }} />

          <PriceBookConcept
            defaultOpen={endLevel}
            priceBookConceptColumns={priceBookConceptColumns}
            rows={priceBookConceptsTableAdapter(
              priceBooksDynamicsProps.priceBook as IPriceBook,
              filteredDistribution ?? (distributionConceptItems as IPriceBookItem[])
            )}
            tableTitle={conceptsByDistributionTableTitle}
            type="distribution"
          />

          <PriceBookConcept
            defaultOpen={endLevel}
            priceBookConceptColumns={priceBookConceptColumns}
            rows={priceBookConceptsTableAdapter(
              priceBooksDynamicsProps.priceBook as IPriceBook,
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
