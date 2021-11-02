import React, { Fragment, useEffect, useState } from "react";
import {
  setActiveConversation,
  setLoading,
} from "app/slice/conversationSclice";

import PropTypes from "prop-types";
import moment from "moment";
import profile9 from "dist/images/profile-9.jpg";
import { setListMessage } from "app/slice/listMessageSlice";
import { useDispatch } from "react-redux";

DirectChatDetailElement.propTypes = {
  active: PropTypes.bool,
  conversation: PropTypes.object,
};
DirectChatDetailElement.defaultProps = {
  active: false,
  conversation: null,
};

function DirectChatDetailElement({ active, conversation }) {
  const dispatch = useDispatch();
  const [chatting, setChatting] = useState(false);

  function setConversation() {
    if (!conversation) return;
    dispatch(setActiveConversation(conversation));
    dispatch(setLoading(true));
    dispatch(setListMessage(null));
  }

  useEffect(() => {
    if (conversation.listChatting?.length > 0) {
      setChatting(true);
    } else {
      setChatting(false);
    }
  }, [conversation]);

  return (
    <Fragment>
      <div className="intro-x" onClick={setConversation}>
        <div className="zoom-in">
          <div
            className={
              active
                ? "chat-list box cursor-pointer relative flex items-center px-4 py-3 mt-2 bg-theme-1 dark:bg-theme-1"
                : "chat-list box cursor-pointer relative flex items-center px-4 py-3 mt-2"
            }
          >
            {conversation && (
              <Fragment>
                <div className="w-12 h-12 flex-none image-fit mr-1 ">
                  <img
                    alt="Topson Messenger Tailwind HTML Admin Template"
                    className="rounded-full"
                    src={
                      conversation.conversation.avatar !== ""
                        ? conversation.conversation.avatar
                        : profile9
                    }
                  />
                  {conversation.online > 0 && (
                    <div className="bg-green-500 border-white w-3 h-3 absolute right-0 bottom-0 rounded-full border-2"></div>
                  )}
                </div>
                <div className="ml-2 overflow-hidden" style={{ width: "60%" }}>
                  <div
                    className={
                      conversation.lastMessage &&
                      conversation.lastSeen < conversation.lastMessage.sendAt
                        ? "text-black indam"
                        : "font-medium text-black"
                    }
                  >
                    {conversation.conversation.title}
                  </div>
                  <div
                    className={
                      conversation.lastMessage &&
                      conversation.lastSeen < conversation.lastMessage.sendAt
                        ? "text-opacity-80 w-4/5 truncate mt-0.5 indam text-black"
                        : "text-opacity-80 w-4/5 truncate mt-0.5"
                    }
                    style={{ color: active ? "#fff" : "#a6a8ab" }}
                  >
                    {!chatting ? (
                      conversation.lastMessage ? (
                        conversation.lastMessage.nickName +
                        "  :  " +
                        conversation.lastMessage.content
                      ) : (
                        "Say hello!"
                      )
                    ) : (
                      <span className="typing">User is typing ...</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col" style={{ height: "40px" }}>
                  <div className="whitespace-nowrap text-opacity-80 text-xs text-black">
                    {conversation.lastMessage
                      ? moment(conversation.lastMessage.sendAt)
                          .local()
                          .format("h:mm a")
                      : ""}
                  </div>
                </div>
              </Fragment>
            )}

            <div className="bg-theme-1 flex items-center justify-center absolute top-0 right-0 text-xs rounded-full font-medium mr-4"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DirectChatDetailElement;
