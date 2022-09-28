import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IDistributor, InitialStateProps } from "interfaces/Distributor";
import {
  fullfiledSimpleCallbackCase,
  pendingSimpleCallbackCase,
  rejectCallbackCase,
} from "test-utils/reduxCallbacks";

import { assignDistributors, fetchDistributor } from "./asyncActions";

const initialState: InitialStateProps = {
  data: [],
  isLoading: false,
  error: null,
  assignedDistributors: [],
  postResponse: null,
};

export const distributorSlice = createSlice({
  name: "distributors",
  initialState,
  reducers: {
    selectAssignedDistributors: (
      state: InitialStateProps,
      action: PayloadAction<IDistributor[]>
    ) => {
      state.assignedDistributors = action.payload;
    },
    removeAssignedDistributor: (state: InitialStateProps, action: PayloadAction<string>) => {
      state.assignedDistributors = state.assignedDistributors!.filter(
        ({ distributorId }) => distributorId != action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDistributor.pending, (state) => pendingSimpleCallbackCase(state));
    builder.addCase(fetchDistributor.fulfilled, (state, { payload }) => {
      fullfiledSimpleCallbackCase(state);
      state.data = payload;
    });
    builder.addCase(fetchDistributor.rejected, (state, action) =>
      rejectCallbackCase(state, action)
    );
    builder.addCase(assignDistributors.pending, (state: InitialStateProps, action) => {
      state.postResponse = Object.create(null);
      state.postResponse!.status = action.meta.requestStatus;
    });
    builder.addCase(assignDistributors.fulfilled, (state: InitialStateProps, { meta, payload }) => {
      state.postResponse = { status: meta.requestStatus, ...payload };
    });
    builder.addCase(assignDistributors.rejected, (state: InitialStateProps, action) => {
      state.postResponse!.status = action.meta.requestStatus;
    });
  },
});

export const { selectAssignedDistributors, removeAssignedDistributor } = distributorSlice.actions;

export const selectorDistributor = (state: RootState) => state.distributor;

export const reducer = distributorSlice.reducer;
