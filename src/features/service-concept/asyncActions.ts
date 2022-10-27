import { MESSAGE_STATUS } from "constants/status";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { displayAlert } from "features/alert/slice";
import { IServiceConceptItem } from "interfaces/service-concept";
import ServiceConcept from "services/service-concept";
import { isAxiosError } from "test-utils/axiosError";

export const fetchServiceConcept = createAsyncThunk<IServiceConceptItem[], undefined, {}>(
  "service-concept/get",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await ServiceConcept.getServiceConcept(id);

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
