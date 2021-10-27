import "./App.css";

import { Route, Switch } from "react-router-dom";

import CallModel from "features/call/callModel/CallModel";
import CallWindow from "features/call/callWindow/CallWindow";
import Home from "features/home/Home";
import Login from "features/auth/login/Login";
import Register from "features/auth/register/Register";
import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    function ping() {
      axios.get("https://sendemailsk.herokuapp.com/").then((res) => {
        console.log(res.data);
      });
      axios.get("https://fakeskype-chat.herokuapp.com/hello").then((res) => {
        console.log(res.data);
      });
    }
    ping();
  }, []);
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/calling" component={CallWindow}></Route>
      <Route path="/wating" component={CallModel}></Route>
      <Route path="" component={Home}></Route>
    </Switch>
  );
}

export default App;
