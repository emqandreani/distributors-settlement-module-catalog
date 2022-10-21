import { useLocalDispatch, useLocalSelector } from "app/store";
import { selectorPricebook, selectPriceBook, selectStateFlag } from "features/pricebook/slice";
import { IPriceBook } from "interfaces/pricebook";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router";

const useSelectPriceBook = () => {
  const dispatch = useLocalDispatch();

  const { ...dynamicIds } = useParams();

  console.log(dynamicIds);

  const { ...priceBooksDynamicsProps } = useLocalSelector(selectorPricebook);

  const currentId = useMemo(() => Object.values(dynamicIds).pop(), [dynamicIds]);
  const endLevel = useMemo(() => dynamicIds.hasOwnProperty("distributorPbId"), [dynamicIds]);

  const currentPb = useMemo(
    () =>
      priceBooksDynamicsProps.mappedPriceBooks.find(({ id }) => id === currentId) ??
      priceBooksDynamicsProps.mappedPriceBooks.find(({ name }) => name === "Master"),
    [currentId, priceBooksDynamicsProps.mappedPriceBooks]
  );

  useEffect(() => {
    dispatch(selectPriceBook(currentPb as IPriceBook));

    return () => {
      dispatch(selectStateFlag(null));
      dispatch(selectPriceBook(null));
    };
  }, [currentPb, dispatch]);

  return { endLevel };
};

export default useSelectPriceBook;
