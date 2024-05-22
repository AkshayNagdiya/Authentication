import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const useExist = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: useExist ? useExist : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = false;
        state.isError = false;
        state.isLoading = false;
        state.message = "";
      });
  },
});

export default authSlice.reducer;

// Register User

export const registerUser = createAsyncThunk(
  "REGISTER/USER",
  async (formData, thunkAPI) => {
    try {
      return await authService.register(formData);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// LogOut User

export const logOutUser = createAsyncThunk("LOGOUT/USER", async () => {
  localStorage.removeItem("user");
});

// Login User
export const loginUser = createAsyncThunk(
  "LOGIN/USER",
  async (formData, thunkAPI) => {
    try {
      return await authService.login(formData);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
