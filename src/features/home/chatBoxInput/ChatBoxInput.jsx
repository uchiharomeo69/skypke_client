import * as Icon from "react-feather";

import React, { Fragment, useState } from "react";
import {
  setActiveConversation,
  setListConversation,
  setLoading,
} from "app/slice/conversationSclice";
import { useDispatch, useSelector } from "react-redux";

import Emoji from "../emoji/Emoji";
import TextareaAutosize from "react-textarea-autosize";
import sendToServer from "socket/sendToServer";
import { setListMessage } from "app/slice/listMessageSlice";
import { setSending } from "app/slice/sendingSlice";
import { useRef } from "react";

function ChatBoxInput() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const activeConversation = useSelector(
    (state) => state.myConversation.activeConversation
  );
  const { token } = useSelector((state) => state.auth);

  function addContent(value) {
    setContent(content + "" + value);
  }
  function sendMessage(e) {
    e.preventDefault();
    if (!activeConversation) return;
    dispatch(setSending(content));
    setContent("");

    sendToServer.sendMessage(
      {
        conversation: activeConversation,
        content,
        token: token,
      },
      (conversation) => {
        if (!conversation) return;
        dispatch(setListConversation([conversation]));
        dispatch(setActiveConversation(conversation));
        dispatch(setLoading(true));
        dispatch(setListMessage(null));
        dispatch(setSending(null));
        sendToServer.connectConversation(conversation);
      }
    );
  }
  return (
    <Fragment>
      <form onSubmit={sendMessage} ref={(ref) => (formRef.current = ref)}>
        <div className="intro-y chat-input box border-theme-3 dark:bg-dark-2 dark:border-dark-2 border flex items-center px-4 py-4">
          <TextareaAutosize
            minRows="1"
            maxRows="5"
            value={content}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage(e);
              }
            }}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="form-control"
            placeholder="Type your message..."
            style={{
              border: "1px solid #e3e1da",
            }}
          />
          <Emoji addContent={addContent} />
          <button
            type="submit"
            className="bg-theme-1 text-white w-8 ml-3 h-8 sm:w-10 sm:h-10 block rounded-full flex-none flex items-center justify-center"
          >
            <Icon.Send data-feather="send" className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default ChatBoxInput;
