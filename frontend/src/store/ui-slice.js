import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: {
    status: false,
    isGlobal: true,
  },
  confirmBox: {
    status: false,
    message: "",
    onConfirm: null,
  },
  snackBar: {
    status: false,
    message: "",
    severity: "",
  },
  isAuthorized: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setSnackBar(state, action) {
      state.snackBar = action.payload;
    },
    setIsAuthorized(state, action) {
      state.isAuthorized = action.payload;
    },
    setConfirmBox(state, action) {
      state.confirmBox = action.payload;
    },
    resetConfirmBox(state, action) {
      state.confirmBox.status = false;
      state.confirmBox.message = "";
      state.confirmBox.onConfirm = null;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
