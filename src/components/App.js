import React from "react";
import "./App.css";
import {  BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import EffectPageTempl from "./EffectPage/EffectPage";

function App() {
  return (
    <div className="App">
        <EffectPageTempl />
    </div>
  );
}

export default App;
