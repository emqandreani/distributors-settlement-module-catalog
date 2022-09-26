import { postConceptItemAdapter } from "adapters/postConceptItemAdapter";
import { toggleConceptDialog } from "app/slices/layout";
import { createConceptItem } from "app/slices/priceBookItem";
import {
  addConceptItems,
  addConceptItemsNewPriceBook,
  selectorPriceBooks,
} from "app/slices/priceBooks";
import { IPriceBook } from "interfaces/PriceBook";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useDispatchPriceBookItem = () => {
  const dispatch = useDispatch();
  const { priceBook } = useSelector(selectorPriceBooks);
  const { addedConcepts } = useSelector(selectorPriceBooks);

  const handleDispatchItems = useCallback(() => {
    if (addedConcepts.length > 1) {
      addedConcepts.map((concept) =>
        dispatch(createConceptItem(postConceptItemAdapter(concept, priceBook as IPriceBook)))
      );
    } else {
      dispatch(
        createConceptItem(postConceptItemAdapter(addedConcepts[0], priceBook as IPriceBook))
      );
    }
  }, [addedConcepts, dispatch, priceBook]);

  const handleDispatchPriceBook = useCallback(() => {
    dispatch(addConceptItemsNewPriceBook(addedConcepts));
    dispatch(addConceptItems([]));
    dispatch(toggleConceptDialog(false));
  }, [addedConcepts, dispatch]);

  return { handleDispatchItems, handleDispatchPriceBook, dispatch };
};

export default useDispatchPriceBookItem;
