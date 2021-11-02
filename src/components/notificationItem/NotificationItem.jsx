import React, { Fragment } from "react";

import { Link } from "react-router-dom";
import profile13 from "dist/images/profile-13.jpg";

function NotificationItem() {
  return (
    <Fragment>
      <div className="cursor-pointer relative flex items-center mt-6">
        <div className="w-10 h-10 flex-none image-fit mr-1">
          <img
            alt="Topson Messenger Tailwind HTML Admin Template"
            className="rounded-full"
            src={profile13}
          />
          <div className="w-3 h-3 absolute right-0 bottom-0 bg-theme-1 border-white rounded-full border-2" />
        </div>
        <div className="ml-2 overflow-hidden">
          <div className="flex items-center">
            <Link to="#" className="font-medium truncate mr-5">
              Tom Hanks
            </Link>
            <div className="text-opacity-50 text-gray-800 text-xs ml-auto whitespace-nowrap -mt-0.5">
              05:09 AM
            </div>
          </div>
          <div className="text-opacity-70 text-gray-800 dark:text-gray-500 w-full truncate mt-0.5">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomi
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NotificationItem;
