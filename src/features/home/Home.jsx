import "App.css";
import "dist/css/app.css";

import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router";
import { setCallObject, setReceiveObject } from "app/slice/callSlice";
import { useDispatch, useSelector } from "react-redux";

import CallPopup from "features/call/callPopup/CallPopup";
import ChatDetail from "./chatDetail/ChatDetail";
import Header from "components/header/Header";
import SideMenu from "components/sideMenu/SideMenu";
import { client } from "socket/socket";
import { getUser } from "app/thunks/auth.thunk";
import recieveFromServer from "socket/recieveFromServer";
import sendToServer from "socket/sendToServer";
import { useCookies } from "react-cookie";

function Home() {
  const { receiveObject, callObject } = useSelector((state) => state.call);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);
  const [cookies, , removeCookies] = useCookies();
  const dispatch = useDispatch();
  useEffect(() => {
    async function getInfor() {
      try {
        await dispatch(getUser(token));
      } catch (error) {
        removeCookies("token");
        window.open("/login", "_self");
      }
    }
    getInfor();
  }, []);
  useEffect(() => {
    async function connect() {
      if (!user) return;
      await sendToServer.connectServer(user._id);
    }
    connect();
  }, [user]);
  useEffect(() => {
    if (error) {
      removeCookies("token");
      window.open("/login", "_self");
    }
  }, [error]);

  useEffect(() => {
    async function someoneCall() {
      const { user, video, channelId } = await recieveFromServer.someoneCall();
      if (callObject || receiveObject) return;
      dispatch(setReceiveObject({ user, video, channelId }));
    }
    someoneCall();
    return () => {
      client.off("someoneCall");
    };
  }, [receiveObject]);

  useEffect(() => {
    async function offcall() {
      const { channelId } = await recieveFromServer.serveroffcall();
      if (!callObject && !receiveObject) return;
      if (callObject?.conversation.channelId === channelId)
        dispatch(setCallObject(null));
      if (receiveObject?.channelId === channelId)
        dispatch(setReceiveObject(null));
    }
    offcall();
    return () => {
      client.off("serveroffcall");
    };
  }, [receiveObject, callObject]);

  if (!cookies.token) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <div className="main app" style={{ zIndex: 1 }}>
        <Header user={user} />
        <SideMenu />
        <ChatDetail />
      </div>
      {receiveObject && (
        <div className="parent">
          <CallPopup
            type="receive"
            _id={user._id}
            name={receiveObject.user.name}
            video={receiveObject.video}
            channelId={receiveObject.channelId}
          />
        </div>
      )}
    </>
  );
}

export default Home;
