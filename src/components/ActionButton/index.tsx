import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark, faEye, faFilePen, faTrash } from "@fortawesome/pro-regular-svg-icons";
import React from "react";
import { Link } from "react-router-dom";

import styles from "./index.module.scss";

export interface ActionButtonProps {
  type: "read" | "edit" | "update" | "no-action";
  onEdit?: () => void;
  onDelete?: () => void;
  path?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ type, onEdit, onDelete, path }) => {
  if (type === "no-action") {
    return (
      <div className={styles["action-buttons-wrapper"]}>
        <button
          className={styles["action-button"]}
          title="Los catálogos vigentes no pueden modificarse"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    );
  }
  if (type === "update")
    return (
      <div className={styles["action-buttons-wrapper"]}>
        <button className={styles["action-button"]} onClick={onEdit}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button className={styles["action-button"]} onClick={onDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    );
  if (type === "edit") {
    return (
      <div className={styles["action-buttons-wrapper"]}>
        <Link to={`${path}`}>
          <button className={styles["action-button"]} title="Ver / Modificar catálogo">
            <FontAwesomeIcon icon={faFilePen} />
          </button>
        </Link>
      </div>
    );
  }
  if (type === "read") {
    return (
      <div className={styles["action-buttons-wrapper"]}>
        <Link to={`${path}`}>
          <button className={styles["action-button"]} title="Ver catálogo">
            <FontAwesomeIcon icon={faEye} />
          </button>
        </Link>
      </div>
    );
  }

  return <button type="button">DEFAULT</button>;
};
