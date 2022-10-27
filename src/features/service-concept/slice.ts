import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { InitialStateProps } from "interfaces/service-concept";
import {
  fullfiledSimpleCallbackCase,
  pendingSimpleCallbackCase,
  rejectCallbackCase,
} from "test-utils/reduxCallbacks";

import { fetchServiceConcept } from "./asyncActions";

const initialState: InitialStateProps = {
  data: [],
  isLoading: false,
  error: null,
};

export const serviceConceptSlice = createSlice({
  name: "distribution-concept",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchServiceConcept.pending, (state) => pendingSimpleCallbackCase(state));
    builder.addCase(fetchServiceConcept.fulfilled, (state, { payload }) => {
      fullfiledSimpleCallbackCase(state);
      state.data = payload;
    });
    builder.addCase(fetchServiceConcept.rejected, (state, action) =>
      rejectCallbackCase(state, action)
    );
  },
});

export const selectorServiceConcept = (state: RootState) => state.serviceConcept;

export const reducer = serviceConceptSlice.reducer;
