import { DISTRIBUTOR_COLS } from "constants/tableColumns";

import { DistributorTable } from "components/DistributorTable";
import { DistributorsChart } from "components/DistributorsChart";
import { selectorDistributor } from "features/distributor/slice";
import { useLocalSelector } from "app/store";
import { IDistributor } from "interfaces/distributor";

import styles from "./index.module.scss";
const AssignPriceBookContainer = () => {
  const { data } = useLocalSelector(selectorDistributor);

  return (
    <div className={styles["assign-pb-container"]}>
      {data && (
        <>
          <DistributorTable columns={DISTRIBUTOR_COLS} rows={data as IDistributor[]} />
          <DistributorsChart />
        </>
      )}
    </div>
  );
};

export default AssignPriceBookContainer;
