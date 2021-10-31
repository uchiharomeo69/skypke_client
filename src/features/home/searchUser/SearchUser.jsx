import React, { Fragment } from "react";

import SearchUserElement from "../searchUserElement/SearchUserElement";

function SearchUser({ searchUser }) {
  return (
    <Fragment>
      <div
        style={{ fontWeight: "bold" }}
        className="intro-y text-base font-medium leading-tight mt-3"
      >
        Searching ...
      </div>
      <div className="intro-y overflow-y-auto scrollbar-hidden pt-2 mt-3 -mx-5 px-6">
        {searchUser?.map((e) => {
          return <SearchUserElement key={e._id} conversation={e} />;
        })}
      </div>
    </Fragment>
  );
}

export default SearchUser;
