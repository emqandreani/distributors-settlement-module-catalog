import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

import styles from "./index.module.scss";

export interface PrimaryButtonProps {
  icon: IconDefinition;
  text: string;
  path?: string;
  onClick?: () => void;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ onClick, icon, text, path }) => {
  return (
    <button className={styles["primary-button-wrapper"]} type="button" onClick={onClick}>
      <Link className={styles["__link"]} to={path ?? ""}>
        <span className={styles["__icon"]}>
          <FontAwesomeIcon icon={icon} />
        </span>
        <p className={styles["__text"]}>{text}</p>
      </Link>
    </button>
  );
};
