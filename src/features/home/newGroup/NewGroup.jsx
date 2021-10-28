import * as Icon from "react-feather";

import React from "react";

function NewGroup() {
  return (
    <>
      <div className="tab-pane">
        <div className="box p-4 mt-3 mb-6">
          <div className="mt-3">
            <label className="form-label">Group Name:</label>
            <input
              type="text"
              className="form-control"
              id="create-group-form-2"
            />
          </div>
          <div className="mt-3">
            <button className="btn">
              <Icon.UserPlus />
            </button>
          </div>
          <button className="btn btn-primary w-full mt-3">Create Group</button>
        </div>
      </div>
    </>
  );
}

export default NewGroup;
