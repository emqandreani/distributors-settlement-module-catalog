import { priceBookHeaderAdapater } from "adapters/priceBookHeaderAdapter";
import {
  addNewPriceBook,
  updatePriceBook,
  selectorPriceBooks,
  selectPriceBook,
} from "app/slices/priceBooks";
import { IPriceBook } from "interfaces/PriceBook";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const usePriceBookHeader = () => {
  const { ...priceBooksDynamicsProps } = useSelector(selectorPriceBooks);
  const { priceBook } = priceBooksDynamicsProps;
  const { id, startDate, endDate } = priceBook as IPriceBook;
  const { ...props } = priceBookHeaderAdapater(priceBooksDynamicsProps.priceBook as IPriceBook);

  const [startDateValue, setStartDateValue] = useState<Date | null>(null);
  const [endDateValue, setEndDateValue] = useState<Date | null>(null);
  const [nameValue, setNameValue] = useState<string>("");

  const dispatch = useDispatch();

  const { editPbId } = useParams();

  const currentPb = useMemo(
    () => priceBooksDynamicsProps.mappedPriceBooks.find(({ id }) => id === editPbId),
    [editPbId, priceBooksDynamicsProps.mappedPriceBooks]
  );

  const handleNameValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value as string);
  }, []);
  const handleStartDate = useCallback((value: Date | null) => {
    setStartDateValue(value);
  }, []);
  const handleEndDate = useCallback((value: Date | null) => {
    setEndDateValue(value);
  }, []);

  useEffect(() => {
    dispatch(selectPriceBook(currentPb as IPriceBook));
    setStartDateValue(startDate);
    setEndDateValue(endDate);
    priceBooksDynamicsProps.savedNewPriceBook &&
      dispatch(
        addNewPriceBook({
          name: nameValue,
          priceBookParentId: id,
          endDate: new Date(endDateValue as Date).toISOString(),
          startDate: new Date(startDateValue as Date).toISOString(),
        })
      );
    if (priceBooksDynamicsProps.savedEditedPriceBook) {
      dispatch(
        updatePriceBook({
          id: editPbId ?? "",
          endDate: new Date(endDateValue as Date).toISOString(),
          startDate: new Date(startDateValue as Date).toISOString(),
        })
      );
    }
  }, [
    currentPb,
    dispatch,
    editPbId,
    endDate,
    endDateValue,
    id,
    nameValue,
    priceBooksDynamicsProps.savedEditedPriceBook,
    priceBooksDynamicsProps.savedNewPriceBook,
    startDate,
    startDateValue,
  ]);

  return {
    editPbId,
    ...props,
    startDateValue,
    endDateValue,
    nameValue,
    handleNameValue,
    handleStartDate,
    handleEndDate,
  };
};

export default usePriceBookHeader;
