import { SerializedError } from "@reduxjs/toolkit";

export const pendingSimpleCallbackCase = (
  state: { [key: string]: unknown },
  flag: string = "isLoading"
) => {
  if (state.hasOwnProperty(flag)) {
    state[flag] = true;
  }
};

export const fullfiledSimpleCallbackCase = (
  state: { [key: string]: unknown },
  flag: string = "isLoading"
) => {
  if (state.hasOwnProperty(flag)) {
    state[flag] = false;
  }
};

export const rejectCallbackCase = (
  state: { [key: string]: unknown },
  action: { payload?: unknown; error?: SerializedError },
  flag: string = "isLoading"
) => {
  if (action.payload) {
    state.error = action.payload as string;
  } else {
    state.error = action.error?.message as string;
  }

  if (state.hasOwnProperty(flag)) {
    state[flag] = false;
  }
};
