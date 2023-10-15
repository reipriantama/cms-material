import { createSlice } from "@reduxjs/toolkit";

const storedDefaultEmailText =
  localStorage.getItem("defaultEmailText") || "Admin";

const initialState = {
  email: storedDefaultEmailText,
  role: "",
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  defaultEmailText: storedDefaultEmailText,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerAuth: (state, action) => {
      const { email, role, access_token } = action.payload;

      state.email = email;
      state.role = role;
      state.token = access_token;

      localStorage.setItem("token", access_token);
      localStorage.setItem("defaultEmailText", email)
    },
    logout: (state) => {
      state.emailAddress = "";
      state.userRole = "";
      state.token = "";

      localStorage.removeItem("token");
    },
  },
});

export const { registerAuth, logout } = auth.actions;
export default auth.reducer;
