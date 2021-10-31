import * as Icon from "react-feather";

import React, { Fragment, useEffect, useRef, useState } from "react";

import Contact from "../Contact/Contact";
import ListDirectChatDetail from "../listDirectChatDetail/ListDirectChatDetail";
import SearchUser from "../searchUser/SearchUser";
import { useSelector } from "react-redux";

function DirectChat() {
  const typingRef = useRef(null);
  const [searching, setSearching] = useState(false);
  const showContact = useSelector((state) => state.component.showContact);
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchUser, setSearchUser] = useState(null);
  let listConversation = useSelector(
    (state) => state.myConversation.listConversation
  );
  function typing(value) {
    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }
    typingRef.current = setTimeout(() => {
      setSearchValue(value);
    }, 300);
  }
  useEffect(() => {
    if (!listConversation) return;
    const searchUser1 = listConversation.filter((e) => {
      const title = e.conversation.title;

      return title.toUpperCase().includes(searchValue.toUpperCase());
    });
    setSearchUser(searchUser1);
  }, [searchValue, listConversation]);

  return (
    <Fragment>
      <div
        className={
          "side-content col-span-3 xl:col-span-3 col-start-1 col-end-3 -mt-16 xl:mt-0 pt-20 xl:-mr-6 px-6 xl:pt-6 flex-col overflow-hidden side-content--active"
        }
        style={{ paddingLeft: "40px" }}
      >
        <div className="intro-y text-xl font-medium">Chats</div>
        <>
          <div className="intro-y relative mt-5">
            <input
              autoComplete="off"
              onChange={(e) => {
                const value = e.target.value;
                typing(value);
                setValue(value);
              }}
              value={value}
              onFocus={() => {
                setSearching(true);
              }}
              style={
                searching
                  ? {
                      background:
                        "repeating-linear-gradient(#b8d2e3, #b8d2e3 49.9%, #d8e0e3 50.1%, #d8e0e3 100%)",
                      color: "#FFF",
                    }
                  : null
              }
              type="text"
              className="form-control box py-3 px-4 border-transparent pr-8"
              placeholder="People or directory..."
            />

            {searching ? (
              <Icon.Delete
                color="red"
                onClick={() => {
                  setValue("");
                  setSearching(false);
                }}
                data-feather="search"
                className="text-gray-600 w-5 h-5 absolute inset-y-0 right-0 my-auto mr-3"
              />
            ) : (
              <Icon.Search
                data-feather="search"
                className="text-gray-600 w-5 h-5 absolute inset-y-0 right-0 my-auto mr-3"
              />
            )}
          </div>
        </>

        {!searching ? (
          showContact ? (
            <Contact />
          ) : (
            <>
              <ListDirectChatDetail />
            </>
          )
        ) : (
          <SearchUser searchUser={searchUser} value={searchValue} />
        )}
      </div>
    </Fragment>
  );
}

export default DirectChat;
