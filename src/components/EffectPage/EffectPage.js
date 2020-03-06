import React, { Component, createRef } from "react";
import './EffectPage.css';
import axios from 'axios';
import { AuthInfo } from '../../AuthInfo';
import { TweenMax, TimelineMax, Power1, Expo, Quint, Quad } from 'gsap';
import Nav from "../Navigation/Nav";


const UNSPLASH_API_BASE_URL = 'https://api.unsplash.com/';
const ACCESS_KEY = AuthInfo.ACCESS_KEY;
const MathUtils = {
  lerp: (a, b, n) => (1 - n) * a + n * b,
  distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1),
  getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2)
}

let index = 0;
let zIndexVal = 1;

class EffectPageTempl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_input: "New York",
      current_effect_key: 1,
      images: [],
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
      cachedX: 0,
      cachedY: 0,
      threshold: 80
    }
    this.handleChange = this.handleChange.bind(this);
    this.fetchImagesByTitle = this.fetchImagesByTitle.bind(this);
    this.updateImages = this.updateImages.bind(this);
    this.getMousePos = this.getMousePos.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.showImage = this.showImage.bind(this);
    this.handleEffectChange = this.handleEffectChange.bind(this);

    this.translateAndScale = this.translateAndScale.bind(this);
    this.translateDown = this.translateDown.bind(this);
    this.scaleUp = this.scaleUp.bind(this);
    this.scaleDown = this.scaleDown.bind(this);
    this.translateRandom = this.translateRandom.bind(this);

    this.effectMap = new Map([
      [1, this.translateDown],
      [2, this.translateRandom],
      [3, this.scaleDown],
      [4, this.scaleUp],
      [5, this.translateAndScale]
    ]);
  }

  updateImages() {
    this.fetchImagesByTitle().then(imgs => {
      console.log(imgs);
      this.setState({
        images: imgs.data.results
      })
    });
  }

  handleEffectChange(number){
    this.setState({
      current_effect_key: number
    })
  }

  images_nodes = createRef();

  fetchImagesByTitle() {
    return axios.get(`${UNSPLASH_API_BASE_URL}/search/photos/?client_id=${ACCESS_KEY}&query=${this.state.search_input}&page=1&per_page=20`)
  }

  handleChange = (e) => {
    this.setState({ search_input: e.target.value });
  }

  handleMove(e) {
    this.getMousePos(e);
    if (this.state.images.length !== 0) {
      let imges_length = this.images_nodes.current.childNodes.length;
      let distance = MathUtils.distance(this.state.x, this.state.y, this.state.lastX, this.state.lastY)
      if (distance > this.state.threshold) {
        this.showImage(index);
        index = (index + 1) % imges_length;
        zIndexVal = (zIndexVal + 1) % imges_length;

        this.setState(prevState => ({
          lastX: prevState.x,
          lastY: prevState.y
        }))
      }
    }
  }
  getMousePos = (ev) => {
    let posx = 0;
    let posy = 0;
    if (ev.pageX || ev.pageY) {
      posx = ev.pageX;
      posy = ev.pageY;
    }
    else if (ev.clientX || ev.clientY) {
      posx = ev.clientX + document.body.scrollLeft + document.scrollLeft;
      posy = ev.clientY + document.body.scrollTop + document.scrollTop;
    }
    this.setState({ x: posx, y: posy },
      this.setState(prevState => ({
        cachedX: MathUtils.lerp(prevState.cachedX || this.state.x, this.state.x, 0.1),
        cachedY: MathUtils.lerp(prevState.cachedX || this.state.y, this.state.y, 0.1)
      })
      ))
  }

  showImage(index) {
    const img = this.images_nodes.current.childNodes[index];
    // console.log(this.images_nodes);
    // console.log(this.images_nodes.current.childNodes);
    // console.log(this.images_nodes.current.childNodes[index]);
    img.style.setProperty('--img-maxwidth', `${MathUtils.getRandomFloat(250, 400)}px`);

    TweenMax.killTweensOf(img);

    console.log(this.state.current_effect_key);
    this.effectMap.get(Number(this.state.current_effect_key))(img);
  }

  translateRandom(img) {
    new TimelineMax()
      .set(img, {
        startAt: {
          opacity: 0,
          x: 0,
          y: 0,
          rotation: 0
        },
        opacity: 1,
        rotation: 0,
        zIndex: zIndexVal,
        x: this.state.cachedX - img.getBoundingClientRect().width / 2,
        y: this.state.cachedY - img.getBoundingClientRect().height / 2
      }, 0)
      // animate position
      .to(img, 1.6, {
        ease: Expo.easeOut,
        x: this.state.x - img.getBoundingClientRect().width / 2,
        y: this.state.y - img.getBoundingClientRect().height / 2
      }, 0)
      // then make it disappear
      .to(img, 0.8, {
        ease: Power1.easeOut,
        opacity: 0
      }, 0.6)
      // translate random the image
      .to(img, 1, {
        ease: Quint.easeOut,
        x: `+=${MathUtils.getRandomFloat(-1 * (window.innerWidth + img.getBoundingClientRect().width / 2), window.innerWidth + img.getBoundingClientRect().width / 2)}`,
        y: `+=${MathUtils.getRandomFloat(-1 * (window.innerHeight + img.getBoundingClientRect().height / 2), window.innerHeight + img.getBoundingClientRect().height / 2)}`,
        rotation: MathUtils.getRandomFloat(-40, 40)
      }, 0.6);
  }

  scaleDown(img){
    new TimelineMax()
            // show the image
            .set(img, {
              startAt: {
                opacity: 0,
                x: 0,
                y: 0,
                scale: 1,
                rotation: 0
              },
                opacity: 1,
                scale: 1,
                zIndex: zIndexVal,
                x: this.state.cachedX - img.getBoundingClientRect().width/2,
                y: this.state.cachedY - img.getBoundingClientRect().height/2
            }, 0)
            // animate position
            .to(img, 0.9, {
                ease: Expo.easeOut,
                x: this.state.x - img.getBoundingClientRect().width/2,
                y: this.state.y - img.getBoundingClientRect().height/2
            }, 0)
            // then make it disappear
            .to(img, 1, {
                ease: Power1.easeOut,
                opacity: 0
            }, 0.4)
            // scale down the image
            .to(img, 1, {
                ease: Quint.easeOut,
                scale: 0.2
            }, 0.4);
  }

  scaleUp(img){
    new TimelineMax()
    // show the image
    .set(img, {
      startAt: {
        opacity: 0,
        x: 0,
        y: 0,
        rotation: 0
      },
        opacity: 1,
        scale: 1,
        zIndex: zIndexVal,
        x: this.state.cachedX - img.getBoundingClientRect().width/2,
        y: this.state.cachedY - img.getBoundingClientRect().height/2
    }, 0)
    // animate position
    .to(img, 1.8, {
        ease: Expo.easeOut,
        x:this.state.x - img.getBoundingClientRect().width/2,
        y:this.state.y - img.getBoundingClientRect().height/2
    }, 0)
    // then make it disappear
    .to(img, 0.8, {
        ease: Power1.easeOut,
        opacity: 0
    }, 0.8)
    // scale up the image
    .to(img, 0.8, {
        ease: Quint.easeInOut,
        scale: 2
    }, 0.8);
  }

  translateDown(img){
    new TimelineMax()
    // show the image
    .set(img, {
      startAt: {
        opacity: 0,
        x: 0,
        y: 0,
        rotation: 0
      },
        opacity: 1,
        zIndex: zIndexVal,
        x: this.state.cachedX - img.getBoundingClientRect().width/2,
        y: this.state.cachedY - img.getBoundingClientRect().height/2
    }, 0)
    // animate position
    .to(img, 1.6, {
        ease: Expo.easeOut,
        x: this.state.x - img.getBoundingClientRect().width/2,
        y: this.state.y - img.getBoundingClientRect().height/2
    }, 0)
    // then make it disappear
    .to(img, 1, {
        ease: Power1.easeOut,
        opacity: 0
    }, 0.4)
    // translate down the image
    .to(img, 1, {
        ease: Quint.easeInOut,
        y: `+=${window.innerHeight + img.getBoundingClientRect().height/2}`
    }, 0.4);
  }

  translateAndScale(img){
    new TimelineMax()
            .set(img, {
              startAt: {
                opacity: 0,
                x: 0,
                y: 0,
                rotation: 0
              },
                opacity: 1,
                scaleX: 1,
                scaleY: 1,
                zIndex: zIndexVal,
                x: this.state.x - img.getBoundingClientRect().width/2,
                y: this.state.y - img.getBoundingClientRect().height/2,
                transformOrigin: '50% -10%'
            }, 0)
            // then make it disappear
            .to(img, 0.5, {
                ease: Power1.easeOut,
                opacity: 0
            }, 0.4)
            // translate down the image
            .to(img, 0.2, {
                ease: Quad.easeIn,
                scaleX: 0.5,
                scaleY: 2
            }, 0.4)
            // translate down the image
            .to(img, 0.5, {
                ease: Expo.easeOut,
                scaleX: 0.7,
                scaleY: 1.7,
                y: `+=${MathUtils.getRandomFloat(window.innerHeight/2,window.innerHeight)}`
            }, 0.6);
        }

  render() {
    return (
      <div className='effect-page-container'>
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
            <input type="text" className="form-control" name="search-img" id="search-img " value={this.state.search_input} onChange={this.handleChange} placeholder="Some txt" />
          </div>
          <button type="button" className="btn btn-primary" onClick={this.updateImages}>click</button>
        </div>
        <div className="content">
          <div className="content-imgs" ref={this.images_nodes} onMouseMove={this.handleMove}>{
            this.state.images.map(img =>
              <img key={img.id} className="content-img" src={img.urls.regular} alt={img.description} />
            )
          }
          </div>
          <h3 className="content-title scroll1" title={this.state.search_input}>{this.state.search_input}</h3>
          <h3 className="content-title scroll2" title={this.state.search_input}>{this.state.search_input}</h3>
        </div>
        <p>Mouse coordinates: {this.state.x} {this.state.y}</p>
        <Nav current_effect={this.current_effect} handleEffectChange={this.handleEffectChange}/>
      </div>
    );
  }
}

export default EffectPageTempl;
