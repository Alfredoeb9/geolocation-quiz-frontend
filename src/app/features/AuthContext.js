import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../api/authApi";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// register user
// eslint-disable-next-line no-shadow
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const message = await authAPI.register(user);
      return message;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (emailVerificationId, thunkAPI) => {
    try {
      return await authAPI.verifyEmail(emailVerificationId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userAuthSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    // login: (state, action) => {
    //   state.user = action.payload;
    // },

    logout: (state) => {
      state.user = null;
    },
    updateUser: (state, action) => {
      // console.log(state.workout);
      // console.log(action.payload);
      // state.workout = state.workout.filter(
      //   (workout) => workout._id !== action.payload._id
      // );
      state.user = action.payload;
    },
    extraReducers: (builder) => {
      builder
        // register cases
        .addCase(register.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
        })
        .addCase(register.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.user = null;
        })
        // verify email cases
        .addCase(verifyEmail.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(verifyEmail.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(verifyEmail.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.user = null;
        })
        // login cases
        .addCase(login.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.user = null;
        });
      // forgot password cases
    },
  },
});

export const { login, logout, updateUser } = userAuthSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserAuth = (state) => state.user.user;

export default userAuthSlice.reducer;
