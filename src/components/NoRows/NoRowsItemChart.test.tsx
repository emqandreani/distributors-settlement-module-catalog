import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { NoRows, NoRowsProps } from ".";

const defaultProps: NoRowsProps = {
  type: "ItemChart",
  label: "string",
};

describe("< NoRows />", () => {
  it("should render default without crash", () => {
    const tree = render(<NoRows {...defaultProps} />);

    expect(tree).toMatchSnapshot();
  });
});
