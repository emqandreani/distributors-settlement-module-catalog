import { STATUS } from "constants/status";

import { faArrowLeft } from "@fortawesome/pro-regular-svg-icons";
import {
  cleanDistributorRequest,
  fetchDistributors,
  selectorDistributor,
} from "app/slices/distributor";
import { DistributorFilter } from "components/DistributorFilter";
import { SecondaryButton } from "components/SecondaryButton";
import AssignPriceBookContainer from "containers/AssignPriceBookContainer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./index.module.scss";

const AssignPriceBook = () => {
  const dispatch = useDispatch();
  const { assignDistributorsRequest } = useSelector(selectorDistributor);

  useEffect(() => {
    dispatch(fetchDistributors());
    if (
      assignDistributorsRequest?.status === STATUS.SUCCESSFUL ||
      assignDistributorsRequest?.status === STATUS.FAILED
    ) {
      dispatch(fetchDistributors());
      setTimeout(() => {
        dispatch(cleanDistributorRequest({ type: "put", payload: null }));
      }, 5000);
    }

    return () => {};
  }, [assignDistributorsRequest?.status, dispatch]);

  return (
    <div className={styles["assign-page-container"]}>
      <SecondaryButton icon={faArrowLeft} path="./.." text="Volver" />
      <DistributorFilter />
      <AssignPriceBookContainer />
    </div>
  );
};

export default AssignPriceBook;
