import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IAlertSliceState } from "interfaces/alert";

export const displayAlert = createAsyncThunk<
  void,
  Omit<IAlertSliceState, "open"> & { timeOut?: number }
>("alert/showAlert", async ({ message, type, timeOut = 2500 }, { dispatch }) => {
  dispatch(showAlert({ message, type }));
  setTimeout(() => {
    dispatch(hideAlert());
  }, timeOut);
});

const initialState: IAlertSliceState = {
  open: false,
  type: null,
  message: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, { payload }: { payload: Omit<IAlertSliceState, "open"> }) => {
      state.open = true;
      state.message = payload.message;
      state.type = payload.type;
    },
    hideAlert: (state) => {
      state.open = false;
      state.message = "";
      state.type = null;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export const selectAlert = (state: RootState) => state.alert;
export const reducer = alertSlice.reducer;
