import { STATUS } from "constants/status";

import { faTrash } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeAssignedDistributor, selectorDistributor } from "app/slices/distributor";
import { NoRowsUser, NoRowsUserSuccessAsssign } from "components/NoRows";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SuspenseLoader } from "components/SuspenseLoader";

import styles from "./index.module.scss";

export interface DistributorsChartListProps {}

export const DistributorsChartList: React.FC<DistributorsChartListProps> = () => {
  const dispatch = useDispatch();
  const { assignedDistributors, assignDistributorsRequest } = useSelector(selectorDistributor);

  return (
    <ul className={styles["distributors-list-container"]}>
      {assignedDistributors.length && !assignDistributorsRequest ? (
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
      ) : assignDistributorsRequest?.status === STATUS.PENDING ? (
        <SuspenseLoader />
      ) : assignDistributorsRequest?.status === STATUS.SUCCESSFUL ? (
        <NoRowsUserSuccessAsssign />
      ) : assignDistributorsRequest?.status === STATUS.FAILED ? (
        <h3>Error en la asignación</h3>
      ) : (
        <NoRowsUser />
      )}
    </ul>
  );
};
