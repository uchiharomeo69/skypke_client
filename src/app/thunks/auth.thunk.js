import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "api/user.api";

export const getUser = createAsyncThunk("user/getUser", async (token) => {
  const res = await userApi.getInfor(token);
  return res?.user;
});
