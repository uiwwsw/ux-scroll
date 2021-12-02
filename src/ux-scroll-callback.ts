import Scroll, { IndexOption, Props } from "./scroll";
interface PropsExtends extends Props {
  callbacks: IndexOption<Function>;
}
export interface CallbackProps {
  status: string;
  index: number;
  step: number;
  element: HTMLElement;
}
export type Callback = (props: CallbackProps) => true;
export default class UxScrollCallback extends Scroll {
  callbacks: IndexOption<Function>;
  constructor(props: PropsExtends) {
    super({
      ...props,
      commonOptions: {
        starting: "ux__callback--starting",
        doing: "ux__callback--doing",
        ending: "ux__callback--ending",
        ...props.commonOptions,
      },
    });
    this.callbacks = props.callbacks;
  }
  static getStep(level: number) {
    let step = level;
    if (level > 100) step = 100;
    if (level < 0) step = 0;
    return step;
  }
  onNextStarting(index: number): true | void {
    const callback = this.callbacks[index] as Callback;
    const level = Math.ceil(
      ((this.scrollBottomPosition - this.options[index].startPosition) /
        this.windowSize) *
        100
    );
    const step = UxScrollCallback.getStep(level);
    const element = this.elements[index];
    callback &&
      callback({
        status: this.options[index].starting,
        index,
        step,
        element,
      });
    if (level < 0 || level > 100) return true;
  }
  onNextDoing(index: number): true | void {
    const callback = this.callbacks[index] as Callback;
    const level =
      100 -
      Math.ceil(
        ((this.options[index].endPosition - this.scrollBottomPosition) /
          (this.options[index].size - this.windowSize)) *
          100
      );
    const step = UxScrollCallback.getStep(level);
    const element = this.elements[index];
    callback &&
      callback({
        status: this.options[index].doing,
        index,
        step,
        element,
      });
    if (level < 0 || level > 100) return true;
  }
  onNextEnding(index: number): true | void {
    const callback = this.callbacks[index] as Callback;
    const level =
      100 -
      Math.ceil(
        ((this.options[index].endPosition - this.scrollTopPosition) /
          this.windowSize) *
          100
      );
    const step = UxScrollCallback.getStep(level);
    const element = this.elements[index];
    callback &&
      callback({
        status: this.options[index].ending,
        index,
        step,
        element,
      });
    if (level < 0 || level > 100) return true;
  }
  onPrevStarting = this.onNextStarting;
  onPrevDoing = this.onNextDoing;
  onPrevEnding = this.onNextEnding;

  // public onNextStart(index: number): true {
  //   const callback = this.callbacks[index] as Callback;
  //   const step = Math.ceil(
  //     ((this.scrollBottomPosition - this.options[index].startPosition) /
  //       this.windowSize) *
  //       100
  //   );
  //   const element = this.elements[index];
  //     callback &&
  //     callback({
  //       status: this.options[index].start,
  //       index,
  //       step,
  //       element,
  //     });
  // }
  // public onNextStarted(index: number): true {
  //   const callback = this.callbacks[index] as Callback;
  //   const step = Math.ceil(
  //     ((this.scrollTopPosition - this.options[index].startPosition) /
  //       this.windowSize) *
  //       100
  //   );
  //   const element = this.elements[index];
  //     callback &&
  //     callback({
  //       status: this.options[index].started,
  //       index,
  //       step,
  //       element,
  //     });
  // }
  // public onNextEnd(index: number): true {
  //   const callback = this.callbacks[index] as Callback;
  //   const step = Math.ceil(
  //     ((this.scrollBottomPosition - this.options[index].endPosition) /
  //       this.windowSize) *
  //       100
  //   );
  //   const element = this.elements[index];
  //     callback &&
  //     callback({
  //       status: this.options[index].end,
  //       index,
  //       step,
  //       element,
  //     });
  // }
  // public onNextEnded(index: number): true {
  //   const callback = this.callbacks[index] as Callback;
  //   const step = Math.ceil(
  //     ((this.scrollTopPosition - this.options[index].endPosition) /
  //       this.windowSize) *
  //       100
  //   );
  //   const element = this.elements[index];
  //     callback &&
  //     callback({
  //       status: this.options[index].ended,
  //       index,
  //       step,
  //       element,
  //     });
  // }
  // public onPrevStart(index: number): true {
  //   const callback = this.callbacks[index] as Callback;
  //   const step = Math.ceil(
  //     ((this.options[index].startPosition - this.scrollBottomPosition) /
  //       this.windowSize) *
  //       100
  //   );
  //   const element = this.elements[index];
  //     callback &&
  //     callback({
  //       status: this.options[index].start,
  //       index,
  //       step,
  //       element,
  //     });
  // }
  // public onPrevStarted(index: number): true {
  //   const callback = this.callbacks[index] as Callback;
  //   const step = Math.ceil(
  //     ((this.options[index].startPosition - this.scrollTopPosition) /
  //       this.windowSize) *
  //       100
  //   );
  //   const element = this.elements[index];
  //     callback &&
  //     callback({
  //       status: this.options[index].started,
  //       index,
  //       step,
  //       element,
  //     });
  // }
  // public onPrevEnd(index: number): true {
  //   const callback = this.callbacks[index] as Callback;
  //   const step = Math.ceil(
  //     ((this.options[index].endPosition - this.scrollBottomPosition) /
  //       this.windowSize) *
  //       100
  //   );
  //   const element = this.elements[index];
  //     callback &&
  //     callback({
  //       status: this.options[index].end,
  //       index,
  //       step,
  //       element,
  //     });
  // }
  // public onPrevEnded(index: number): true {
  //   const callback = this.callbacks[index] as Callback;
  //   const step = Math.ceil(
  //     ((this.options[index].endPosition - this.scrollTopPosition) /
  //       this.windowSize) *
  //       100
  //   );
  //   const element = this.elements[index];
  //     callback &&
  //     callback({
  //       status: this.options[index].ended,
  //       index,
  //       step,
  //       element,
  //     });
  // }

  // private getLevel(y: number) {
  //   return Math.ceil(((this.startPosition - y) * 100) / this.windowSize);
  // }
  // public onNextStart({ x, y, i }: { x: HTMLElement; y: number; i: number }) {
  //   const fn = this.callbacks[i];
  //   const step = this.getLevel(y);
  //   x.classList.add(this.options[i].start);
  // }
  // public onPrevEnd({ x, y, i }: { x: HTMLElement; y: number; i: number }) {
  //   const fn = this.callbacks[i];
  //   const step = this.getLevel(y);
  //   x.classList.remove(this.options[i].started);
  // }
}
