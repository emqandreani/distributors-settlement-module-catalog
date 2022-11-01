import { PRICEBOOKS_STATES } from "constants/pricebookStates";
import { STATUS } from "constants/status";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IConceptFlag,
  InitialStateProps,
  IPostPriceBookDto,
  IPriceBook,
  IPriceBookConceptsTable,
  IUpdatePriceBookDto,
} from "interfaces/pricebook";
import { RootState } from "app/store";
import {
  fullfiledSimpleCallbackCase,
  pendingSimpleCallbackCase,
  rejectCallbackCase,
} from "test-utils/reduxCallbacks";
import mapPriceBooks from "test-utils/mapPriceBooks";
import { filterPbByState } from "test-utils/filterPbByState";
import { ICleanUpRequest } from "interfaces/requests";

import { createPricebook, fetchPriceBooks, modifyPricebook } from "./asyncActions";

const initialState: InitialStateProps = {
  data: {},
  error: null,
  isLoading: false,
  filteredDataPricebook: null,
  subPriceBooks: [],
  mappedPriceBooks: [],
  activePriceBooks: [],
  draftPriceBooks: [],
  consolidatedPriceBooks: [],
  unConsolidatedPriceBooks: [],
  expiredPriceBooks: [],
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
  filteredConceptFlag: null,
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
    searchConceptFlag: (state: InitialStateProps, action: PayloadAction<IConceptFlag | null>) => {
      state.filteredConceptFlag = action.payload;
    },
    setFilteredDataPricebook: (
      state: InitialStateProps,
      action: PayloadAction<IPriceBook[] | null>
    ) => {
      state.filteredDataPricebook = action.payload;
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
    selectConcept: (
      state: InitialStateProps,
      action: PayloadAction<"service" | "distribution" | null>
    ) => {
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
    cleanPriceBookRequest: (state: InitialStateProps, action: PayloadAction<ICleanUpRequest>) => {
      switch (action.payload.type) {
        case "post":
          state.postPriceBookRequest = action.payload.payload;
          break;
        case "put":
          state.putPriceBookRequest = action.payload.payload;
          break;
        case "get":
          state.getPriceBooksRequest = action.payload.payload;
          break;
        default:
          break;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPriceBooks.pending, (state, action) => {
      pendingSimpleCallbackCase(state);
      state.getPriceBooksRequest = action.meta.requestStatus;
    });
    builder.addCase(fetchPriceBooks.fulfilled, (state, action) => {
      fullfiledSimpleCallbackCase(state);
      state.data = action.payload;
      state.getPriceBooksRequest = action.meta.requestStatus;
      state.subPriceBooks = action.payload.priceBookChildren;
      state.mappedPriceBooks = mapPriceBooks(action.payload);
      state.activePriceBooks = filterPbByState(action.payload.priceBookChildren, "active");
      state.draftPriceBooks = filterPbByState(action.payload.priceBookChildren, "draft");
      state.consolidatedPriceBooks = filterPbByState(
        action.payload.priceBookChildren,
        "consolidated"
      );
      state.unConsolidatedPriceBooks = filterPbByState(
        action.payload.priceBookChildren,
        "unconsolidated"
      );
      state.expiredPriceBooks = filterPbByState(action.payload.priceBookChildren, "expired");
      state.basePriceBookForAddition = action.payload;
    });
    builder.addCase(fetchPriceBooks.rejected, (state, action) => {
      rejectCallbackCase(state, action);
      state.getPriceBooksRequest = action.meta.requestStatus;
    });
    builder.addCase(createPricebook.pending, (state, action) => {
      state.postPriceBookRequest = Object.create(null);
      state.postPriceBookRequest!.status = action.meta.requestStatus;
    });
    builder.addCase(createPricebook.fulfilled, (state, { payload }) => {
      state.postPriceBookRequest!.status = STATUS.SUCCESSFUL;
      state.postPriceBookRequest!.id = payload.id;
      state.postPriceBookRequest!.name = payload.name;
    });
    builder.addCase(createPricebook.rejected, (state, action) => {
      state.postPriceBookRequest!.status = action.meta.requestStatus;
    });
    builder.addCase(modifyPricebook.pending, (state, action) => {
      state.putPriceBookRequest = Object.create(null);
      state.putPriceBookRequest!.status = action.meta.requestStatus;
    });
    builder.addCase(modifyPricebook.fulfilled, (state, { payload }) => {
      state.postPriceBookRequest!.status = STATUS.SUCCESSFUL;
      state.postPriceBookRequest!.id = payload.id;
      state.postPriceBookRequest!.name = payload.name;
    });
    builder.addCase(modifyPricebook.rejected, (state, action) => {
      state.putPriceBookRequest!.status = action.meta.requestStatus;
    });
  },
});

export const selectorPricebook = (state: RootState) => state.pricebook;

export const {
  selectPriceBook,
  selectNewSimulatedPriceBook,
  setFilteredDataPricebook,
  selectStateFlag,
  saveEditedPriceBook,
  addNewPriceBook,
  saveNewPriceBook,
  updatePriceBook,
  searchConceptFlag,
  selectConcept,
  removeConceptItem,
  addConceptItems,
  addConceptItemsNewPriceBook,
  selectBaseSimulatedPriceBook,
  selectRegionalPriceBookForAddition,
  selectBranchPriceBookForAddition,
  selectDistributorPriceBookForAddition,
  selectVehiclePriceBookForAddition,
  cleanPriceBookRequest,
} = pricebookSlice.actions;

export const reducer = pricebookSlice.reducer;
