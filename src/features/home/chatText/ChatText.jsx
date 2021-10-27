import "./chatText.css";

import React, { Fragment } from "react";

import Left from "./Left";
import PropTypes from "prop-types";
import Right from "./Right";
import moment from "moment";
import profile9 from "dist/images/profile-9.jpg";

ChatText.propTypes = {
  right: PropTypes.bool,
  message: PropTypes.object,
};

ChatText.defaultProps = {
  right: false,
  message: null,
};

function ChatText({ right, message, innerRef }) {
  function getSendAt() {
    if (Date.now() - message.sendAt <= 3600 * 1000) {
      return moment(message.sendAt).local().fromNow();
    }
    if (Date.now() - message.sendAt <= 3600 * 24 * 1000) {
      return moment(message.sendAt).local().format("h : mm a");
    }
    return moment(message.sendAt).local().format("ddd h : mm a");
  }

  return (
    <Fragment>
      {message && (
        <div
          className={
            right
              ? "-intro-x chat-text-box flex items-end float-right mb-4"
              : "-intro-x chat-text-box flex items-end float-left mb-4"
          }
        >
          <div className="chat-text-box__photo w-10 h-10 hidden sm:block flex-none image-fit relative mr-4">
            {!right && (
              <img
                alt="Topson Messenger Tailwind HTML Admin Template"
                className="rounded-full"
                src={profile9}
              />
            )}
          </div>
          <div className="w-full" ref={innerRef}>
            <div>
              <div
                className={
                  right
                    ? "chat-text-box__content flex items-center float-right"
                    : "chat-text-box__content flex items-center float-left"
                }
              >
                {right ? (
                  <Right message={message} />
                ) : (
                  <Left message={message} />
                )}
              </div>
              <div className="clear-both"></div>
            </div>
            <div className="clear-both mb-2"></div>
            <div
              className={
                right
                  ? "text-gray-600 text-xs text-right mr-2"
                  : "text-gray-600 text-xs ml-2"
              }
            >
              {getSendAt()}
            </div>
          </div>
        </div>
      )}
      <div className="clear-both"></div>
    </Fragment>
  );
}

export default ChatText;
