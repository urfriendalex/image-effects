import {TweenMax, TimelineMax, Power1, Expo, Quint} from 'gsap';

export const MathUtils = {
    lerp: (a, b, n) => (1 - n) * a + n * b,
    distance: (x1,y1,x2,y2) => Math.hypot(x2-x1, y2-y1),
    getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2)
  }

export function translateDown(img, zIndexVal){
    new TimelineMax()
            .set(img, {
                startAt: {
                  opacity: 0,
                  x: 0,
                  y: 0
                },
                opacity: 1,
                rotation: 0,
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
            .to(img, 0.8, {
                ease: Power1.easeOut,
                opacity: 0
            }, 0.6)
            // translate down the image
            .to(img, 1, {
                ease: Quint.easeOut,
                x: `+=${MathUtils.getRandomFloat(-1*(window.innerWidth + img.getBoundingClientRect().width/2), window.innerWidth + img.getBoundingClientRect().width/2)}`,
                y: `+=${MathUtils.getRandomFloat(-1*(window.innerHeight + img.getBoundingClientRect().height/2), window.innerHeight + img.getBoundingClientRect().height/2)}`,
                rotation: MathUtils.getRandomFloat(-40,40)
            }, 0.6);
        }