import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './Nav.css'

function Nav() {
    const [pos, setPos] = useState(0);

    useEffect(() => setPos(document.querySelector('.nav-link.active').getBoundingClientRect().left), []);

    let moveLine= (e) => {
        setPos(e.target.getBoundingClientRect().left);
    }
 return (
    <nav className="navbar navbar-bottom navbar-expand-sm navbar-dark bg-transparent">
      <ul className="navbar-links navbar-nav">
        <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" onClick={moveLine} exact to="/">
              1
            </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" onClick={moveLine} to="/app">
            2
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" onClick={moveLine}  to="/about">
            3
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" onClick={moveLine} to="/admin">
            4
          </NavLink>
        </li>
      </ul>
      <span className="cross-line" style={{
          left: pos
      }}></span>
    </nav>
  );
}

export default Nav;
