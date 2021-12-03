import Scroll, { IndexOption, InputOption, Props } from "./scroll";
export interface InputOptionForCallback extends InputOption {
  startTopMargin?: string; // starting 이벤트중 top=>down 시 마진
  endTopMargin?: string; // ending 이벤트중 top=>down 시 마진
  startBottomMargin?: string; // starting 이벤트중 down=>top 시 마진
  endBottomMargin?: string; // ending 이벤트중 down=>top 시 마진
}
export interface PropsExtends extends Props {
  callbacks: IndexOption<Function>;
  commonOptions?: InputOptionForCallback;
  options?: IndexOption<InputOptionForCallback>;
}
export interface CallbackProps {
  scrollDirection: 0 | 1;
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
        frame: 1000,
        ...props.commonOptions,
      },
    });
    this.#callbacks = props.callbacks;
  }
  #getStep(level: number, frame: number) {
    let step = level;
    if (level > frame) step = frame;
    if (level < 0) step = 0;
    return step;
  }

  #callback({
    index,
    status,
    level,
    frame,
  }: {
    index: number;
    status: string;
    level: number;
    frame: number;
  }) {
    const callback = this.#callbacks[index] as Callback;
    const step = this.#getStep(level, frame);
    const element = this.elements[index];
    callback &&
      callback({
        scrollDirection: this.scrollDirection,
        status,
        index,
        step,
        element,
      });
  }
  onStarting(index: number): true | void {
    const frame = this.options[index].frame;
    const status = this.options[index].starting;

    const position = this.scrollDirection
      ? this.options[index].startTopPosition
      : this.options[index].startBottomPosition;
    const level = Math.ceil(
      ((this.scrollBottomPosition - position) / this.windowSize) * frame
    );
    this.#callback({
      status,
      index,
      level,
      frame,
    });

    if (level < 0 || level > frame) return true;
  }
  onDoing(index: number): true | void {
    const frame = this.options[index].frame;
    const status = this.options[index].doing;

    const position = this.scrollDirection
      ? this.options[index].endTopPosition
      : this.options[index].endBottomPosition;
    const level =
      frame -
      Math.ceil(
        ((position - this.scrollBottomPosition) /
          (this.options[index].size - this.windowSize)) *
          frame
      );
    this.#callback({
      status,
      index,
      level,
      frame,
    });
    if (level < 0 || level > frame) return true;
  }
  onEnding(index: number): true | void {
    const frame = this.options[index].frame;
    const status = this.options[index].ending;

    const position = this.scrollDirection
      ? this.options[index].endTopPosition
      : this.options[index].endBottomPosition;
    const level =
      frame -
      Math.ceil(
        ((position - this.scrollTopPosition) / this.windowSize) * frame
      );
    this.#callback({
      status,
      index,
      level,
      frame,
    });
    if (level < 0 || level > frame) return true;
  }
}
