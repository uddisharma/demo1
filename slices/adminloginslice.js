import { createSlice } from "@reduxjs/toolkit";

const AdminLoginSlice = createSlice({
  name: "admin login",
  initialState: {
    IsLogin: false,
  },
  reducers: {
    setadminLogin(state, action) {
      state.IsLogin = action.payload;
    },
  },
});
export const { setadminLogin } = AdminLoginSlice.actions;
export default AdminLoginSlice.reducer;