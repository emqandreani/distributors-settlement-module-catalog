import { CONCEPT_COL } from "constants/tableColumns";

import { CatalogConceptTable } from "components/CatalogConceptTable";
import React, { useEffect } from "react";
import { SecondaryButton } from "components/SecondaryButton";
import { faArrowLeft, faPlus } from "@fortawesome/pro-regular-svg-icons";
import { PrimaryButton } from "components/PrimaryButton";
import { AccordionWrapper } from "components/AccordionWrapper";
import { SearchInput } from "components/SearchInput";
import { useLocalDispatch, useLocalSelector } from "app/store";
import { selectorLayout, toggleCatalogDialog } from "features/layout/slice";
import { CatalogConceptDialog } from "components/CatalogConceptDialog";
import { fetchDistributionConcept } from "features/distribution-concept/asyncActions";
import { fetchServiceConcept } from "features/service-concept/asyncActions";
import { selectorServiceConcept } from "features/service-concept/slice";
import {
  distributionTableAdapter,
  serviceTableAdapter,
} from "components/CatalogConceptTable/test-utils";
import { selectorDistributionConcept } from "features/distribution-concept/slice";
import { setSearchValues } from "features/search";
import { IServiceConceptItem } from "interfaces/service-concept";
import { IDistributionConceptItem } from "interfaces/distribution-concept";

import styles from "./index.module.scss";

const CatalogConceptsPage = () => {
  const { toggleCatalogConceptDialog } = useLocalSelector(selectorLayout);
  const dispatch = useLocalDispatch();

  const { ...serviceProps } = useLocalSelector(selectorServiceConcept);
  const { ...distributionProps } = useLocalSelector(selectorDistributionConcept);

  useEffect(() => {
    dispatch(fetchDistributionConcept());
    dispatch(fetchServiceConcept());

    return () => {};
  }, [dispatch]);

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
          handleSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            dispatch(
              setSearchValues({
                flag: "distribution",
                searchValue: "posta",
                selector: "distributionConcept",
              })
            );
          }}
          value={"distribution value"}
        />
        <CatalogConceptTable
          columns={CONCEPT_COL}
          rows={distributionTableAdapter(
            (distributionProps.filteredData as IDistributionConceptItem[]) ?? distributionProps.data
          )}
        />
      </AccordionWrapper>
      <AccordionWrapper defaultOpen title="Conceptos de servicio">
        <SearchInput
          handleSearch={() => console.log("service search")}
          handleSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            dispatch(
              setSearchValues({
                flag: "service",
                searchValue: "viaje",
                selector: "serviceConcept",
              })
            );
          }}
          value={"service value"}
        />
        <CatalogConceptTable
          columns={CONCEPT_COL}
          rows={serviceTableAdapter(
            (serviceProps.filteredData as IServiceConceptItem[]) ?? serviceProps.data
          )}
        />
      </AccordionWrapper>
      {toggleCatalogConceptDialog && <CatalogConceptDialog open={toggleCatalogConceptDialog} />}
    </div>
  );
};

export default CatalogConceptsPage;
