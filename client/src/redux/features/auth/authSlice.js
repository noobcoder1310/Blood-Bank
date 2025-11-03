import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, userLogin, userRegister } from "./authAction";

// ✅ Safely parse user from localStorage
let user = null;
let token = null;

try {
  const userData = localStorage.getItem("user");
  const tokenData = localStorage.getItem("token");

  user = userData && userData !== "undefined" ? JSON.parse(userData) : null;
  token = tokenData && tokenData !== "undefined" ? tokenData : null;
} catch (error) {
  console.error("Failed to parse localStorage data:", error);
  user = null;
  token = null;
}

// ✅ Initial state
const initialState = {
  loading: false,
  existingUser: user,
  token: token,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 🟡 Login cases
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.existingUser = payload.existingUser;
      state.token = payload.token;

      // ✅ Store in localStorage
      localStorage.setItem("user", JSON.stringify(payload.existingUser));
      localStorage.setItem("token", payload.token);
    });

    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // 🟡 Register cases
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.existingUser = payload.existingUser;

      // ✅ Store in localStorage if needed
      localStorage.setItem("user", JSON.stringify(payload.existingUser));
    });

    builder.addCase(userRegister.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // 🟡 Get Current User
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.existingUser = payload.existingUser;

      // ✅ Update localStorage
      localStorage.setItem("user", JSON.stringify(payload.existingUser));
    });

    builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default authSlice.reducer;
