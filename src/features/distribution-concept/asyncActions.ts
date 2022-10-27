import { MESSAGE_STATUS } from "constants/status";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { displayAlert } from "features/alert/slice";
import { IDistributionConceptItem } from "interfaces/distribution-concept";
import DistributionConcept from "services/distribution-concept";
import { isAxiosError } from "test-utils/axiosError";

export const fetchDistributionConcept = createAsyncThunk<IDistributionConceptItem[], undefined, {}>(
  "distribution-concept/get",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await DistributionConcept.getDistributionConcept(id);

      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        const ERROR_CODE = error.response?.status as number;

        dispatch(
          displayAlert({
            type: "error",
            message: MESSAGE_STATUS.get(ERROR_CODE) ?? "Ha ocurrido un error",
          })
        );

        return rejectWithValue(MESSAGE_STATUS.get(ERROR_CODE));
      }

      return rejectWithValue(error);
    }
  }
);
