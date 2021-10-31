import "features/call/callModel/callModel.scss";

import React, { useEffect } from "react";
import { addNewMessage, setListMessage } from "app/slice/listMessageSlice";
import {
  changeOnline,
  setLastMessage,
  setListConversation,
  setLoading,
} from "app/slice/conversationSclice";
import { useDispatch, useSelector } from "react-redux";

import ChatBox from "../chatBox/ChatBox";
import Contact from "../Contact/Contact";
import DirectChat from "../directChat/DirectChat";
import { client } from "socket/socket";
import conversationApi from "api/conversation.api";
import { getDefaultConversation } from "app/thunks/conversation.thunk";
import recieveFromServer from "socket/recieveFromServer";
import sendToServer from "socket/sendToServer";
import { setError } from "app/slice/authSlice";
import { setSending } from "app/slice/sendingSlice";

function ChatDetail() {
  const listMessage = useSelector((state) => state.listMessage);
  const activeConversation = useSelector(
    (state) => state.myConversation.activeConversation
  );
  const listConversation = useSelector(
    (state) => state.myConversation.listConversation
  );
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.myConversation.loading);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const showContact = useSelector((state) => state.component.showContact);

  // get list conversation ban dau
  useEffect(() => {
    async function getConversation() {
      try {
        await dispatch(getDefaultConversation(token));
      } catch (error) {
        dispatch(setError(error.response?.data));
      }
    }
    getConversation();
  }, []);

  // get list message
  useEffect(() => {
    async function getListMessage() {
      try {
        if (!activeConversation || !loading) return;
        const skip = listMessage ? listMessage.length : 0;
        const res = await conversationApi.getListMessage(
          activeConversation?.conversation?._id,
          token,
          skip
        );

        dispatch(setListMessage(res?.data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data));
      }
    }
    getListMessage();
  }, [activeConversation, loading]);

  // add new message
  useEffect(() => {
    async function getMessageFromServer() {
      const ms = await recieveFromServer.messageFromServer();
      if (ms.message.senderId === user._id) {
        dispatch(setSending(null));
      }
      if (ms?.message?.conversationId === activeConversation.conversation._id) {
        dispatch(addNewMessage(ms?.message));
      }
      dispatch(setLastMessage(ms?.message));
    }
    getMessageFromServer();
    return () => {
      client.off("getMessage");
    };
  }, [listMessage]);

  //add new conversation
  useEffect(() => {
    async function getConnect() {
      const { conversation } = await recieveFromServer.someoneConnect();
      dispatch(setListConversation([conversation]));
      await sendToServer.connectConversation(conversation);
    }
    getConnect();
    return () => {
      client.off("someoneConnect");
    };
  }, [listConversation]);

  // handle someone online
  useEffect(() => {
    async function getSomeOneOnline() {
      const data = await recieveFromServer.someoneOnline();
      dispatch(changeOnline(data));
    }
    getSomeOneOnline();
    return () => {
      client.off("someoneOnline");
    };
  }, [listConversation]);

  // handle someonecall

  return (
    <>
      <div className="md:pl-16 pt-16">
        <div className="-mt-16 ml-auto xl:-ml-16 mr-auto xl:pl-16 pt-16 xl:h-screen w-auto sm:w-3/5 xl:w-auto grid grid-cols-12 gap-6">
          <DirectChat />
          <ChatBox />
        </div>
      </div>
    </>
  );
}

export default ChatDetail;
