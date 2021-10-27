import React, { Fragment } from "react";
import {
  setActiveConversation,
  setLoading,
} from "app/slice/conversationSclice";

import { Link } from "react-router-dom";
import { setListMessage } from "app/slice/listMessageSlice";
import { useDispatch } from "react-redux";

function SearchUserElement({ conversation }) {
  const dispatch = useDispatch();
  function setConversation() {
    if (!conversation) return;
    dispatch(setActiveConversation(conversation));
    dispatch(setLoading(true));
    dispatch(setListMessage(null));
  }
  return (
    <Fragment>
      <div className="intro-x" onClick={setConversation}>
        <div className="zoom-in">
          <div
            className={
              "chat-list box cursor-pointer relative flex items-center px-4 py-3 mt-2"
            }
          >
            {conversation && (
              <Fragment>
                <div className="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="Topson Messenger Tailwind HTML Admin Template"
                    className="rounded-full"
                    src={conversation.conversation.avatar}
                  />
                  {conversation.online > 0 && (
                    <div className="bg-green-500 border-white w-3 h-3 absolute right-0 bottom-0 rounded-full border-2"></div>
                  )}
                </div>
                <div className="ml-2 overflow-hidden" style={{ width: "60%" }}>
                  <Link to="#" className="font-medium text-black">
                    {conversation.conversation.title}
                  </Link>
                </div>
                <div className="flex flex-col" style={{ height: "40px" }}>
                  <div className="whitespace-nowrap text-opacity-80 text-xs text-black"></div>
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

export default SearchUserElement;
