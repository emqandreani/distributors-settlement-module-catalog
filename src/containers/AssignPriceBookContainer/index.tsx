import { DISTRIBUTOR_COLS } from "constants/tableColumns";

import { DistributorTable } from "components/DistributorTable";
import React from "react";
import { DistributorsChart } from "components/DistributorsChart";
import { useSelector } from "react-redux";
import { selectorDistributor } from "app/slices/distributor";
import { IDistributor } from "interfaces/Distributor";

import styles from "./index.module.scss";
const AssignPriceBookContainer = () => {
  const { distributors } = useSelector(selectorDistributor);

  return (
    <div className={styles["assign-pb-container"]}>
      {distributors && (
        <>
          <DistributorTable columns={DISTRIBUTOR_COLS} rows={distributors as IDistributor[]} />
          <DistributorsChart />
        </>
      )}
    </div>
  );
};

export default AssignPriceBookContainer;
