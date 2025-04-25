import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    error: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    }
  },

}
);

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
