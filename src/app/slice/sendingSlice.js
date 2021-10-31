import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatting: false,
  sendingText: null,
};

export const sendingSlice = createSlice({
  name: "sending",
  initialState,
  reducers: {
    setSending: (state, action) => {
      state.sendingText = action.payload;
    },
  },
});

const { reducer, actions } = sendingSlice;

export const { setSending } = actions;

export default reducer;
