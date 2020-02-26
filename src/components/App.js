import React from "react";
import "./App.css";
import {  BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Nav from "./Navigation/Nav";
import EffectPageTempl from "./EffectPage/EffectPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
        <Redirect exact from="/" to="/1" />
          <Route path="/1">
            <EffectPageTempl />>
          </Route>
          <Route path="/2">
          </Route>
          <Route path="/3">
          </Route>
          <Route path="/4">
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
