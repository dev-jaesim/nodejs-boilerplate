import React from "react";
import { Route, Switch } from "react-router-dom";
import About from "./About";
import RegisterLogin from "./RegisterLogin";
import Register from "./RegisterLogin/Register";

function App() {
  return (
    <>
      <Switch>
        {/* <Router exact path="/" component={Home} /> */}
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={RegisterLogin} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </>
  );
}

export default App;
