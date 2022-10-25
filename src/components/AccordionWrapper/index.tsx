import { faAngleDown } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";

import styles from "./index.module.scss";

export interface AccordionWrapperProps {
  title: string;
  defaultOpen: boolean;
  children: React.ReactNode;
}

export const AccordionWrapper: React.FC<AccordionWrapperProps> = ({
  title,
  defaultOpen,
  children,
}) => {
  return (
    <Accordion className={styles["accordion-wrapper"]} defaultExpanded={defaultOpen}>
      <AccordionSummary
        aria-controls="panel2a-content"
        expandIcon={<FontAwesomeIcon className={styles["angle-down-icon"]} icon={faAngleDown} />}
        id="panel2a-header"
      >
        <div className={styles["header-top"]}>
          <h2 className={styles["title"]}>{title}</h2>
        </div>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
