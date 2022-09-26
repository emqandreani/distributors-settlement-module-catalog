import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

import styles from "./index.module.scss";

export interface SecondaryButtonProps {
  icon: IconDefinition;
  text: string;
  path: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({ icon, text, path }) => {
  return (
    <button className={styles["secondary-button-wrapper"]} type="button">
      <Link className={styles["__link"]} to={path ?? ""}>
        <span className={styles["__icon"]}>
          <FontAwesomeIcon icon={icon} />
        </span>
        <p className={styles["__text"]}>{`${text}`}</p>
      </Link>
    </button>
  );
};
