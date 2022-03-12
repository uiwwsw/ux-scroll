[![NPM version](https://img.shields.io/npm/v/ux-scroll.svg?style=flat)](https://npmjs.org/package/ux-scroll)
[![NPM downloads](https://img.shields.io/npm/dm/ux-scroll.svg?style=flat)](https://npmjs.org/package/ux-scroll)

# [ux-scroll](http://github.com/uiwwsw/ux-scroll)

[apple scroll animation demo](https://codepen.io/uiwwsw/full/rNGqGgG)

## scroll animation library

#### You can make animation like apple

- Optimized scroll animation.
- You can cover from simple transition to complicated animations.
- Support for a fancy style (scheduled)

## How to setup

```
yarn add ux-scroll
```

or

```
npm install -s ux-scroll
```

## UxScrollCallback

[callback demo](https://codepen.io/uiwwsw/full/yLzxddR)

[demo3](https://codepen.io/uiwwsw/full/gOGmajd)

```typescript
import {UxScrollCallback, TEasingName} from 'ux-scroll';
const uxScrollCallback = new UxScrollCallback(options: Props)
interface Props {
  selector: string; // css selector
  callbacks: {
    0: ({
            status,
            index,
            step,
            element
        } : {
            status: string; // 'starting' || 'doing' || 'ending'
            index: number;
            step: number;// 0 ~ 999(frame)
            element: HTMLElement;
        })=>{
        // do something
    }
  };
  commonOption?: {
    startTopMargin?: string;
    endTopMargin?: string;
    startBottomMargin?: string;
    endBottomMargin?: string;
    startingFrame?: number; //default: 999
    doingFrame?: number; //default: 999
    endingFrame?: number; //default: 999
    startingEasing?: TEasingName; //default: 'inCubic'
    doingEasing?: TEasingName; //default: 'inCubic'
    endingEasing?: TEasingName; //default: 'inCubic'
  },
  options?: {
    // 0:{
      // commonOptions
    }
  }
}
window.onscroll = () => {
  uxScrollCallback.onScroll();
}
window.onresize = () => {
  uxScrollCallback.onResize();
}
```

## UxScrollTransition

[transition demo](https://codepen.io/uiwwsw/full/OJxoKWQ)

```typescript
import {UxScrollTransition} from 'ux-scroll';
const uxScrollTransition = new UxScrollTransition(options: Props)
interface Props {
  selector: string; // css selector
  throttleTimer?: number;
  commonOptions?: {
    starting?: string; //default: ux__transition--animated
    ending?: string;  //default: ux__transition--animated
    startTopMargin?: string;
    endTopMargin?: string;
    startBottomMargin?: string;
    endBottomMargin?: string;
  };
  options?: {
    //0: {
      //commonOptions
    //}
  };
}
window.onscroll = ()=>{
  uxScrollTransition.onScroll()
};
window.onresize = ()=>{
  uxScrollTransition.onResize()
};
```
