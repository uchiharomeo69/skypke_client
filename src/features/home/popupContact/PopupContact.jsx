import "./popup.css";

import React, { useEffect, useRef, useState } from "react";

import ListAddContact from "../listAddContact/ListAddContact";
import searchUserApi from "api/searchUser.api";
import { useSelector } from "react-redux";

function PopupContact({ close }) {
  const typingRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [value, setValue] = useState("");
  const [searchUser, setSearchUser] = useState(null);
  const token = useSelector((state) => state.auth.token);
  function typing(e) {
    setValue(e.target.value);
    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }
    typingRef.current = setTimeout(() => {
      setLoading(true);
      setSearchValue(e.target.value);
    }, 300);
  }
  useEffect(() => {
    async function getSearchUser() {
      try {
        const searchUser1 = await searchUserApi.searchUser({
          value: searchValue,
          token,
        });
        setLoading(false);
        setSearchUser(searchUser1?.data);
      } catch (error) {
        setLoading(false);
        setSearchUser(null);
      }
    }
    getSearchUser();
  }, [searchValue]);

  return (
    <>
      <div className="modal1">
        <div className="head1">
          <button className="close1" onClick={close}>
            &times;
          </button>
          <div className="header1">Add New Contact</div>
          <form
            className="form1"
            role="search"
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
              backgroundColor: "#fff",
              marginBottom: "20px",
            }}
          >
            <input
              className="input1"
              autoComplete="off"
              onChange={typing}
              value={value}
              id="search"
              type="search"
              placeholder="Find people..."
              autoFocus
              required
            />
          </form>
        </div>
        <div className="content1 ">
          <ListAddContact
            loading={loading}
            searchUser={searchUser}
            close={close}
          />
        </div>
      </div>
    </>
  );
}

export default PopupContact;
