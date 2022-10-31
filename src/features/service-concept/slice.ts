import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { InitialStateProps, IServiceConceptItem } from "interfaces/service-concept";
import {
  fullfiledSimpleCallbackCase,
  pendingSimpleCallbackCase,
  rejectCallbackCase,
} from "test-utils/reduxCallbacks";

import { fetchServiceConcept } from "./asyncActions";

const initialState: InitialStateProps = {
  data: [],
  filteredData: null,
  isLoading: false,
  error: null,
};

export const serviceConceptSlice = createSlice({
  name: "distribution-concept",
  initialState,
  reducers: {
    setFilteredDataService: (
      state: InitialStateProps,
      action: PayloadAction<IServiceConceptItem[] | null>
    ) => {
      state.filteredData = action.payload;
    },
  },
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

export const { setFilteredDataService } = serviceConceptSlice.actions;

export const selectorServiceConcept = (state: RootState) => state.serviceConcept;

export const reducer = serviceConceptSlice.reducer;
