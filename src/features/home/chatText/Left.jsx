import * as Icon from "react-feather";

import React, { Fragment, useState } from "react";

import { Link } from "react-router-dom";

function Left({ message, typing }) {
  const [showOption, setShowOption] = useState(false);
  let name = message?.nickName;
  if (!message?.nickName !== "") {
    name = message.user.name;
  }
  return (
    <Fragment>
      <div className="box leading-relaxed dark:text-gray-300 text-gray-700 px-3 py-1 mt-3">
        <span
          className={typing ? "typing" : null}
          style={{ fontWeight: "bold", fontSize: "10px" }}
        >
          {name}{" "}
        </span>
        <br />
        <span className={typing ? "typing" : null}>{message.content}</span>
      </div>
      <div className="hidden sm:block dropdown relative ml-3 mt-3">
        <Link to="#" className="dropdown-toggle w-4 h-4">
          <Icon.MoreVertical
            onClick={() => {
              setShowOption(showOption ? false : true);
            }}
            data-feather="more-vertical"
            className="w-4 h-4"
          />
        </Link>
        <div
          className={
            showOption
              ? "dropdown-menu.show w-40 showoption"
              : "dropdown-menu w-40"
          }
        >
          <div className="dropdown-menu__content box dark:bg-dark-1 p-2">
            <Link
              to="#"
              className="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
            >
              <Icon.CornerLeftDown
                data-feather="corner-up-left"
                className="w-4 h-4 mr-2"
              />
              Reply
            </Link>
            <Link
              to="#"
              className="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
            >
              <Icon.Delete data-feather="trash" className="w-4 h-4 mr-2" />
              Delete
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Left;
