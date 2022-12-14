import { combineReducers, configureStore } from "@reduxjs/toolkit";
import React from "react";
import { createDispatchHook, createSelectorHook, ReactReduxContextValue } from "react-redux";
import distributor from "features/distributor";
import pricebook from "features/pricebook";
import pricebookItem from "features/pricebook-item";
import distributionConcept from "features/distribution-concept";
import serviceConcept from "features/service-concept";
import layout from "features/layout";
import alert from "features/alert";
import search from "features/search";

export const reducers = combineReducers({
  distributor,
  pricebook,
  pricebookItem,
  distributionConcept,
  serviceConcept,
  layout,
  alert,
  search,
});

export const store = configureStore({
  reducer: reducers,
});

export const ModuleContext = React.createContext<ReactReduxContextValue<RootState, any>>(
  null as any
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useLocalDispatch = createDispatchHook(ModuleContext);
export const useLocalSelector = createSelectorHook(ModuleContext);
