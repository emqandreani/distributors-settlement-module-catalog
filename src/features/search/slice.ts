import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface initialStateProps {
  searchValue: string | null;
  selector: string | null;
  flag: string | null;
}

const initialState: initialStateProps = {
  searchValue: null,
  selector: null,
  flag: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValues: (state: initialStateProps, action: PayloadAction<initialStateProps>) => {
      state.flag = action.payload.flag;
      state.selector = action.payload.selector;
      state.searchValue = action.payload.searchValue;
    },
  },
});
export const selectorSearch = (state: RootState) => state.search;
export const { setSearchValues } = searchSlice.actions;
export const reducer = searchSlice.reducer;
