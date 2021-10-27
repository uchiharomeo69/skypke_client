import * as Icon from "react-feather";

import React from "react";

function CallReject() {
  function phoneOff() {
    window.close();
  }

  return (
    <>
      <div className="calling">
        <p>
          <span className="caller">{`No answer...`}</span>
        </p>
        <div className="listIcon">
          <div className="icon">
            <div className="icon1" style={{ backgroundColor: "grey" }}>
              <Icon.Video className="element" color="white" />
            </div>
          </div>
          <div className="icon">
            <div className="icon1" style={{ backgroundColor: "grey" }}>
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

export default CallReject;
