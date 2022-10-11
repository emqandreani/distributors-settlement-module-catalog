import { IPriceBook } from "interfaces/pricebook";

export default function mapPriceBooks(priceBook: IPriceBook) {
  const arr: IPriceBook[] = [];

  arr.push(priceBook);
  priceBook.priceBookChildren.map((child) => arr.push(child));
  arr.forEach((child) =>
    child.priceBookChildren.map((child) => {
      arr.push(child);
      child.priceBookChildren.map((child) => {
        arr.push(child);
        child.priceBookChildren.map((child) => {
          arr.push(child);
        });
      });
    })
  );

  return arr;
}
