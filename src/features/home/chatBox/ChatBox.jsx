import React, { Fragment } from "react";

import ChatBoxContent from "../chatBoxContent/ChatBoxContent";
import ChatBoxInput from "../chatBoxInput/ChatBoxInput";
import ChatBoxTopBar from "../chatBoxTopBar/ChatBoxTopBar";

function ChatBox({ client }) {
  return (
    <Fragment>
      <div className="chat-box border-theme-5 col-span-8 flex flex-col overflow-hidden xl:border-l xl:border-r p-6">
        <ChatBoxTopBar />
        <ChatBoxContent />
        <ChatBoxInput client={client} />
      </div>
    </Fragment>
  );
}

export default ChatBox;
