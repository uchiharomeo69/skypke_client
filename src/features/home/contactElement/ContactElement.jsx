import React, { Fragment } from "react";

import { Link } from "react-router-dom";

function ContactElement({ conversation }) {
  return (
    <Fragment>
      <div className="intro-x block mt-1">
        <div className="box dark:bg-dark-3 cursor-pointer relative flex items-center px-4 py-3 zoom-in ">
          <div className="w-10 h-10 flex-none image-fit mr-1">
            <img
              className="rounded-full"
              src={conversation.conversation.avatar}
            />
            {conversation.online > 0 && (
              <div className="bg-green-500 border-white w-3 h-3 absolute right-0 bottom-0 rounded-full border-2"></div>
            )}
          </div>
          <div className="ml-2 overflow-hidden">
            <Link to="#" className="font-medium">
              {conversation.conversation.title}
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ContactElement;
