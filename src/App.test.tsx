import { screen } from "@testing-library/react";

import { renderWithProviders } from "./__test__/utils";
import App from "./App";

describe("<App/>", () => {
  test("Should render without crash", () => {
    const { asFragment } = renderWithProviders(<App />);

    expect(asFragment()).toMatchSnapshot();
  });
  test("Should render title", async () => {
    renderWithProviders(<App />);
    const title = await screen.findByText(/Home Remote Page/i);

    expect(title).toBeInTheDocument();
  });
  test("Should render default account", async () => {
    renderWithProviders(<App />);
    const nombre = await screen.findByText(/Nombre: Wick John/i);

    expect(nombre).toBeInTheDocument();
  });
});
