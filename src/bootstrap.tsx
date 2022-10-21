import { StyleSystemProvider } from "@architecture-it/stylesystem";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { store } from "app/store";
import { fetchPriceBooks } from "features/pricebook/asyncActions";

import App from "./App";

const root = document.getElementById("root-remote") as HTMLElement;

store.dispatch(fetchPriceBooks());

ReactDOM.render(
  <BrowserRouter basename="catalogo">
    <StyleSystemProvider>
      <App store={store} />
    </StyleSystemProvider>
  </BrowserRouter>,
  root
);
