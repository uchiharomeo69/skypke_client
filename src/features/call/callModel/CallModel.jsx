import "./callModel.scss";

import CallPopup from "../callPopup/CallPopup";
import CallReject from "../callReject/CallReject";
import React from "react";
import { client } from "socket/socket";
import recieveFromServer from "socket/recieveFromServer";
import sendToServer from "socket/sendToServer";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { useState } from "react";

function CallModel() {
  const search = useLocation().search;

  const video = new URLSearchParams(search).get("video");
  const name = new URLSearchParams(search).get("name");
  const _id = new URLSearchParams(search).get("_id");
  const channelId = new URLSearchParams(search).get("channelId");
  const [status, setStatus] = useState("pending");

  const history = useHistory();
  useEffect(() => {
    sendToServer.callpopout({ channelId });
  }, []);

  useEffect(() => {
    async function offcall() {
      await recieveFromServer.serveroffcall();
      setStatus("reject");
    }
    offcall();
    return () => {
      client.off("serveroffcall");
    };
  }, []);

  useEffect(() => {
    async function acceptCall() {
      const { friendId } = await recieveFromServer.friendacceptcall();
      history.push(
        `/calling?_id=${_id}&friendId1=${friendId}&room=${channelId}`
      );
    }
    acceptCall();
    return () => {
      client.off("friendAcceptCall");
    };
  }, []);
  return (
    <div
      className="parent"
      style={{
        backgroundImage: `url(https://picsum.photos/id/765/${window.innerWidth}/${window.innerHeight})`,
      }}
    >
      {status === "pending" && (
        <CallPopup
          type="call"
          name={name}
          video={video}
          channelId={channelId}
        />
      )}
      {status === "reject" && <CallReject />}
    </div>
  );
}

export default CallModel;
