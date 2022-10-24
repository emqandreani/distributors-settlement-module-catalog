import {
  addConceptItems,
  addConceptItemsNewPriceBook,
  selectorPricebook,
} from "features/pricebook/slice";
import { createPricebookItem } from "features/pricebook-item/asyncActions";
import { useCallback } from "react";
import { postConceptItemAdapter } from "adapters/postConceptItemAdapter";
import { IPriceBook } from "interfaces/pricebook";
import { toggleConceptDialog } from "features/layout";
import { useLocalDispatch, useLocalSelector } from "app/store";
const useDispatchPriceBookItem = () => {
  const dispatch = useLocalDispatch();
  const { data } = useLocalSelector(selectorPricebook);
  const { addedConcepts } = useLocalSelector(selectorPricebook);

  const handleDispatchItems = useCallback(() => {
    if (addedConcepts.length > 1) {
      addedConcepts.map((concept) =>
        dispatch(createPricebookItem(postConceptItemAdapter(concept, data as IPriceBook)))
      );
    } else {
      dispatch(createPricebookItem(postConceptItemAdapter(addedConcepts[0], data as IPriceBook)));
    }
  }, [addedConcepts, dispatch, data]);

  const handleDispatchPriceBook = useCallback(() => {
    dispatch(addConceptItemsNewPriceBook(addedConcepts));
    dispatch(addConceptItems([]));
    dispatch(toggleConceptDialog(false));
  }, [addedConcepts, dispatch]);

  return { handleDispatchItems, handleDispatchPriceBook, dispatch };
};

export default useDispatchPriceBookItem;
