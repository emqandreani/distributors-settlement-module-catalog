import { IPriceBook, IPriceBookConceptsTable } from "interfaces/pricebook";

export const postConceptItemAdapter = (
  conceptItem: IPriceBookConceptsTable,
  priceBook: IPriceBook
) => {
  const {
    concept,
    description,
    amount,
    condition,
    creatorPriceBookId,
    events,
    priceBookItemTypeId,
  } = conceptItem;

  return {
    concept,
    description,
    amount: Number(amount.substring(1)),
    condition: condition === "Optional" ? true : false,
    ownerPriceBookId: priceBook.id,
    creatorPriceBookId,
    events,
    priceBookItemTypeId,
  };
};
