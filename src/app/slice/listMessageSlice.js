import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const authSlice = createSlice({
  name: "listMessage",
  initialState,
  reducers: {
    setListMessage: (state, action) => {
      if (!action.payload) return [];
      if (!state) state = [];
      return action.payload.concat(state);
    },
    addNewMessage: (state, action) => {
      if (!action.payload) return;
      state.push(action.payload);
    },
  },
});

const { reducer, actions } = authSlice;

export const { setListMessage, addNewMessage } = actions;

export default reducer;
