import React from "react";

import { AccountInfo } from "../@types/global";

/**
 * Context to keep and share account info inside microfontend
 */
export const AccountContext = React.createContext<AccountInfo | undefined>(undefined);

export const useAccount = () => React.useContext(AccountContext);
