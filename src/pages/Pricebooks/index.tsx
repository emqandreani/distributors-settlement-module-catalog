import { PRICEBOOKS_COLS } from "constants/tableColumns";
import {
  conceptsByDistributionTableTitle,
  conceptsByServiceTableTitle,
} from "constants/tableTitles";
import { priceBookConceptColumns } from "constants/priceBookConceptColumns";

import React, { ReactNode, useMemo } from "react";
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
import { SuspenseLoader } from "components/SuspenseLoader";
import { IDistributionConceptItem } from "interfaces/distribution-concept";
import { IServiceConceptItem } from "interfaces/service-concept";

import styles from "./index.module.scss";
import useSelectPriceBook from "./hooks";

interface ManagePricebookPageProps {
  children: ReactNode;
}

const PriceBookPage = () => {
  const { filteredPriceBooks } = useFilteredPriceBook();
  const { endLevel } = useSelectPriceBook();

  const { data, isLoading, subPriceBooks } = useLocalSelector(selectorPricebook);

  const { toggleConceptItemDialog } = useLocalSelector(selectorLayout);
  const { filteredDistribution, filteredServices } = useConceptTables(data as IPriceBook);
  const { serviceConceptItems, distributionConceptItems } = data as IPriceBook;

  const { ...headerProps } = useMemo(() => priceBookHeaderAdapater(data as IPriceBook), [data]);

  if (isLoading || !headerProps) return <SuspenseLoader />;

  return (
    <div className={styles["catalogs-page-container"]}>
      {subPriceBooks && data && (
        <>
          <PricebookHeader backTo={{ name: "Volver", path: "./.." }} />

          <PriceBookConcept
            defaultOpen={endLevel}
            priceBookConceptColumns={priceBookConceptColumns}
            rows={priceBookConceptsTableAdapter(
              data as IPriceBook,
              filteredDistribution ?? (distributionConceptItems as IDistributionConceptItem[]),
              "distribution"
            )}
            tableTitle={conceptsByDistributionTableTitle}
            type="distribution"
          />

          <PriceBookConcept
            defaultOpen={endLevel}
            priceBookConceptColumns={priceBookConceptColumns}
            rows={priceBookConceptsTableAdapter(
              data as IPriceBook,
              filteredServices ?? (serviceConceptItems as IServiceConceptItem[]),
              "service"
            )}
            tableTitle={conceptsByServiceTableTitle}
            type="service"
          />
          {!endLevel && (
            <>
              <PriceBookTableFilters />
              <PriceBookTable
                columns={PRICEBOOKS_COLS}
                rows={priceBooksTableAdapter(filteredPriceBooks ?? subPriceBooks)}
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
