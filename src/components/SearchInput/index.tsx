import { Input } from "@architecture-it/stylesystem";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import styles from "./index.module.scss";
interface SearchInputProps {
  value: string | null;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export const SearchInput: React.FC<SearchInputProps> = ({ value, handleSearch, handleSubmit }) => {
  return (
    <form className={styles["pricebook-filter-search"]} onSubmit={handleSubmit}>
      <Input
        label="Buscar"
        size="medium"
        style={{ marginLeft: "auto" }}
        value={value ?? ""}
        onChange={handleSearch}
      />
      <button className={styles["filter-search-button"]} type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
      </button>
    </form>
  );
};
