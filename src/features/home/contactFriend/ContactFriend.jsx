import "./contactFriend.scss";

import React from "react";
import ReactLoading from "react-loading";

function ContactFriend({ close, loading, listFriend, setChosen }) {
  return (
    <>
      <div className="modal1">
        <div className="head1">
          <button className="close1" onClick={close}>
            &times;
          </button>
          <div className="header1">List Friend</div>
        </div>
        <div className="content1">
          {loading && (
            <div style={{ marginTop: "9rem" }} className="smallLoading">
              <ReactLoading
                type={"spokes"}
                color={"#515452"}
                height={"100%"}
                width={"100%"}
              />
            </div>
          )}
          {listFriend.length > 0 && (
            <ul>
              {listFriend?.map((e) => {
                return (
                  <li key={e._id}>
                    <div className="intro-x">
                      <div
                        className={
                          "chat-list box relative flex items-center px-4 py-3 mt-2"
                        }
                        style={{
                          borderBottom: "1px solid gray",
                        }}
                      >
                        <div className="w-12 h-12 flex-none image-fit mr-1">
                          <img
                            alt="Topson Messenger Tailwind HTML Admin Template"
                            className="rounded-full"
                            src={e.avatar !== "" ? e.avatar : null}
                          />
                        </div>
                        <div
                          className="ml-2 overflow-hidden"
                          style={{ width: "80%" }}
                        >
                          <div className="font-medium text-black">{e.name}</div>
                          <div className="text-opacity-80 w-4/5 truncate mt-0.5">
                            {e.email}
                          </div>
                        </div>
                        <div
                          className="flex flex-col"
                          style={{ height: "40px" }}
                        >
                          <div className="whitespace-nowrap text-opacity-80 text-xs text-black"></div>
                        </div>
                        <div className="cursor-pointer">
                          <div className="round">
                            <input
                              type="checkbox"
                              defaultChecked={e.check}
                              id={`checkbox${e._id}`}
                              onChange={() => {
                                setChosen(e);
                              }}
                            />
                            <label htmlFor={`checkbox${e._id}`}></label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="submit1">
          <button onClick={close} className="btn btn-primary mt-3 submit2">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default ContactFriend;
