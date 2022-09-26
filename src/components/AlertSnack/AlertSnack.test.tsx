import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { AlertSnack, AlertSnackProps } from "./";

const defaultProps: AlertSnackProps = {
  open: false,
  onClose: function (): void {
    throw new Error("Function not implemented.");
  },
  type: "",
  message: "",
};

describe("< AlertSnack />", () => {
  it("should render default without crash", () => {
    const tree = render(<AlertSnack {...defaultProps} />);

    expect(tree).toMatchSnapshot();
  });
});
