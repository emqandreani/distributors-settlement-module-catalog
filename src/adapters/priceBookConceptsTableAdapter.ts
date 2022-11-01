import { CONCEPTS } from "constants/concepts";

import { IDistributionConceptItem } from "interfaces/distribution-concept";
import { IPriceBook } from "interfaces/pricebook";
import { IServiceConceptItem } from "interfaces/service-concept";

export const priceBookConceptsTableAdapter = (
  priceBook: IPriceBook,
  conceptItems: IDistributionConceptItem[] | IServiceConceptItem[],
  type: "service" | "distribution"
) => {
  if (type === CONCEPTS.DISTRIBUTION) {
    return conceptItems.map((element) => {
      return {
        priceBookId: priceBook.id,
        id: element.id,
        events: element.events,
        concept: element.concept,
        description: element.description,
        amount: `$${element.amount}`,
        createdAt: new Date(element.createdAt).toLocaleDateString(),
        createdBy: element.createdBy,
        actions: "update",
        condition: element.isOptional ? "Opcional" : "Obligatorio",
        originPriceBook:
          element.creatorPriceBookId === priceBook.id ? "Propio" : element.creatorPriceBook,
        ownerPriceBookId: element.ownerPriceBookId,
        creatorPriceBookId: element.creatorPriceBookId,
        priceBookItemTypeId: element.priceBookItemTypeId,
        priceBookItemTypeName: element.priceBookItemTypeDescription,
      };
    });
  } else if (type === CONCEPTS.SERVICE) {
    return conceptItems.map((element) => {
      return {
        priceBookId: priceBook.id,
        id: element.id,
        events: element.events,
        concept: element.concept,
        description: element.description,
        amount: `$${element.amount}`,
        createdAt: new Date(element.createdAt).toLocaleDateString(),
        createdBy: element.createdBy,
        actions: "update",
        condition: element.isOptional ? "Opcional" : "Obligatorio",
        originPriceBook:
          element.creatorPriceBookId === priceBook.id ? "Propio" : element.creatorPriceBook,
        ownerPriceBookId: element.ownerPriceBookId,
        creatorPriceBookId: element.creatorPriceBookId,
        priceBookItemTypeId: element.priceBookItemTypeId,
        priceBookItemTypeName: element.priceBookItemTypeDescription,
      };
    });
  }

  return [];
};

// var loadItemData = (priceBookItem: IDistributionConceptItem, priceBook: IPriceBook) => {
//   return {
//     priceBookId: priceBook.id,
//     id: priceBookItem.id,
//     events: priceBookItem.events,
//     concept: priceBookItem.concept,
//     description: priceBookItem.description,
//     amount: `$${priceBookItem.amount}`,
//     createdAt: new Date(priceBookItem.createdAt).toLocaleDateString(),
//     createdBy: priceBookItem.createdBy,
//     actions: "update",
//     condition: priceBookItem.isOptional ? "Opcional" : "Obligatorio",
//     originPriceBook:
//       priceBookItem.creatorPriceBookId === priceBook.id ? "Propio" : priceBookItem.creatorPriceBook,
//     ownerPriceBookId: priceBookItem.ownerPriceBookId,
//     creatorPriceBookId: priceBookItem.creatorPriceBookId,
//     priceBookItemTypeId: priceBookItem.priceBookItemType.id,
//     priceBookItemTypeName: priceBookItem.priceBookItemType.description,
//   };
// };
