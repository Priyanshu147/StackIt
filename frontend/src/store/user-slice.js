import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {
    name: "",
    email: "",
    phoneNo: "",
    organizationName: "",
    isSuperAdmin: 0,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.userDetails.userName = action.payload.userName;
      state.userDetails.email = action.payload.email;
      state.userDetails.isSuperAdmin = action.payload.isSuperAdmin;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
