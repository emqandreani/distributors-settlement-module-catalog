import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { SuspenseLoader, SuspenseLoaderProps } from "./";

const defaultProps: SuspenseLoaderProps = {};

describe("< SuspenseLoader />", () => {
  it("should render default without crash", () => {
    const tree = render(<SuspenseLoader {...defaultProps} />);

    expect(tree).toMatchSnapshot();
  });
});
