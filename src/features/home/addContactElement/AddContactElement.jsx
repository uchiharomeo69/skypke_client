import * as Icon from "react-feather";

import {
  setActiveConversation,
  setLoading,
} from "app/slice/conversationSclice";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import profile9 from "dist/images/profile-9.jpg";
import { setListMessage } from "app/slice/listMessageSlice";

function AddContactElement({ user, close }) {
  const user1 = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  function setConversation() {
    dispatch(
      setActiveConversation({
        nickName: user1.name,
        userId: user1._id,
        userId2: user._id,
        nickName2: user.name,
        conversation: {
          title: user.name,
          type: "direct",
          avatar: user.avatar,
        },
      })
    );
    dispatch(setLoading(true));
    dispatch(setListMessage(null));
    close();
  }
  return (
    <>
      <li value={user.value}>
        <div className="intro-x">
          <div
            className={
              "chat-list box relative flex items-center px-4 py-3 mt-2"
            }
            style={{
              borderBottom: "1px solid gray",
            }}
          >
            <div className="w-12 h-12 flex-none image-fit mr-1">
              <img
                alt="Topson Messenger Tailwind HTML Admin Template"
                className="rounded-full"
                src={user.avatar !== "" ? user.avatar : profile9}
              />
            </div>
            <div className="ml-2 overflow-hidden" style={{ width: "80%" }}>
              <div className="font-medium text-black">{user.name}</div>
              <div className="text-opacity-80 w-4/5 truncate mt-0.5">
                {user.email}
              </div>
            </div>
            <div className="flex flex-col" style={{ height: "40px" }}>
              <div className="whitespace-nowrap text-opacity-80 text-xs text-black"></div>
            </div>
            <div className="cursor-pointer">
              {!user.conversation && (
                <Icon.UserPlus onClick={setConversation} />
              )}
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

export default AddContactElement;
