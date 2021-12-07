[![NPM version](https://img.shields.io/npm/v/ux-scroll.svg?style=flat)](https://npmjs.org/package/ux-scroll)
[![NPM downloads](https://img.shields.io/npm/dm/ux-scroll.svg?style=flat)](https://npmjs.org/package/ux-scroll)

# [ux-scroll](http://github.com/uiwwsw/ux-scroll)

## scroll animation library

#### You can make animation like apple

- Optimized scroll animation.
- You can cover from simple transition to complicated animations.
- Support for a fancy style (scheduled)

## How to setup

```command
yarn add ux-scroll
```

or

```common
npm install -s ux-scroll
```

## UxScrollCallback

[index demo](https://github.com/uiwwsw/ux-scroll/blob/master/demo/src/index.ts)

[uiwwsw demo](https://github.com/uiwwsw/ux-scroll/blob/master/demo/src/uiwwsw.ts)

```typescript
import {UxScrollCallback} from 'ux-scroll';
const uxScrollCallback = new UxScrollCallback(options: Props)
interface Props {
  selector: string; // css selector
  commonOption: {
    startTopMargin?: string;
    endTopMargin?: string;
    startBottomMargin?: string;
    endBottomMargin?: string;
    frame?: number; //default: 1000
  },
  options: {
    // 0:{
      // commonOptions
    }
  },
  callbacks?: {
    0: ({
            status,
            index,
            step,
            element
        } : {
            status: string; // 'starting' || 'doing' || 'ending'
            index: number;
            step: number;// 0 ~ 1000(frame)
            element: HTMLElement;
        })=>{
        // do something
    }
  };
}
window.onscroll = () => {
  uxScrollCallback.onScroll();
}
window.onresize = () => {
  uxScrollCallback.onResize();
}
```

## UxScrollTransition

[transition demo](https://github.com/uiwwsw/ux-scroll/blob/master/demo/src/transition.ts)

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
