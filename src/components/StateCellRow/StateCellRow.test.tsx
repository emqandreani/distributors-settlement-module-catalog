import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { StateCellRow, StateCellRowProps } from "./";

const defaultProps: StateCellRowProps = {
  values: ["string", "sample"],
};

describe("< StateCellRow />", () => {
  it("should render default without crash", () => {
    const tree = render(<StateCellRow {...defaultProps} />);

    expect(tree).toMatchSnapshot();
  });
});
