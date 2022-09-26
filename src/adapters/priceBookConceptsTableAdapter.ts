import { IPriceBook } from "interfaces/PriceBook";
import { IPriceBookItem } from "interfaces/PriceBookItem";

export interface IPriceBookConceptsTable {
  priceBookId: string;
  id: string;
  concept: number;
  description: string;
  amount: string;
  createdAt: string;
  createdBy: string;
  actions: string;
  events: number;
  condition: string;
  ownerPriceBookId: string;
  creatorPriceBookId: string;
  priceBookItemTypeId: string;
  priceBookItemTypeName: string;
}

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