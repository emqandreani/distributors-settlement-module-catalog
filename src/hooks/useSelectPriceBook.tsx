import { selectorPriceBooks, selectPriceBook, selectStateFlag } from "app/slices/priceBooks";
import { IPriceBook } from "interfaces/PriceBook";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const useSelectPriceBook = () => {
  const dispatch = useDispatch();

  const { ...dynamicIds } = useParams();

  const { ...priceBooksDynamicsProps } = useSelector(selectorPriceBooks);

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
