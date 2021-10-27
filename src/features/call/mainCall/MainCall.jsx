import CallModel from "../callModel/CallModel";
import CallWindow from "../callWindow/CallWindow";
import { useState } from "react";

function MainCall() {
  const [calling, setCalling] = useState(false);
  return <>{calling ? <CallModel /> : <CallWindow />}</>;
}

export default MainCall;
