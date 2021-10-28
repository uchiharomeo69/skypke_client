import * as Icon from "react-feather";

import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import profile9 from "dist/images/profile-9.jpg";
import sendToServer from "socket/sendToServer";
import { setCallObject } from "app/slice/callSlice";

function ChatBoxTopBar() {
  const activeConversation = useSelector(
    (state) => state.myConversation.activeConversation
  );
  const dispatch = useDispatch();
  const receiveObject = useSelector((state) => state.call.receiveObject);
  const user = useSelector((state) => state.auth.user);
  function call(video) {
    if (!activeConversation || receiveObject) return;
    sendToServer.call({
      user,
      video,
      channelId: activeConversation.conversation.channelId,
    });
    dispatch(setCallObject(activeConversation));
    window.open(
      `../wating?video=${video}&name=${activeConversation.conversation.title}&channelId=${activeConversation.conversation.channelId}&_id=${user._id}`,
      "_target",
      "width=2000,height=1000"
    );
  }
  return (
    <Fragment>
      {activeConversation && (
        <div className="intro-y box border border-theme-3 dark:bg-dark-2 dark:border-dark-2 flex items-center px-5 py-4">
          <div className="flex items-center mr-auto">
            <div className="w-12 h-12 flex-none image-fit mr-1">
              <img
                className="rounded-full"
                src={
                  activeConversation?.conversation?.avatar === "" ||
                  !activeConversation
                    ? profile9
                    : activeConversation?.conversation?.avatar
                }
              />
              {activeConversation.online > 0 && (
                <div className="bg-green-500 w-3 h-3 absolute right-0 top-0 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="ml-2 overflow-hidden">
              <Link to="#" className="text-base font-medium">
                {activeConversation.conversation?.title}
              </Link>
              {activeConversation.online > 0 && (
                <div className="text-gray-600">Online</div>
              )}
            </div>
          </div>
          <button
            className="text-gray-600 hover:text-theme-1"
            onClick={() => {
              call(true);
            }}
            target="_blank"
          >
            <Icon.Camera
              data-feather="camera"
              className="w-4 h-4 sm:w-6 sm:h-6"
            />
          </button>
          <button
            className="text-gray-600 hover:text-theme-1 ml-2 sm:ml-5"
            onClick={() => {
              call(false);
            }}
            target="_blank"
          >
            <Icon.Mic data-feather="mic" className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </div>
      )}
    </Fragment>
  );
}

export default ChatBoxTopBar;
