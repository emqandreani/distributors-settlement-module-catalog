import { PRICEBOOKS_STATES } from "constants/pricebookStates";

import { IPriceBook } from "interfaces/pricebook";

export const filterPbByState = (pricebooks: IPriceBook[], state: string) =>
  pricebooks.filter(
    ({ priceBookState: { description } }) =>
      description.trim().toLocaleLowerCase() === PRICEBOOKS_STATES[state]
  );
