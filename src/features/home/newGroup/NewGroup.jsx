import * as Icon from "react-feather";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ContactFriend from "../contactFriend/ContactFriend";
import Popup from "reactjs-popup";
import conversationApi from "api/conversation.api";
import { setError } from "app/slice/authSlice";
import { useEffect } from "react";
import userApi from "api/user.api";

function NewGroup() {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [listFriend, setListFriend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error1, setError1] = useState("");
  useEffect(() => {
    async function getListFriend() {
      try {
        setLoading(true);
        const { data } = await userApi.getListFriend(token);
        setLoading(false);
        let data1 = data.map((e) => {
          return {
            ...e,
            check: false,
          };
        });
        setListFriend(data1);
      } catch (error) {
        dispatch(setError(error.response.data));
      }
    }
    getListFriend();
  }, []);

  function setChosen(user) {
    const index = listFriend.findIndex((e) => {
      return e._id === user._id;
    });
    listFriend[index].check = !listFriend[index].check;
    setListFriend(listFriend);
  }

  async function create() {
    const list = listFriend.filter((e) => {
      return e.check === true;
    });
    if (list.length < 2) {
      setError1("Invite at least 2 friend");
      return;
    }
    setError1("");
    conversationApi.createGroup([...list, user], token);
  }
  return (
    <>
      <div className="tab-pane">
        <div className="box p-4 mt-3 mb-6">
          <div className="mt-3">
            <label className="form-label">*Group Name: (optional)</label>
            <input
              type="text"
              className="form-control"
              id="create-group-form-2"
            />
          </div>
          <div className="mt-3">
            <label className="form-label">
              *Invite friend: (at least 2 friend)
            </label>
            <br />
            <Popup
              trigger={
                <button
                  style={{
                    backgroundColor: "rgba(58, 141, 245, var(--tw-bg-opacity))",
                  }}
                  className="btn mt-3"
                >
                  <Icon.UserPlus color="#fff" />
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
              {(close) => (
                <ContactFriend
                  loading={loading}
                  listFriend={listFriend}
                  setChosen={setChosen}
                  close={close}
                />
              )}
            </Popup>
          </div>
          <label className="mt-2" style={{ color: "red" }}>
            {error1}
          </label>
          <button onClick={create} className="btn btn-primary w-full mt-3">
            Create Group
          </button>
        </div>
      </div>
    </>
  );
}

export default NewGroup;
