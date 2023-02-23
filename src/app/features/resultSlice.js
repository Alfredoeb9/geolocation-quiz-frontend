import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { removeCookie } from "../../utils/helperAuthentication";
import { store } from "../store";

const initialState = {
  userId: null,
  result: [],
};

// export const worksheetDetails = createAsyncThunk('home/worksheetDetails', async (worksheetId, thunkAPI) => {
//   console.log('worksheetId', worksheetId);
//   try {
//     const response = await homeAPI.worksheetDetails(worksheetId);
//     return response;
//   } catch (error) {
//     const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });

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
    resetResult: (state, action) => {
      storage.removeItem("persist:root");
      storage.removeItem("persist_root");
      localStorage.removeItem("persist:root");
      localStorage.removeItem("persist_root");
      // removeCookie("geoQuiz");
      return initialState;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(quizResults.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.isSuccess = true;
  //     state.worksheetDetailsInfo = action.payload;
  //   });
  // },
});

export const { setUserId, pushResult, resetResult } = resultSlice.actions;

export const selectResultResult = (state) => state.results.result;
export const selectResultUserId = (state) => state.results.userId;

export default resultSlice.reducer;
