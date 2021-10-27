import { getToken, getUser } from "app/thunks/auth.thunk";

import Cookies from "universal-cookie";
import { createSlice } from "@reduxjs/toolkit";

const cookies = new Cookies();
const initialState = {
  token: cookies.get("token"),
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [getUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getUser.fulfilled]: (state, action) => {
      state.error = null;
      state.user = action.payload;
    },
  },
});

const { reducer, actions } = authSlice;

export const { setToken, setError } = actions;

export default reducer;
