import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

interface initialStateProps {
  toggleSimulatorPanel: boolean;
  toggleConceptItemDialog: boolean;
  togglePriceBookSnack: boolean;
}
const initialState: initialStateProps = {
  toggleSimulatorPanel: false,
  toggleConceptItemDialog: false,
  togglePriceBookSnack: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleSimulator: (state: initialStateProps, action: PayloadAction<boolean>) => {
      state.toggleSimulatorPanel = action.payload;
    },
    toggleConceptDialog: (state: initialStateProps, action: PayloadAction<boolean>) => {
      state.toggleConceptItemDialog = action.payload;
    },
    togglePbSnack: (state: initialStateProps, action: PayloadAction<boolean>) => {
      state.togglePriceBookSnack = action.payload;
    },
  },
});

export const { toggleSimulator, toggleConceptDialog, togglePbSnack } = layoutSlice.actions;

export const selectorLayout = (state: RootState) => state.layout;

export const reducer = layoutSlice.reducer;
