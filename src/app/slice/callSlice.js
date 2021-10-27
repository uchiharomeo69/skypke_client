import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  callObject: null,
  receiveObject: null,
};
export const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    setReceiveObject(state, action) {
      state.receiveObject = action.payload;
    },
    setCallObject(state, action) {
      state.callObject = action.payload;
    },
  },
});

const { reducer, actions } = callSlice;

export const { setCallObject, setReceiveObject } = actions;

export default reducer;
