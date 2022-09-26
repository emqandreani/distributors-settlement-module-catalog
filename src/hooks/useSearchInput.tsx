import { ActionCreator, ActionCreatorWithPayload, PayloadAction } from "@reduxjs/toolkit";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

interface useSearchInputProps {
  submitAction?: ActionCreatorWithPayload<any> | ActionCreator<any>;
  extraPayload?: any | PayloadAction<any>;
}
const useSearchInput = ({ submitAction, extraPayload }: useSearchInputProps) => {
  const [value, setValue] = useState<null | string>(null);
  const dispatch = useDispatch();
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value.trim().toLocaleLowerCase());
  }, []);
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      //THE WHOLE DISPATCH CASE SHOULD BE TYPED AND DOCUMENTED
      if (extraPayload && submitAction) {
        //THIS CASE SHOULD BE TYPED
        dispatch(submitAction(value !== "" ? { type: extraPayload, flag: value as string } : null));
      } else if (submitAction) {
        dispatch(submitAction(value !== "" ? value : null));
      }

      return;
    },
    [value, submitAction, dispatch, extraPayload]
  );

  return { value, handleSearch, handleSubmit };
};

export default useSearchInput;
