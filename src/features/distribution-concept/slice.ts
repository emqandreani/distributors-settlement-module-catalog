import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { InitialStateProps } from "interfaces/distribution-concept";
import {
  fullfiledSimpleCallbackCase,
  pendingSimpleCallbackCase,
  rejectCallbackCase,
} from "test-utils/reduxCallbacks";

import { fetchDistributionConcept } from "./asyncActions";

const initialState: InitialStateProps = {
  data: [],
  isLoading: false,
  error: null,
};

export const distributionConceptSlice = createSlice({
  name: "distribution-concept",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchDistributionConcept.pending, (state) => pendingSimpleCallbackCase(state));
    builder.addCase(fetchDistributionConcept.fulfilled, (state, { payload }) => {
      fullfiledSimpleCallbackCase(state);
      state.data = payload;
    });
    builder.addCase(fetchDistributionConcept.rejected, (state, action) =>
      rejectCallbackCase(state, action)
    );
  },
});

export const selectorDistributionConcept = (state: RootState) => state.distributionConcept;

export const reducer = distributionConceptSlice.reducer;
