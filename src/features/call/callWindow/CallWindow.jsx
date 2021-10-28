import "./callwindow.scss";

import * as Icon from "react-feather";

import React, { useRef } from "react";

import MediaDevice from "connection/mediaDevice";
import PeerConnection from "connection/peerConnection";
import { client } from "socket/socket";
import recieveFromServer from "socket/recieveFromServer";
import sendToServer from "socket/sendToServer";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useState } from "react";

function CallWindow() {
  const [constraints, setConstraints] = useState({ video: true, audio: true });
  const myRef = useRef(null);
  const friendRef = useRef(null);
  const search = useLocation().search;

  const room = new URLSearchParams(search).get("room");
  const _id = new URLSearchParams(search).get("_id");
  const start = new URLSearchParams(search).get("start");
  const friendId1Ref = useRef(new URLSearchParams(search).get("friendId1"));
  let peerConnection = null;
  useEffect(() => {
    peerConnection = new PeerConnection(room, _id);
  }, []);

  // may khach vao va phat tin hieu dong y cuoc goi
  useEffect(() => {
    function accept() {
      if (start === "true") {
        sendToServer.acceptcall({ channelId: room, _id });
      }
    }
    accept();
  }, []);

  // may chu vao va goi den may khach luc nay da o trong phong
  useEffect(() => {
    async function firstcall() {
      if (friendId1Ref.current) {
        const stream = await MediaDevice.getStream(constraints);
        myRef.current.srcObject = stream;

        peerConnection?.call(friendId1Ref.current, stream);
      }
    }
    firstcall();
  }, []);

  // join phong phat tin hieu de may khach call
  useEffect(() => {
    async function joincall() {
      await sendToServer.joinCallRoom({ room, _id });
    }
    joincall();
  }, []);

  // co ng join room thi goi
  useEffect(() => {
    async function sharecall() {
      const { friendId } = await recieveFromServer.sharecall();
      if (friendId1Ref.current === friendId) return;
      const stream = await MediaDevice.getStream(constraints);
      myRef.current.srcObject = stream;
      friendId1Ref.current = friendId;
      peerConnection?.call(friendId, stream);
    }
    sharecall();
    return () => {
      client.off("sharecall");
    };
  }, []);

  // lang nghe cuoc goi
  useEffect(() => {
    async function setRemoteStream() {
      friendRef.current.srcObject = null;
      const rmstream = await peerConnection.listenCall();
      friendRef.current.srcObject = rmstream;
    }
    setRemoteStream();
  }, []);

  async function change(video) {
    const newConstraints = video
      ? {
          ...constraints,
          video: !constraints.video,
        }
      : {
          ...constraints,
          audio: !constraints.audio,
        };
    setConstraints(newConstraints);

    const tracks = myRef.current?.srcObject.getTracks();
    tracks.forEach((track) => {
      if (video && track.kind === "video") {
        track.enabled = !constraints.video;
      }
      if (!video && track.kind === "audio") {
        track.enabled = !constraints.audio;
      }
    });
  }

  return (
    <>
      <div className="callwindow">
        <video className="peerVideo" ref={friendRef} autoPlay />
        <video className="localVideo" ref={myRef} autoPlay />

        <div className="video-control">
          <div className="icon">
            <div
              className="icon1"
              onClick={() => {
                change(true);
              }}
            >
              {constraints.video ? (
                <Icon.Camera className="element" color="white" />
              ) : (
                <Icon.CameraOff className="element" color="white" />
              )}
            </div>
          </div>
          <div className="icon">
            <div
              className="icon1"
              onClick={() => {
                change(false);
              }}
            >
              {constraints.audio ? (
                <Icon.Mic className="element" color="white" />
              ) : (
                <Icon.MicOff className="element" color="white" />
              )}
            </div>
          </div>
          <div className="icon">
            <div
              className="icon1"
              onClick={() => {
                window.close();
              }}
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

export default CallWindow;
