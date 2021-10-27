import * as Icon from "react-feather";

import React, { Fragment } from "react";

import { Link } from "react-router-dom";
import { setContact } from "app/slice/componentSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function SideMenu() {
  const dispatch = useDispatch();
  const showContact = useSelector((state) => state.component.showContact);
  return (
    <Fragment>
      <div className="side-menu hidden md:block top-0 left-0 fixed w-20 h-screen">
        <div className="side-menu__content box border-theme-3 dark:bg-dark-2 dark:border-dark-2 -intro-x border-r w-full h-full pt-16 flex flex-col justify-center overflow-hidden">
          <Link
            className="-intro-x side-menu__content__link text-gray-600 dark:text-gray-300 relative tooltip py-5"
            style={!showContact ? { backgroundColor: "#5cb3e6" } : null}
            onClick={() => {
              dispatch(setContact(false));
            }}
            to="#"
            data-placement="right"
            title="Chats"
            data-content="chats"
          >
            <Icon.Mail className="w-10 h-5 mx-auto" />
            <h3 className="w-8 h-5 mt-2 mx-auto">Chat</h3>
          </Link>

          <Link
            className="-intro-x side-menu__content__link text-gray-600 dark:text-gray-300 relative tooltip py-5"
            style={showContact ? { backgroundColor: "#5cb3e6" } : null}
            to="#"
            onClick={() => {
              dispatch(setContact(true));
            }}
            data-placement="right"
            title="Contacts"
            data-content="contacts"
          >
            <Icon.UserPlus className="w-5 h-5 mx-auto" />
            <h3 className="w-12 h-5 mt-2 mx-auto">Contact</h3>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default SideMenu;
