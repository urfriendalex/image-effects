import React, { useState, useEffect } from "react";
import './Nav.css'

function Nav(props) {
    const [pos, setPos] = useState(0);

    useEffect(() =>{
      setPos(document.querySelector('.nav-link').getBoundingClientRect().left);
    }, []);

    let moveLine= (e) => {
        props.handleEffectChange(e.target.innerText);
        setPos(e.target.getBoundingClientRect().left);
    }
 return (
    <nav className="navbar navbar-bottom navbar-expand-sm navbar-dark bg-transparent">
      <ul className="navbar-links navbar-nav">
        <li className="nav-item">
            <button className="nav-link" onClick={moveLine}>
              1
            </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={moveLine}>
            2
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={moveLine}>
            3
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={moveLine}>
            4
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={moveLine}>
            5
          </button>
        </li>
      </ul>
      <span className="cross-line" style={{
          left: pos
      }}></span>
    </nav>
  );
}

export default Nav;
