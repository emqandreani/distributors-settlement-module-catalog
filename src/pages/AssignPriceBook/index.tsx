import { STATUS } from "constants/status";

import { faArrowLeft } from "@fortawesome/pro-regular-svg-icons";
import { DistributorFilter } from "components/DistributorFilter";
import { SecondaryButton } from "components/SecondaryButton";
import AssignPriceBookContainer from "containers/AssignPriceBookContainer";
import React, { useEffect } from "react";

import styles from "./index.module.scss";
import { selectorDistributor } from "features/distributor/slice";
import { useLocalDispatch, useLocalSelector } from "app/store";
import { fetchDistributor } from "features/distributor/asyncActions";

const AssignPriceBook = () => {
  const dispatch = useLocalDispatch();
  const { postResponse } = useLocalSelector(selectorDistributor);

  useEffect(() => {
    dispatch(fetchDistributor());
    if (
      postResponse?.status === STATUS.SUCCESSFUL ||
      postResponse?.status === STATUS.FAILED
    ) {
      dispatch(fetchDistributor());
      // setTimeout(() => {
      //   dispatch(cleanDistributorRequest({ type: "put", payload: null }));
      // }, 5000);
    }

    return () => {};
  }, [postResponse?.status, dispatch]);

  return (
    <div className={styles["assign-page-container"]}>
      <SecondaryButton icon={faArrowLeft} path="./.." text="Volver" />
      <DistributorFilter />
      <AssignPriceBookContainer />
    </div>
  );
};

export default AssignPriceBook;
