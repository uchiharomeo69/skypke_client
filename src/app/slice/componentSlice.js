import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAccount: false,
  showNotification: false,
  showContact: false,
};
export const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    setShowAccount: (state) => {
      state.showAccount = state.showAccount ? false : true;
      if (state.showNotification) state.showNotification = false;
    },
    setShowNotification: (state) => {
      state.showNotification = state.showNotification ? false : true;
      if (state.showAccount) state.showAccount = false;
    },
    setInital: (state) => {
      return { ...initialState, showContact: state.showContact };
    },
    setContact: (state, action) => {
      state.showContact = action.payload;
    },
  },
});

const { reducer, actions } = componentSlice;

export const { setShowAccount, setShowNotification, setInital, setContact } =
  actions;

export default reducer;
