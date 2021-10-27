import "./emoji.css";

import * as Icon from "react-feather";

import React, { useState } from "react";

import Picker from "emoji-picker-react";

function Emoji({ addContent }) {
  const [show, setShow] = useState(false);
  const onEmojiClick = (event, emojiObject) => {
    setShow(false);
    addContent(emojiObject.emoji);
  };

  return (
    <div className="ml-2">
      <Icon.Smile
        onClick={() => {
          setShow(show ? false : true);
        }}
      />
      {show && (
        <div className="emojiList">
          <Picker disableSearchBar onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
}

export default Emoji;
