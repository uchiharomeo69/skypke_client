import "./account.css";

import * as Icon from "react-feather";

import React, { Fragment } from "react";
import { setInital, setShowAccount } from "app/slice/componentSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import profile14 from "dist/images/profile-14.jpg";

function Account({ user }) {
  const showAccount = useSelector((state) => state.component.showAccount);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <div className="account-dropdown dropdown relative">
        <Link
          onClick={() => {
            dispatch(setShowAccount());
          }}
          onBlur={() => {
            dispatch(setInital());
          }}
          to="#"
          className="h-full dropdown-toggle flex items-center pl-5"
        >
          <div className="w-8 h-8 image-fit">
            <img
              alt="Topson Messenger Tailwind HTML Admin Template"
              className="rounded-full shadow-md"
              src={user?.avatar}
            />
          </div>
          <div className="hidden md:block ml-3">
            <div className="w-28 truncate font-medium leading-tight">
              {user?.name}
            </div>
            <div className="account-dropdown__info text-xs text-gray-600">
              {user?.email}
            </div>
          </div>
        </Link>
        <div
          className={
            showAccount
              ? "dropdown-content dropdown-menu.show absolute w-56 top-0 right-0 z-20 open1"
              : "dropdown-content dropdown-menu absolute w-56 top-0 right-0 z-20"
          }
          id="_uek7nk8bn"
          data-popper-placement="bottom-end"
        >
          <div className="dropdown-menu__content box dark:bg-dark-2">
            <div className="p-2">
              <Link
                to="#"
                className="flex items-center block p-2 transition duration-300 ease-in-out rounded-md hover:bg-gray-200 dark:hover:bg-dark-3"
              >
                <Icon.User className="w-4 h-4 mr-2" /> Profile
              </Link>
            </div>
            <div className="border-gray-200 dark:border-dark-4 p-2 border-t">
              <Link
                to="#"
                className="flex items-center block p-2 transition duration-300 ease-in-out rounded-md hover:bg-gray-200 dark:hover:bg-dark-3"
              >
                <Icon.ToggleRight className="w-4 h-4 mr-2" />
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Account;
