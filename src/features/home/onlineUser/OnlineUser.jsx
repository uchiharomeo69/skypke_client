import React, { Fragment } from "react";

import { Link } from "react-router-dom";
import profile1 from "dist/images/profile-1.jpg";
import profile2 from "dist/images/profile-2.jpg";

function OnlineUser() {
  return (
    <Fragment>
      <div className="intro-y flex-none overflow-x-auto overflow-y-hidden scrollbar-hidden">
        <div className="flex mt-6">
          <Link
            to="#"
            className="w-12 mr-3 cursor-pointer"
            title="John Travolta"
          >
            <div className="w-12 h-12 flex-none image-fit rounded-full">
              <img
                alt="Topson Messenger Tailwind HTML Admin Template"
                className="rounded-full"
                src={profile1}
              />
              <div className="bg-green-500 border-white w-3 h-3 absolute right-0 bottom-0 rounded-full border-2"></div>
            </div>
            <div className="text-gray-600 dark:text-gray-500 truncate text-center mt-2">
              John Travolta
            </div>
          </Link>
          <Link to="#" className="w-12 mr-3 cursor-pointer" title="Brad Pitt">
            <div className="w-12 h-12 flex-none image-fit rounded-full">
              <img
                alt="Topson Messenger Tailwind HTML Admin Template"
                className="rounded-full"
                src={profile2}
              />
              <div className="bg-green-500 border-white w-3 h-3 absolute right-0 bottom-0 rounded-full border-2"></div>
            </div>
            <div className="text-gray-600 dark:text-gray-500 truncate text-center mt-2">
              Brad Pitt
            </div>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default OnlineUser;
