import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { removeCookie } from "../../utils/helperAuthentication";
import { store } from "../store";

const initialState = {
  userId: null,
  result: [],
};

export const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },

    pushResult: (state, action) => {
      state.result.push(action.payload);
    },
    updateResult: (state, action) => {
      const { trace, check } = action.payload;
      state.result.fill(check, trace, trace + 1);
    },
    resetResult: (state, action) => {
      storage.removeItem("persist:root");
      storage.removeItem("persist_root");
      localStorage.removeItem("persist:root");
      localStorage.removeItem("persist_root");
      return initialState;
    },
  },
});

export const { setUserId, pushResult, updateResult, resetResult } =
  resultSlice.actions;

export const selectResultResult = (state) => state.results.result;
export const selectResultUserId = (state) => state.results.userId;

export default resultSlice.reducer;
