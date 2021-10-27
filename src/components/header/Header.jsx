import Account from "components/account/Account";
import { Link } from "react-router-dom";
import Notification from "components/notification/Notification";
import React from "react";
import logo from "dist/images/logo.svg";

function Header({ user }) {
  return (
    <div className="top-bar top-0 left-0 fixed w-full h-16">
      <div className="-intro-y top-bar__content bg-white border-theme-3 dark:bg-dark-2 dark:border-dark-2 border-b w-full h-full flex px-5">
        <Link to="#" className="hidden md:flex items-center h-full mr-auto">
          <img
            alt="Topson Messenger Tailwind HTML Admin Template"
            className="h-8"
            src={logo}
          />
          <div className="text-base font-light ml-4">
            <span className="font-medium">Topson</span> Messenger
          </div>
        </Link>
        <Link
          className="mobile-menu-toggler flex md:hidden items-center h-full mr-auto px-5 -ml-5"
          to="#"
        >
          <i
            data-feather="bar-chart-2"
            className="w-5 h-5 transform rotate-90"
          />
        </Link>
        <Notification />
        <Account user={user} />
      </div>
    </div>
  );
}

export default Header;
