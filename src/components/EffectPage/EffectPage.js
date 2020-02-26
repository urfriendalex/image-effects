import React, { Component } from "react";
import './EffectPage.css'
class EffectPageTempl extends Component {

    constructor(props){
        super(props);
        this.state = {
          search_input: "forest",
          current_effect: ""
      }
    }


  render() {
    return (
      <div>
        <div className="controls">
          <div className="form-group">
            <select defaultValue="1" className="custom-select" name="" id="">
              <option value="1">Select one</option>
              <option value=""></option>
              <option value=""></option>
              <option value=""></option>
            </select>
          </div>
            <div className="form-group search-img">
              <label htmlFor="search-img">Search</label>
              <input type="text" className="form-control" name="search-img" id="search-img" aria-describedby="helpId" placeholder="Some txt" />
            </div>
          </div>
        <div className="content">
          {/* <img class="content__img" src="img/1.jpg" alt="Some image" /> */}
          <h3 className="content-title scroll1" title={this.state.search_input}>{this.state.search_input}</h3>
          <h3 className="content-title scroll2" title={this.state.search_input}>{this.state.search_input}</h3>
        </div>
      </div>
    );
  }
}

export default EffectPageTempl;
