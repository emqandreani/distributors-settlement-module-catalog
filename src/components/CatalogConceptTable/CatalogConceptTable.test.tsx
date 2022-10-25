import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { CatalogConceptTable, CatalogConceptTableProps } from "./";

const defaultProps: CatalogConceptTableProps = {
  columns: [],
  rows: [],
};

describe("< CatalogConceptTable />", () => {
  it("should render default without crash", () => {
    const tree = render(<CatalogConceptTable {...defaultProps} />);

    expect(tree).toMatchSnapshot();
  });
});
