import { MESSAGE_STATUS } from "constants/status";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { displayAlert } from "features/alert/slice";
import { IPricebookItemPostDTO } from "interfaces/pricebook-item";
import pricebookItem from "services/pricebook-item";
import { isAxiosError } from "test-utils/axiosError";

export const createPricebookItem = createAsyncThunk(
  "pricebook-item/post",
  async (itemData: IPricebookItemPostDTO, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await pricebookItem.postItem(itemData);

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
