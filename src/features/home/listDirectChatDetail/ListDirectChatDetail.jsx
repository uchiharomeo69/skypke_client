import * as Spinner from "react-spinners";

import React, { Fragment, useState } from "react";

import DirectChatDetailElement from "../directChatDetailElement/DirectChatDetailElement";
import { Link } from "react-router-dom";
import NewGroup from "../newGroup/NewGroup";
import { useSelector } from "react-redux";

function ListDirectChatDetail() {
  const listConversation = useSelector(
    (state) => state.myConversation.listConversation
  );
  const activeConversation = useSelector(
    (state) => state.myConversation.activeConversation
  );
  const [rschat, setRsChat] = useState(true);
  return (
    <Fragment>
      <div className="intro-y  leading-tight mt-4 box p-2">
        <div className="boxed-tabs  justify-center flex">
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              setRsChat(!rschat);
            }}
            className={
              rschat
                ? "hover:bg-gray-100 dark:hover:bg-dark-2 flex-1 py-2 rounded-md text-center active"
                : "hover:bg-gray-100 dark:hover:bg-dark-2 flex-1 py-2 rounded-md text-center"
            }
          >
            Recent Chats
          </Link>
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              setRsChat(!rschat);
            }}
            className={
              !rschat
                ? "hover:bg-gray-100 dark:hover:bg-dark-2 flex-1 py-2 rounded-md text-center active"
                : "hover:bg-gray-100 dark:hover:bg-dark-2 flex-1 py-2 rounded-md text-center"
            }
          >
            New Group
          </Link>
        </div>
      </div>

      <div className="intro-y overflow-y-auto scrollbar-hidden pt-2 mt-3 -mx-5 px-6">
        {rschat ? (
          <>
            {listConversation && activeConversation ? (
              listConversation.map((e) => {
                return (
                  <DirectChatDetailElement
                    key={e._id}
                    conversation={e}
                    active={e._id === activeConversation._id ? true : false}
                  />
                );
              })
            ) : (
              <div className="smallLoading">
                <Spinner.BeatLoader size={15} color="#5ECFBF" />
              </div>
            )}
          </>
        ) : (
          <NewGroup />
        )}
      </div>
    </Fragment>
  );
}

export default ListDirectChatDetail;
