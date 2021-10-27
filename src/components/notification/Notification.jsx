import "./notification.css";

import React, { Fragment } from "react";
import { setInital, setShowNotification } from "app/slice/componentSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import NotificationItem from "components/notificationItem/NotificationItem";
import bell from "dist/images/bell.svg";

function Notification(props) {
  const showNotification = useSelector(
    (state) => state.component.showNotification
  );
  const dispatch = useDispatch();
  return (
    <Fragment>
      <div className="notification-dropdown dropdown">
        <Link
          onClick={() => {
            dispatch(setShowNotification());
          }}
          onBlur={() => {
            dispatch(setInital());
          }}
          to="#"
          className="notification-dropdown__toggler text-gray-600 border-theme-7 dark:border-dark-4 dark:text-gray-300 dropdown-toggle h-full flex items-center px-5 relative -mr-3 md:mr-0 md:border-l md:border-r"
        >
          <div className="relative">
            <img src={bell} alt="Bell" />
            <div className="w-2 h-2 bg-theme-1 text-white flex items-center justify-center absolute -mt-0.5 top-0 right-0 rounded-full" />
          </div>
        </Link>
      </div>
      <div
        className={
          showNotification
            ? "notification-dropdown__content dropdown-menu showmenu show"
            : "notification-dropdown__content dropdown-menu"
        }
      >
        <div className="dropdown-menu__content box dark:bg-dark-2 px-4 pt-4 pb-5">
          <div className="text-base font-medium leading-tight mb-4">
            Notifications
          </div>

          <NotificationItem />
        </div>
      </div>
    </Fragment>
  );
}

export default Notification;
