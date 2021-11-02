import Cookies from "universal-cookie";
import conversationApi from "api/conversation.api";
import { createSlice } from "@reduxjs/toolkit";
import { getDefaultConversation } from "app/thunks/conversation.thunk";

const cookie = new Cookies();
const initialState = {
  listConversation: null,
  activeConversation: null,
  loading: true,
};

export const conversationSlice = createSlice({
  name: "myConversation",
  initialState,
  reducers: {
    setListConversation: (state, action) => {
      if (!state.listConversation) state.listConversation = [];
      state.listConversation = action.payload.concat(state.listConversation);
    },
    setOnline: (state, action) => {
      const i = state.listConversation.findIndex(
        (e) => e._id === action.payload._id
      );
      if (i === -1) return;
      state.listConversation[i].online = action.payload.online;
    },
    changeOnline: (state, action) => {
      const i = state.listConversation.findIndex(
        (e) =>
          e.conversation.channelId === action.payload.channelId &&
          e.userId !== action.payload.userId
      );
      if (i === -1) return;
      if (!state.listConversation[i].online)
        state.listConversation[i].online = 0;
      if (action.payload.name === "add") state.listConversation[i].online++;
      else {
        state.listConversation[i].online--;
      }
    },
    setActiveConversation: (state, action) => {
      state.activeConversation = { ...action.payload, lastSeen: Date.now() };
      if (!action.payload?._id) {
        return;
      }
      const index = state.listConversation?.findIndex(
        (e) => e._id === action.payload._id
      );
      if (index === -1) return;

      state.listConversation[index] = {
        ...action.payload,
        lastSeen: Date.now(),
      };
      conversationApi.setLastSeen(action.payload._id, cookie.get("token"));
    },
    setLastMessage: (state, action) => {
      const message = action.payload;
      const i = state.listConversation.findIndex(
        (e) => e.conversation._id === message.conversationId
      );
      if (i === -1) return;
      state.listConversation[i].lastMessage = message;
      let arr = [...state.listConversation].filter(
        (e) => e.conversation._id !== message.conversationId
      );
      state.listConversation = [state.listConversation[i], ...arr];
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setChating: (state, action) => {
      const { user, channelId, type } = action.payload;
      const i = state.listConversation.findIndex(
        (e) => e.conversation.channelId === channelId
      );
      if (i === -1) return;

      const index = state.listConversation[i].listChatting?.findIndex(
        (e) => e._id === user._id
      );
      if ((index === -1 || index === undefined) && type === "add") {
        if (!index) {
          state.listConversation[i].listChatting = [user];
        } else {
          state.listConversation[i].listChatting?.push(user);
        }
      } else if (index !== -1 && type !== "add") {
        state.listConversation[i].listChatting?.splice(i, 1);
      }
    },
  },

  extraReducers: {
    [getDefaultConversation.pending]: (state) => {
      state.loading = true;
    },
    [getDefaultConversation.rejected]: (state) => {
      state.loading = false;
    },
    [getDefaultConversation.fulfilled]: (state) => {
      state.loading = false;
    },
  },
});

const { reducer, actions } = conversationSlice;

export const {
  setLastMessage,
  setActiveConversation,
  setListConversation,
  setOnline,
  setLoading,
  changeOnline,
  setChating,
} = actions;

export default reducer;
