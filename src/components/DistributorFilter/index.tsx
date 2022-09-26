import { Button, Input, Select } from "@architecture-it/stylesystem";
import { faChevronDown, faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionDetails, AccordionSummary, FormLabel, MenuItem } from "@mui/material";
import { PrimaryButton } from "components/PrimaryButton";
import React, { useState } from "react";

import styles from "./index.module.scss";

export interface DistributorFilterProps {}

export const DistributorFilter: React.FC<DistributorFilterProps> = () => {
  const [distributorValue, setDistributorValue] = useState<string>("");
  const handleDistributorValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDistributorValue(e.target.value);
  };

  return (
    <Accordion defaultExpanded elevation={5} style={{ borderRadius: "20px", marginBottom: 10 }}>
      <AccordionSummary
        aria-controls="panel1d-content"
        expandIcon={<FontAwesomeIcon className={styles["icon-red"]} icon={faChevronDown} />}
        id="panel1d-header"
        style={{ paddingBottom: "0px" }}
      />
      <AccordionDetails>
        <form className={styles["distributor-filter-container"]} onSubmit={() => {}}>
          <FormLabel className={styles["search_label"]}>
            <Input
              name="distributor"
              placeholder="Transportistas"
              sx={{
                width: "100%",
              }}
              value={distributorValue}
              onChange={handleDistributorValue}
            />
          </FormLabel>
          <FormLabel className={styles["form_label"]}>
            <Select
              label="Sucursal"
              sx={{
                width: "100%",
              }}
            >
              <MenuItem defaultChecked disabled>
                Sucursal
              </MenuItem>
            </Select>
          </FormLabel>
          <FormLabel className={styles["form_label"]}>
            <Select
              label="Vehículo"
              sx={{
                width: "100%",
              }}
            >
              <MenuItem defaultChecked disabled>
                Vehículo
              </MenuItem>
            </Select>
          </FormLabel>
          <PrimaryButton icon={faMagnifyingGlass} text="Buscar" />
        </form>
      </AccordionDetails>
    </Accordion>
  );
};
