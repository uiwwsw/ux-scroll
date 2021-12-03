import Scroll, { IndexOption, Props } from "./scroll";
interface PropsExtends extends Props {
  callbacks: IndexOption<Function>;
  frame?: number;
}
export interface CallbackProps {
  status: string;
  index: number;
  step: number;
  element: HTMLElement;
}
export type Callback = (props: CallbackProps) => true | void;
export default class UxScrollCallback extends Scroll {
  readonly #callbacks: IndexOption<Function>;
  readonly #frame;
  constructor(props: PropsExtends) {
    super({
      ...props,
      commonOptions: {
        starting: "starting",
        doing: "doing",
        ending: "ending",
        ...props.commonOptions,
      },
    });
    this.#frame = props.frame || 1000;
    this.#callbacks = props.callbacks;
  }
  #getStep(level: number) {
    let step = level;
    if (level > this.#frame) step = this.#frame;
    if (level < 0) step = 0;
    return step;
  }
  onStarting(index: number): true | void {
    const callback = this.#callbacks[index] as Callback;
    const position = this.scrollDirection
      ? this.options[index].startTopPosition
      : this.options[index].startBottomPosition;
    const level = Math.ceil(
      ((this.scrollBottomPosition - position) / this.windowSize) * this.#frame
    );
    const step = this.#getStep(level);
    const element = this.elements[index];
    callback &&
      callback({
        status: this.options[index].starting,
        index,
        step,
        element,
      });

    if (level < 0 || level > this.#frame) return true;
  }
  onDoing(index: number): true | void {
    const callback = this.#callbacks[index] as Callback;
    const position = this.scrollDirection
      ? this.options[index].endTopPosition
      : this.options[index].endBottomPosition;
    const level =
      this.#frame -
      Math.ceil(
        ((position - this.scrollBottomPosition) /
          (this.options[index].size - this.windowSize)) *
          this.#frame
      );
    const step = this.#getStep(level);
    const element = this.elements[index];
    callback &&
      callback({
        status: this.options[index].doing,
        index,
        step,
        element,
      });
    if (level < 0 || level > this.#frame) return true;
  }
  onEnding(index: number): true | void {
    const callback = this.#callbacks[index] as Callback;
    const position = this.scrollDirection
      ? this.options[index].endTopPosition
      : this.options[index].endBottomPosition;
    const level =
      this.#frame -
      Math.ceil(
        ((position - this.scrollTopPosition) / this.windowSize) * this.#frame
      );
    const step = this.#getStep(level);
    const element = this.elements[index];
    callback &&
      callback({
        status: this.options[index].ending,
        index,
        step,
        element,
      });
    if (level < 0 || level > this.#frame) return true;
  }
}
