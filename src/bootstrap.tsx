import { StyleSystemProvider } from "@architecture-it/stylesystem";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { store } from "app/store";

import App from "./App";

const root = document.getElementById("root-remote") as HTMLElement;

ReactDOM.render(
  <BrowserRouter basename="catalogo">
    <StyleSystemProvider>
      <App store={store} />
    </StyleSystemProvider>
  </BrowserRouter>,
  root
);
