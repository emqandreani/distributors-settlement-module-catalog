import { IPriceBook } from "interfaces/PriceBook";

const useFilterStates = (subPricebooks: IPriceBook[]) => {
  let FILTER_STATES = new Map();

  subPricebooks.flatMap((priceBook) => {
    const stateName = priceBook.priceBookState.description;

    if (FILTER_STATES.has(stateName)) {
      FILTER_STATES.set(stateName, FILTER_STATES.get(stateName) + 1);
    } else {
      FILTER_STATES.set(stateName, 1);
    }
  });

  return Array.from(FILTER_STATES, ([name, value]) => ({ name, value }));
};

export default useFilterStates;
