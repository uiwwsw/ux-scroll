# ux-scroll

## 스크롤 에니메이션 라이브러리

#### ux scroll animation like apple

#### 애플처럼 스크롤 에니메이션 적용하기

## 설치방법

```command
yarn add ux-scroll
```

## 스크롤 에니메이션 UxScrollCallback

```typescript
import {UxScrollCallback} from 'ux-scroll';
const uxScrollCallback = new UxScrollCallback(options: Props)
interface Props {
  selector: string; // css selector
  options: {
    0: {
      // default frame
    }
  },
  commonOption: {
    frame: 1000// default frame
  },
  callbacks?: {
    0: ({
            status,
            index,
            step,
            element
        } : {
            status: string; //상태값인데, 엘리먼트의 헤더가 보이는 순간 starting,
            // 헤더가 화면 상단에 닿은 순간부터 하단이 보이기 전까지 doing,
            // 푸터가 보이는 순간부터 푸터가 사라지기까지 ending,
            index: number; // 현재 진행중인 엘리먼트 인덱스
            step: number; // status 각각 0 => 100의 값이 넘어옵니다
            element: HTMLElement // 현재 이벤트가 진행중인 엘리먼트
        })=>{
        // do something
    }
  };
}
window.onscroll = uxScrollCallback.onScroll();
window.onresize = uxScrollCallback.onResize();
```

## 간단한 트렌지션 UxScrollTransition

```typescript
import {UxScrollTransition} from 'ux-scroll';
const uxScrollTransition = new UxScrollTransition(options: Props)
interface Props {
  selector: string; // css selector
  throttleTimer?: number; // 스크롤 및 리사이징 이벤트에 throttle이 필요하다면 숫자입력
  commonOptions?: {
    starting?: string; // 트렌지션 클래스 네임 ux__transition--animated
    ending?: string; // 트렌지션 클래스 네임 ux__transition--animated
    startTopMargin?: string; // starting 이벤트중 top=>down 시 마진
    endTopMargin?: string; // ending 이벤트중 top=>down 시 마진
    startBottomMargin?: string; // starting 이벤트중 down=>top 시 마진
    endBottomMargin?: string; // ending 이벤트중 down=>top 시 마진
  };
  options?: {
    //0: commonOptions 개별 엘리먼트 별 옵션 지정 가능
  };
}
window.onscroll = ()=>{
  uxScrollTransition.onScroll()
};
window.onresize = ()=>{
  uxScrollTransition.onResize()
};
```

## 카운팅 에니메이션

### style에서 여러가지 에니메이션 스타일을 제공할 예정

```typescript
import "node_modules/ux_scroll/dist/style.css";
```

```scss
.ux {
  &__transition {
    &--fade-down {
      transition: transform 0.5s, opacity 0.5s;
      opacity: 0;
      transform: translate(0, -100px);
    }
    &--fade-up {
      transition: transform 0.5s, opacity 0.5s;
      opacity: 0;
      transform: translate(0, 100px);
    }
    &--fade-left {
      transition: transform 0.5s, opacity 0.5s;
      opacity: 0;
      transform: translate(100px, 0);
    }
    &--fade-right {
      transition: transform 0.5s, opacity 0.5s;
      opacity: 0;
      transform: translate(-100px, 0);
    }
    &--animated {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  &__counting {
    display: flex;

    &__number-wrap {
      position: relative;
      flex: 1;
      overflow: hidden;
      height: 2em;
    }
    &__number {
      $deg: 20;
      position: absolute;
      top: 50%;
      left: 50%;
      display: flex;
      align-items: center;
      opacity: 0;
      transition-duration: 150ms;
      @for $i from -1 through 10 {
        &--#{$i} {
          $d: $deg * $i;
          opacity: 1 - (abs($i * 0.3));
          transform: rotateX(#{$d}deg) translate3d(-50%, -50%, 90px);
        }
      }
      @for $i from -1 through 10 {
        [data-value="#{$i + 1}"] & {
          @for $j from -1 through 10 {
            &--#{$j + 1} {
              $o: ($j - $i) * $deg;
              opacity: 1 - (abs(($j - $i) * 0.3));
              transform: rotateX(#{$o}deg) translate3d(-50%, -50%, 90px);
            }
          }
        }
      }
    }
  }
}
```
