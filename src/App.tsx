import React from "react";

import { AccountInfo } from "./@types/global";
import { AccountContext } from "./context/Account";
import Routes from "./routes";

interface IAppProps {
  /**
   * Account from MSAL
   */
  account?: AccountInfo;
}

const DEFAULT_ACCOUNT: AccountInfo = {
  name: "Wick John",
  username: "thekiller",
  environment: "",
  homeAccountId: "",
  tenantId: "",
  nativeAccountId: "",
  localAccountId: "",
  idTokenClaims: {},
};

const App = ({ account = DEFAULT_ACCOUNT }: IAppProps) => (
  <AccountContext.Provider value={account}>
    <React.Suspense fallback={"...loading"}>
      <Routes />
    </React.Suspense>
  </AccountContext.Provider>
);

export default App;
