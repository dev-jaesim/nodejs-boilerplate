import React from "react";
import { Route, Switch } from "react-router-dom";
import About from "./About";
import RegisterLogin from "./RegisterLogin";
// import Home from "./home/Home";

function App() {
  return (
    <>
      <Switch>
        {/* <Router exact path="/" component={Home} /> */}
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={RegisterLogin} />
      </Switch>
    </>
  );
}

export default App;
