import AuthReducer from "app/slice/authSlice";
import CallReducer from "app/slice/callSlice";
import ComponentReducer from "app/slice/componentSlice";
import ConversationReducer from "app/slice/conversationSclice";
import ListMessageReducer from "app/slice/listMessageSlice";
import SendingReducer from "app/slice/sendingSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    component: ComponentReducer,
    myConversation: ConversationReducer,
    listMessage: ListMessageReducer,
    call: CallReducer,
    sending: SendingReducer,
  },
});
