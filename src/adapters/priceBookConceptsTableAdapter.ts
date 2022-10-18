import { IPriceBook } from "interfaces/pricebook";
import { IPriceBookItem } from "interfaces/pricebook-item";

export const priceBookConceptsTableAdapter = (
  priceBook: IPriceBook,
  conceptItems: IPriceBookItem[]
) => {
  if (conceptItems) {
    return conceptItems.map((element) => loadItemData(element, priceBook));
  }

  return [];
};

var loadItemData = (priceBookItem: IPriceBookItem, priceBook: IPriceBook) => {
  return {
    priceBookId: priceBook.id,
    id: priceBookItem.id,
    events: priceBookItem.events,
    concept: priceBookItem.concept,
    description: priceBookItem.description,
    amount: `$${priceBookItem.amount}`,
    createdAt: new Date(priceBookItem.createdAt).toLocaleDateString(),
    createdBy: priceBookItem.createdBy,
    actions: "update",
    condition: priceBookItem.isOptional ? "Opcional" : "Obligatorio",
    originPriceBook:
      priceBookItem.creatorPriceBookId === priceBook.id ? "Propio" : priceBookItem.creatorPriceBook,
    ownerPriceBookId: priceBookItem.ownerPriceBookId,
    creatorPriceBookId: priceBookItem.creatorPriceBookId,
    priceBookItemTypeId: priceBookItem.priceBookItemType.id,
    priceBookItemTypeName: priceBookItem.priceBookItemType.description,
  };
};
