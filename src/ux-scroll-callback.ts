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
export type Callback = (props: CallbackProps) => true | void;
export default class UxScrollCallback extends Scroll {
  readonly #callbacks: IndexOption<Function>;
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
    this.#callbacks = props.callbacks;
  }
  static getStep(level: number) {
    let step = level;
    if (level > 100) step = 100;
    if (level < 0) step = 0;
    return step;
  }
  onStarting(index: number): true | void {
    const callback = this.#callbacks[index] as Callback;
    const position = this.scrollDirection
      ? this.options[index].startTopPosition
      : this.options[index].startBottomPosition;
    const level = Math.ceil(
      ((this.scrollBottomPosition - position) / this.windowSize) * 100
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
  onDoing(index: number): true | void {
    const callback = this.#callbacks[index] as Callback;
    const position = this.scrollDirection
      ? this.options[index].endTopPosition
      : this.options[index].endBottomPosition;
    const level =
      100 -
      Math.ceil(
        ((position - this.scrollBottomPosition) /
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
  onEnding(index: number): true | void {
    const callback = this.#callbacks[index] as Callback;
    const position = this.scrollDirection
      ? this.options[index].endTopPosition
      : this.options[index].endBottomPosition;
    const level =
      100 -
      Math.ceil(((position - this.scrollTopPosition) / this.windowSize) * 100);
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
}
