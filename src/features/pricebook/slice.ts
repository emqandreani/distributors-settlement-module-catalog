import { PRICEBOOKS_STATES } from "constants/pricebookStates";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InitialStateProps,
  IPostPriceBookDto,
  IPriceBook,
  IPriceBookConceptsTable,
  IUpdatePriceBookDto,
} from "interfaces/pricebook";
import { RootState } from "app/store";

const initialState: InitialStateProps = {
  data: {},
  error: null,
  isLoading: false,
  subPriceBooks: [],
  mappedPriceBooks: [],
  activePriceBooks: [],
  draftPriceBooks: [],
  consolidatedPriceBooks: [],
  unConsolidatedPriceBooks: [],
  expiredPriceBooks: [],
  filteredPriceBooks: null,
  basePriceBookForAddition: null,
  selectedRegionalPriceBookForAddition: null,
  selectedBranchPriceBookForAddition: null,
  selectedVehiclePriceBookForAddition: null,
  selectedDistributorPriceBookForAddition: null,
  newPriceBook: null,
  editedPriceBook: null,
  savedNewPriceBook: false,
  savedEditedPriceBook: false,
  addedConcepts: [],
  newPriceBookConcepts: [],
  stateFilterFlag: null,
  selectedConcept: "service",
  baseSimulatedPriceBook: null,
  newSimulatedPriceBook: null,
  getPriceBooksRequest: null,
  postPriceBookRequest: null,
  putPriceBookRequest: null,
};

export const pricebookSlice = createSlice({
  name: "pricebooks",
  initialState,
  reducers: {
    selectPriceBook: (state: InitialStateProps, action: PayloadAction<IPriceBook | null>) => {
      if (action.payload) {
        state.data = action.payload;
        state.subPriceBooks = action.payload.priceBookChildren;
        state.activePriceBooks = action.payload.priceBookChildren.filter((p: IPriceBook) => {
          return (
            p.priceBookState.description.trim().toLocaleLowerCase() ===
            PRICEBOOKS_STATES.ACTIVE.trim().toLocaleLowerCase()
          );
        });
        state.draftPriceBooks = action.payload.priceBookChildren.filter((p: IPriceBook) => {
          return (
            p.priceBookState.description.trim().toLocaleLowerCase() ===
            PRICEBOOKS_STATES.DRAFT.trim().toLocaleLowerCase()
          );
        });
        state.consolidatedPriceBooks = action.payload.priceBookChildren.filter((p: IPriceBook) => {
          return (
            p.priceBookState.description.trim().toLocaleLowerCase() ===
            PRICEBOOKS_STATES.CONSOLIDATED.trim().toLocaleLowerCase()
          );
        });
        state.unConsolidatedPriceBooks = action.payload.priceBookChildren.filter(
          (p: IPriceBook) => {
            return (
              p.priceBookState.description.trim().toLocaleLowerCase() ===
              PRICEBOOKS_STATES.UNCONSOLIDATED.trim().toLocaleLowerCase()
            );
          }
        );
        state.expiredPriceBooks = action.payload.priceBookChildren.filter((p: IPriceBook) => {
          return (
            p.priceBookState.description.trim().toLocaleLowerCase() ===
            PRICEBOOKS_STATES.EXPIRED.trim().toLocaleLowerCase()
          );
        });
      } else {
        return;
      }
    },
    selectStateFlag: (state: InitialStateProps, action: PayloadAction<string | null>) => {
      state.stateFilterFlag = action.payload;
    },
    // searchConceptFlag: (state: InitialStateProps, action: PayloadAction<IConceptFlag | null>) => {
    //   state.filteredConceptFlag = action.payload;
    // },
    filterPriceBookByString: (state: InitialStateProps, action: PayloadAction<string | null>) => {
      if (action.payload) {
        state.filteredPriceBooks = state.subPriceBooks.filter((p: IPriceBook) => {
          return (
            p.name
              .trim()
              .toLocaleLowerCase()
              .includes(action.payload as string) ||
            p.createdBy
              .trim()
              .toLocaleLowerCase()
              .includes(action.payload as string)
          );
        });
      } else {
        state.filteredPriceBooks = action.payload as null;
      }
    },
    selectRegionalPriceBookForAddition: (
      state: InitialStateProps,
      action: PayloadAction<IPriceBook | null>
    ) => {
      state.selectedRegionalPriceBookForAddition = action.payload;
    },
    selectBranchPriceBookForAddition: (
      state: InitialStateProps,
      action: PayloadAction<IPriceBook | null>
    ) => {
      state.selectedBranchPriceBookForAddition = action.payload;
    },
    selectVehiclePriceBookForAddition: (
      state: InitialStateProps,
      action: PayloadAction<IPriceBook | null>
    ) => {
      state.selectedVehiclePriceBookForAddition = action.payload;
    },
    selectDistributorPriceBookForAddition: (
      state: InitialStateProps,
      action: PayloadAction<IPriceBook | null>
    ) => {
      state.selectedDistributorPriceBookForAddition = action.payload;
    },
    selectConcept: (state: InitialStateProps, action: PayloadAction<string | null>) => {
      state.selectedConcept = action.payload;
    },
    addConceptItems: (
      state: InitialStateProps,
      action: PayloadAction<IPriceBookConceptsTable[]>
    ) => {
      state.addedConcepts = action.payload;
    },
    addConceptItemsNewPriceBook: (
      state: InitialStateProps,
      action: PayloadAction<IPriceBookConceptsTable[]>
    ) => {
      state.newPriceBookConcepts = action.payload;
    },
    removeConceptItem: (state: InitialStateProps, action: PayloadAction<string>) => {
      state.addedConcepts = state.addedConcepts.filter(({ id }) => id != action.payload);
    },
    selectBaseSimulatedPriceBook: (
      state: InitialStateProps,
      action: PayloadAction<string | null>
    ) => {
      state.baseSimulatedPriceBook = action.payload;
    },
    selectNewSimulatedPriceBook: (
      state: InitialStateProps,
      action: PayloadAction<string | null>
    ) => {
      state.newSimulatedPriceBook = action.payload;
    },
    saveNewPriceBook: (state: InitialStateProps, action: PayloadAction<boolean>) => {
      state.savedNewPriceBook = action.payload;
    },
    saveEditedPriceBook: (state: InitialStateProps, action: PayloadAction<boolean>) => {
      state.savedEditedPriceBook = action.payload;
    },
    addNewPriceBook: (
      state: InitialStateProps,
      action: PayloadAction<IPostPriceBookDto | null>
    ) => {
      state.newPriceBook = action.payload;
    },
    updatePriceBook: (
      state: InitialStateProps,
      action: PayloadAction<IUpdatePriceBookDto | null>
    ) => {
      state.editedPriceBook = action.payload;
    },
    // cleanPriceBookRequest: (state: InitialStateProps, action: PayloadAction<ICleanUpRequest>) => {
    //   switch (action.payload.type) {
    //     case "post":
    //       state.postPriceBookRequest = action.payload.payload;
    //       break;
    //     case "put":
    //       state.putPriceBookRequest = action.payload.payload;
    //       break;
    //     case "get":
    //       state.getPriceBooksRequest = action.payload.payload;
    //       break;
    //     default:
    //       break;
    //   }
    // },
  },
});

export const selectorPricebook = (state: RootState) => state.pricebook;

export const { ...actions } = pricebookSlice.actions;

export const reducer = pricebookSlice.reducer;
