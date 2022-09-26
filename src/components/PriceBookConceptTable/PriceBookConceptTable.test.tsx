import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { PriceBookConceptTable, PriceBookConceptTableProps } from ".";

const defaultProps: PriceBookConceptTableProps = {
  columns: [],
  rows: [],
};

describe("< PricebookConceptTable />", () => {
  it("should render default without crash", () => {
    const tree = render(<PriceBookConceptTable {...defaultProps} />);

    expect(tree).toMatchSnapshot();
  });
});
