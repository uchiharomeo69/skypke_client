import "reactjs-popup/dist/index.css";
import "./contact.css";

import * as Icon from "react-feather";

import React, { Fragment } from "react";

import ContactElement from "../contactElement/ContactElement";
import Popup from "reactjs-popup";
import PopupContact from "../popupContact/PopupContact";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

function Contact() {
  const [content, setContent] = useState([]);
  let listConversation = useSelector(
    (state) => state.myConversation.listConversation
  );

  useEffect(() => {
    function display() {
      if (!listConversation) return;
      let sortConversation = [...listConversation].sort((a, b) => {
        let nameA = a.conversation?.title.toUpperCase(); // ignore upper and lowercase
        let nameB = b.conversation?.title.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      let mapConversation = sortConversation?.reduce((preV, cur) => {
        let k = cur.conversation.title[0].toLocaleUpperCase();

        if (preV[k]) preV[k].push(cur);
        else preV = { ...preV, [k]: [cur] };
        return preV;
      }, {});
      if (!mapConversation) return;
      let content1 = [];
      for (const group in mapConversation) {
        content1.push(
          <div className="intro-x w-full mt-1">
            <div className="intro-x text-gray-500 mb-3 mt-3">{group}</div>
            {mapConversation[group].map((conversation) => {
              return <ContactElement conversation={conversation} />;
            })}
          </div>
        );
      }
      setContent(content1);
    }
    display();
  }, [listConversation]);

  return (
    <Fragment>
      <Popup
        trigger={
          <button className="intro-y w-full rounded-full box py-2 mx-auto mt-5 mb-3 px-4 border-transparent">
            <Icon.UserPlus className="text-gray-600 w-5 h-5 absolute my-auto" />
            <div className="text-gray-600 h-5 my-auto">New Contact</div>
          </button>
        }
        contentStyle={{
          width: "30%",
          backgroundColor: "#e8eced",
          height: "70%",
          overflow: "scroll",
          padding: "0px 0px 0px 0px",
        }}
        className="hidescrollbar"
        position="center center"
        modal
        nested
      >
        {(close) => <PopupContact close={close} />}
      </Popup>

      <div className="intro-y text-xl font-medium">My contact</div>
      <div className="intro-y overflow-y-auto scrollbar-hidden -mx-4 px-3">
        {content.map((element) => {
          return <>{element}</>;
        })}
      </div>
    </Fragment>
  );
}

export default Contact;
