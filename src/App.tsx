import React, { Suspense } from "react";
import Router from "router";
import { SuspenseLoader } from "components/SuspenseLoader";
import { AnyAction, Store } from "@reduxjs/toolkit";
import { Provider as LocalProvider, Provider } from "react-redux";
import { ErrorBoundary } from "@architecture-it/stylesystem";

import { ModuleContext, store as moduleStore } from "./app/store";

interface AppProps {
  store: Store<any, AnyAction>;
}

const App = ({ store }: AppProps) => {
  return (
    <Provider store={store}>
      <LocalProvider context={ModuleContext} store={moduleStore}>
        <ErrorBoundary>
          <Suspense fallback={<SuspenseLoader />}>
            <Router />
          </Suspense>
        </ErrorBoundary>
      </LocalProvider>
    </Provider>
  );
};

export default App;
