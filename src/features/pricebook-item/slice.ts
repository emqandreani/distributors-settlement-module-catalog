import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { InitialStateProps } from "interfaces/pricebook-item";
import {
  fullfiledSimpleCallbackCase,
  pendingSimpleCallbackCase,
  rejectCallbackCase,
} from "test-utils/reduxCallbacks";

import { createPricebookItem } from "./asyncActions";

const initialState: InitialStateProps = {
  response: null,
  isLoading: false,
  error: null,
};

export const createPricebookItemSlice = createSlice({
  name: "pricebook-item",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createPricebookItem.pending, (state) => pendingSimpleCallbackCase(state));
    builder.addCase(createPricebookItem.fulfilled, (state, action) => {
      fullfiledSimpleCallbackCase(state);
      state.response = action.payload;
    });
    builder.addCase(createPricebookItem.rejected, (state, action) =>
      rejectCallbackCase(state, action)
    );
  },
});

export const selectorPricebookItem = (state: RootState) => state.pricebookItem;

export const reducer = createPricebookItemSlice.reducer;
