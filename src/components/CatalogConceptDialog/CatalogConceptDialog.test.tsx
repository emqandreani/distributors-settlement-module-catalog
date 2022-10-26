import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { CatalogConceptDialog, CatalogConceptDialogProps } from "./";

const defaultProps: CatalogConceptDialogProps = {
  open: true,
};

describe("< CatalogConceptDialog />", () => {
  it("should render default without crash", () => {
    const tree = render(<CatalogConceptDialog {...defaultProps} />);

    expect(tree).toMatchSnapshot();
  });
});
