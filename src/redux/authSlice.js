import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosConfig } from "../api/axiosConfig";

const initialState = {
  isLoggedIn: false,
  error: null,
  loading: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      sessionStorage.clear();

      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.access_token;
        // localStorage.setItem("jwtToken", action.payload.access_token)
      })
      .addCase(loginAsync.rejected, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
      });
  },
});
export const { setUser, logout } = authSlice.actions;

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post("web-authenticate", credentials);
      console.log({ response });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export default authSlice.reducer;
