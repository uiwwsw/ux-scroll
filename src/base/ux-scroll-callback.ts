import Scroll, {
  IndexOption,
  InputOption,
  OutputOption,
  Props,
} from "./scroll";
import easingsFunctions, { TEasingName } from "../utils/easing";
export interface InputOptionForCallback extends InputOption {
  startingFrame?: number;
  doingFrame?: number;
  endingFrame?: number;
  startingEasing?: TEasingName;
  doingEasing?: TEasingName;
  endingEasing?: TEasingName;
}
export interface OutputOptionForCallback extends OutputOption {
  startingFrame: number;
  doingFrame: number;
  endingFrame: number;
  startingEasing: TEasingName;
  doingEasing: TEasingName;
  endingEasing: TEasingName;
}
export interface PropsExtends extends Props<InputOptionForCallback> {
  callbacks: IndexOption<Callback>;
}
export interface CallbackProps {
  scrollDirection: 0 | 1;
  status: string;
  index: number;
  step: number;
  element: HTMLElement;
}
export type Callback = (props: CallbackProps) => true | void;
export default class UxScrollCallback extends Scroll<InputOptionForCallback> {
  readonly #callbacks: IndexOption<Callback>;
  protected options: OutputOptionForCallback[];
  constructor(props: PropsExtends) {
    super({
      ...props,
      commonOptions: {
        starting: "starting",
        doing: "doing",
        ending: "ending",
        startingFrame: 999,
        doingFrame: 999,
        endingFrame: 999,
        startingEasing: "inCubic",
        doingEasing: "inCubic",
        endingEasing: "inCubic",
        ...props.commonOptions,
      },
    });
    this.#callbacks = props.callbacks;
  }
  #getStep(level: number, frame: number, easing: TEasingName) {
    if (level > 1) level = 1;
    if (level < 0) level = 0;
    const acc = easingsFunctions[easing];
    return Math.ceil(acc(level) * frame);
  }

  #callback({
    index,
    status,
    level,
    frame,
    easing,
  }: {
    index: number;
    status: string;
    level: number;
    frame: number;
    easing: TEasingName;
  }): void | true {
    const callback = this.#callbacks[index];
    const step = this.#getStep(level, frame, easing);
    // const easingLevel = this.
    // const level = Math.ceil(_level * frame);
    const element = this.elements[index];
    callback &&
      callback({
        scrollDirection: this.scrollDirection,
        status,
        index,
        step,
        element,
      });
    if (level < 0 || level > 1) return true;
  }
  onStarting(index: number): true | void {
    const frame = this.options[index].startingFrame;
    const status = this.options[index].starting;
    const easing = this.options[index].startingEasing;

    const position = this.scrollDirection
      ? this.options[index].startTopPosition
      : this.options[index].startBottomPosition;

    const level = (this.scrollBottomPosition - position) / this.windowSize;
    return this.#callback({
      easing,
      status,
      index,
      level,
      frame,
    });
  }
  onDoing(index: number): true | void {
    const frame = this.options[index].doingFrame;
    const status = this.options[index].doing;
    const easing = this.options[index].doingEasing;
    const position = this.scrollDirection
      ? this.options[index].endTopPosition
      : this.options[index].endBottomPosition;
    const level =
      1 -
      (position - this.scrollBottomPosition) /
        (this.options[index].size - this.windowSize);

    return this.#callback({
      easing,
      status,
      index,
      level,
      frame,
    });
  }
  onEnding(index: number): true | void {
    const frame = this.options[index].endingFrame;
    const status = this.options[index].ending;
    const easing = this.options[index].endingEasing;
    const position = this.scrollDirection
      ? this.options[index].endTopPosition
      : this.options[index].endBottomPosition;
    const level = 1 - (position - this.scrollTopPosition) / this.windowSize;
    return this.#callback({
      easing,
      status,
      index,
      level,
      frame,
    });
  }
}
