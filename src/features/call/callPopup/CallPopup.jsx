import * as Icon from "react-feather";

import React from "react";
import sendToServer from "socket/sendToServer";
import { setReceiveObject } from "app/slice/callSlice";
import { useDispatch } from "react-redux";

function CallPopup({ _id, type, name, video, channelId }) {
  const dispatch = useDispatch();
  function phoneOff() {
    if (type === "receive") dispatch(setReceiveObject(null));
    sendToServer.calloff({ channelId });
    if (type === "call") {
      window.close();
    }
  }
  function accept() {
    if (type === "call") return;
    dispatch(setReceiveObject(null));
    window.open(
      `./calling?video=${video}&start=true&room=${channelId}&_id=${_id}`,
      "_target",
      "width=2000,height=1000"
    );
  }

  return (
    <>
      <div className="calling">
        <p>
          <span className="caller">{`${name} is calling ...`}</span>
        </p>
        <div className="listIcon">
          <div className="icon">
            <div
              className="icon1"
              onClick={accept}
              style={video === "false" ? { backgroundColor: "grey" } : null}
            >
              <Icon.Video className="element" color="white" />
            </div>
          </div>
          <div className="icon">
            <div className="icon1" onClick={accept}>
              <Icon.PhoneCall className="element" color="white" />
            </div>
          </div>
          <div className="icon">
            <div
              className="icon1"
              onClick={phoneOff}
              style={{ backgroundColor: "red" }}
            >
              <Icon.PhoneOff className="element" color="white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CallPopup;
