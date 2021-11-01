import * as Spinner from "react-spinners";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChatText from "../chatText/ChatText";
import { setLoading } from "app/slice/conversationSclice";

function ChatBoxContent() {
  const loading = useSelector((state) => state.myConversation.loading);
  const listMessage = useSelector((state) => state.listMessage);
  const [target, setTarget] = useState(true); // neu dang o cach bottom 200px thi target phan tu duoi cung
  const user = useSelector((state) => state.auth.user);
  const sendingText = useSelector((state) => state.sending.sendingText);
  const fieldRef = useRef(null);
  const listConversation = useSelector(
    (state) => state.myConversation.listConversation
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (fieldRef.current && target) {
      fieldRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [listMessage, sendingText]);

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
            <Spinner.ClipLoader color="#59adc2" size={30} />
          </div>
        )}
        {!listMessage ? (
          <div className="bigLoading">
            {/* <ReactLoading
              type={"spokes"}
              color={"#515452"}
              height={"100%"}
              width={"100%"}
              
            /> */}
            <Spinner.BounceLoader color="#59adc2" size={75} />
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
        {sendingText && (
          <ChatText
            innerRef={fieldRef}
            right={true}
            color={"#7da4ba"}
            message={{ content: sendingText }}
          />
        )}
        {listMessage?.length === 0 && listConversation?.length === 0 && (
          <ChatText
            innerRef={fieldRef}
            right={true}
            color={"#d6b1a9"}
            message={{
              content:
                "Admin: Go to contact find your friend then send one message to start conversation",
            }}
          />
        )}
      </div>
    </Fragment>
  );
}

export default ChatBoxContent;
