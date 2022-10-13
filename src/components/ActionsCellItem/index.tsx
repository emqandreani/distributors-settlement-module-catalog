import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeConceptItem } from "features/pricebook";
import React from "react";
import { useDispatch } from "react-redux";

import styles from "./index.module.scss";

export interface ActionsCellItemProps {
  id: string;
  type: "Edit" | "Delete";
}

export const ActionsCellItem: React.FC<ActionsCellItemProps> = ({ id, type }) => {
  const dispatch = useDispatch();

  return (
    <FontAwesomeIcon
      className={styles["delete-icon"]}
      icon={faTrash as IconProp}
      onClick={() => dispatch(removeConceptItem(id))}
    />
  );
};
