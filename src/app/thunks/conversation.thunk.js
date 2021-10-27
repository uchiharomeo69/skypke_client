import {
  setActiveConversation,
  setListConversation,
  setOnline,
} from "app/slice/conversationSclice";

import conversationApi from "api/conversation.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import sendToServer from "socket/sendToServer";

export const getDefaultConversation = createAsyncThunk(
  "conversation/getDefault",
  async (token, thunkAPI) => {
    const res = await conversationApi.getConversation(token);
    thunkAPI.dispatch(setListConversation(res.data));
    thunkAPI.dispatch(
      setActiveConversation(res.data.length > 0 ? res.data[0] : {})
    );
    for await (const e of res.data) {
      let data = await sendToServer.connectConversation(e);
      thunkAPI.dispatch(setOnline(data));
    }

    return res.data;
  }
);
