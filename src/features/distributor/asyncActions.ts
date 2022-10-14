import { MESSAGE_STATUS } from "constants/status";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { displayAlert } from "features/alert/slice";
import { IAssignDistributorDto, IDistributor } from "interfaces/distributor";
import Distributor from "services/distributor";
import { isAxiosError } from "test-utils/axiosError";

export const fetchDistributor = createAsyncThunk<IDistributor[], void>(
  "distributor/get",
  async (undefined, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await Distributor.getDistributor();

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

export const assignDistributors = createAsyncThunk(
  "distributors/assign-distributors",
  async (distributorData: IAssignDistributorDto, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await Distributor.putDistributor(distributorData);

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
