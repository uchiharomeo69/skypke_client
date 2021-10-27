import AddContactElement from "../addContactElement/AddContactElement";
import React from "react";
import ReactLoading from "react-loading";

function ListAddContact({ loading, searchUser, close }) {
  return (
    <>
      <div className="intro-y text-base font-medium leading-tight mt-3">
        Email
      </div>
      <div className="intro-y overflow-y-auto scrollbar-hidden pt-2 mt-3 -mx-5 px-6">
        {!loading ? (
          <ul>
            {searchUser?.searchByEmail?.map((e) => {
              return <AddContactElement close={close} key={e._id} user={e} />;
            })}
          </ul>
        ) : (
          <div className="smallLoading">
            <ReactLoading
              type={"cylon"}
              color={"#515452"}
              height={"100%"}
              width={"100%"}
            />
          </div>
        )}
      </div>
      <div className="intro-y text-base font-medium leading-tight mt-3">
        Name
      </div>
      <div className="intro-y overflow-y-auto scrollbar-hidden pt-2 mt-3 -mx-5 px-6">
        {!loading ? (
          <ul>
            {searchUser?.searchByName?.map((e) => {
              return <AddContactElement close={close} key={e._id} user={e} />;
            })}
          </ul>
        ) : (
          <div className="smallLoading">
            <ReactLoading
              type={"cylon"}
              color={"#515452"}
              height={"100%"}
              width={"100%"}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ListAddContact;
