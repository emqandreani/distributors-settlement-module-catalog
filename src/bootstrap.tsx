import { StyleSystemProvider } from "@architecture-it/stylesystem";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import App from "./App";

const root = document.getElementById("root-remote") as HTMLElement;

ReactDOM.render(
  <BrowserRouter basename="module">
    <StyleSystemProvider>
      <App />
    </StyleSystemProvider>
  </BrowserRouter>,
  root
);
