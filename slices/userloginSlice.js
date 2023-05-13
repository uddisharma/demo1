import { createSlice } from "@reduxjs/toolkit";

const UserLoginSlice = createSlice({
  name: "user login",
  initialState: {
    IsLogin: false,
  },
  reducers: {
    setuserLogin(state, action) {
      state.IsLogin = action.payload;
    },
  },
});
export const { setuserLogin } = UserLoginSlice.actions;
export default UserLoginSlice.reducer;