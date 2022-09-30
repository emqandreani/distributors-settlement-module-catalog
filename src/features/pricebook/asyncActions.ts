import { MESSAGE_STATUS } from "constants/status";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { displayAlert } from "features/alert/slice";
import { IPostPriceBookDto, IPriceBook, IUpdatePriceBookDto } from "interfaces/pricebook";
import Pricebook from "services/pricebook";
import { isAxiosError } from "test-utils/axiosError";

export const fetchPriceBooks = createAsyncThunk<IPriceBook, void>(
  "pricebooks/get",
  async (undefined, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await Pricebook.getPricebook();

      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        const ERROR_CODE = error.response?.status as number;

        dispatch(
          displayAlert({
            type: "error",
            message: MESSAGE_STATUS.get(ERROR_CODE) ?? "Ha ocurrido un error",
          })
        );

        return rejectWithValue(MESSAGE_STATUS.get(ERROR_CODE));
      }

      return rejectWithValue(error);
    }
  }
);

export const createPricebook = createAsyncThunk(
  "pricebooks/post",
  async (pb: IPostPriceBookDto, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await Pricebook.postPricebook(pb);

      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        const ERROR_CODE = error.response?.status as number;

        dispatch(
          displayAlert({
            type: "error",
            message: MESSAGE_STATUS.get(ERROR_CODE) ?? "Ha ocurrido un error",
          })
        );

        return rejectWithValue(MESSAGE_STATUS.get(ERROR_CODE));
      }

      return rejectWithValue(error);
    }
  }
);

export const modifyPricebook = createAsyncThunk(
  "pricebooks/put",
  async (pb: IUpdatePriceBookDto, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await Pricebook.putPricebook(pb);

      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        const ERROR_CODE = error.response?.status as number;

        dispatch(
          displayAlert({
            type: "error",
            message: MESSAGE_STATUS.get(ERROR_CODE) ?? "Ha ocurrido un error",
          })
        );

        return rejectWithValue(MESSAGE_STATUS.get(ERROR_CODE));
      }

      return rejectWithValue(error);
    }
  }
);
