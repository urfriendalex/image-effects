import React from "react";
import "./App.css";
import {  BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Nav from "./Navigation/Nav";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route path="/about">
          </Route>
          <Route path="/users">
          </Route>
          <Route path="/">
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
