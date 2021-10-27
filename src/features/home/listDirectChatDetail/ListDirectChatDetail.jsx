import React, { Fragment } from "react";

import DirectChatDetailElement from "../directChatDetailElement/DirectChatDetailElement";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";

function ListDirectChatDetail() {
  const listConversation = useSelector(
    (state) => state.myConversation.listConversation
  );
  const activeConversation = useSelector(
    (state) => state.myConversation.activeConversation
  );
  return (
    <Fragment>
      <div className="intro-y text-base font-medium leading-tight mt-3">
        Recent Chats
      </div>
      <div className="intro-y overflow-y-auto scrollbar-hidden pt-2 mt-3 -mx-5 px-6">
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
            <ReactLoading
              type={"cylon"}
              color={"#515452"}
              height={"100%"}
              width={"100%"}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default ListDirectChatDetail;
