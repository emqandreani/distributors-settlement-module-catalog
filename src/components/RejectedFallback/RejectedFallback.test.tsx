import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { RejectedFallback, RejectedFallbackProps } from "./";

const defaultProps: RejectedFallbackProps = {};

describe("< RejectedFallback />", () => {
  it("should render default without crash", () => {
    const tree = render(<RejectedFallback {...defaultProps} />);

    expect(tree).toMatchSnapshot();
  });
});
