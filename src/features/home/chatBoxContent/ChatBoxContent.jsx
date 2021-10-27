import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChatText from "../chatText/ChatText";
import ReactLoading from "react-loading";
import { setLoading } from "app/slice/conversationSclice";

function ChatBoxContent() {
  const loading = useSelector((state) => state.myConversation.loading);
  const listMessage = useSelector((state) => state.listMessage);
  const [target, setTarget] = useState(true); // neu dang o cach bottom 200px thi target phan tu duoi cung
  const user = useSelector((state) => state.auth.user);

  const fieldRef = useRef(null);

  //const height = useRef(0); // chieu cao cua full content
  //const allRef = useRef(null);
  // const topnow = useRef(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (fieldRef.current && target) {
      fieldRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
    //console.log(allRef.current.scrollTop);
    // allRef.current.scrollTop =
    //   allRef.current.scrollHeight - window.innerHeight + 70;
    // height.current = allRef.current.scrollHeight;
  }, [listMessage]);

  function handleScroll(e) {
    let element = e.target;
    if (loading === true) return;
    if (element.scrollHeight - element.scrollTop <= 1000) {
      setTarget(true);
    } else {
      setTarget(false);
    }
    if (element.scrollTop === 0) {
      dispatch(setLoading(true));
    }
  }

  return (
    <Fragment>
      <div
        className="overflow-y-scroll scrollbar-hidden pt-5 flex-1"
        onScroll={handleScroll}
        //  ref={allRef}
      >
        {loading && listMessage && (
          <div className="smallLoading">
            <ReactLoading
              type={"spokes"}
              color={"#515452"}
              height={"20%"}
              width={"20%"}
            />
          </div>
        )}
        {!listMessage ? (
          <div className="bigLoading">
            <ReactLoading
              type={"spokes"}
              color={"#515452"}
              height={"100%"}
              width={"100%"}
            />
          </div>
        ) : (
          listMessage.map((e, i) => {
            if (i === listMessage.length - 1) {
              return (
                <ChatText
                  innerRef={fieldRef}
                  key={e._id}
                  right={user._id === e.senderId}
                  message={e}
                />
              );
            }
            return (
              <ChatText
                innerRef={null}
                key={e._id}
                right={user._id === e.senderId}
                message={e}
              />
            );
          })
        )}
      </div>
    </Fragment>
  );
}

export default ChatBoxContent;
