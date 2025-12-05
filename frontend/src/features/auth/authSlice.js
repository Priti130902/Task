import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// LocalStorage se initial values
const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
};

// ✅ LOGIN
export const loginUser = createAsyncThunk(
  "/api/auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/api/auth/login", data); // { user, token }
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { msg: "Login failed" }
      );
    }
  }
);

// ✅ REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/auth/register", data); // { user, token }
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { msg: "Register failed" }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        // localStorage me bhi save karo — refresh ke baad bhi naam dikhe
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { msg: "Login failed" };
        state.isAuthenticated = false;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // register ke baad direct login jaisa hi treat kara
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { msg: "Register failed" };
      });
  },
});

export const { logout } = authSlice.actions;

// SELECTORS
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.loading;

export default authSlice.reducer;
