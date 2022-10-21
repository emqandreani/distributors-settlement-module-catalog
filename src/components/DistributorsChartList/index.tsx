import { STATUS } from "constants/status";

import { faTrash } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NoRowsUser, NoRowsUserSuccessAsssign } from "components/NoRows";
import React from "react";
import { SuspenseLoader } from "components/SuspenseLoader";
import { useLocalDispatch, useLocalSelector } from "app/store";
import { removeAssignedDistributor, selectorDistributor } from "features/distributor/slice";

import styles from "./index.module.scss";

export interface DistributorsChartListProps {}

export const DistributorsChartList: React.FC<DistributorsChartListProps> = () => {
  const dispatch = useLocalDispatch();
  const { assignedDistributors, postResponse } = useLocalSelector(selectorDistributor);

  return (
    <ul className={styles["distributors-list-container"]}>
      {assignedDistributors && !postResponse ? (
        assignedDistributors.map(({ fullNameWithDni, distributorId, branchName, vehicleName }) => {
          return (
            <li key={distributorId}>
              <p>
                <strong>{fullNameWithDni}</strong>
              </p>
              <p>
                {branchName} - {vehicleName}
              </p>
              <button
                className={styles["action-button"]}
                onClick={() => dispatch(removeAssignedDistributor(distributorId))}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          );
        })
      ) : postResponse?.status === STATUS.PENDING ? (
        <SuspenseLoader />
      ) : postResponse?.status === STATUS.SUCCESSFUL ? (
        <NoRowsUserSuccessAsssign />
      ) : postResponse?.status === STATUS.FAILED ? (
        <h3>Error en la asignación</h3>
      ) : (
        <NoRowsUser />
      )}
    </ul>
  );
};
