import "../styles.scss";
import throttle from "./throttle";
export enum Direction {
  Y = "y",
  X = "x",
}
export enum Size {
  Y = "height",
  X = "width",
}
// type OptionKey = "start" | "started";
export interface Option<T> {
  starting?: T;
  doing?: T;
  ending?: T;
}
export interface InputOption extends Option<string> {
  startMargin?: string;
  endMargin?: string;
}
export interface OutputOption extends Option<string> {
  index: number;
  size: number;
  startPosition: number;
  endPosition: number;
}
export interface IndexOption<T> {
  [T: number]: T;
}
// export interface Element {
//   x: HTMLElement;
//   i: number;
// }
export interface Props {
  selector: string;
  throttleTimer?: number;
  commonOptions?: InputOption;
  options?: IndexOption<InputOption>;
}
export default class Scroll {
  readonly #props: Props;
  protected elements: HTMLElement[];
  protected options: OutputOption[];
  readonly #status: Option<boolean>[];

  protected scrollSize: number;
  protected scrollPosition = -1;
  protected windowSize: number;
  readonly #direction = Direction.Y;
  #resetStatusFlag: number = 1;
  // protected static size = Size.Y;

  constructor(props: Props) {
    this.#props = props;
    this.#onInit();
    this.#status = this.elements.map(() => ({
      starting: true,
      doing: true,
      ending: true,
    }));
  }
  get scrollBottomPosition() {
    return this.scrollPosition + this.windowSize;
  }
  get scrollTopPosition() {
    return this.scrollPosition;
  }
  get #index() {
    if (this.scrollTopPosition === 0) return 0;
    if (this.scrollBottomPosition === this.scrollSize)
      return this.options.length - 1;
    return this.options.findIndex(
      ({ startPosition, endPosition, index }) =>
        startPosition >= this.scrollTopPosition
    );
  }

  get #getStartingOptions() {
    return this.options.filter(
      ({ startPosition, index, starting }) =>
        starting &&
        (this.#resetStatusFlag
          ? startPosition <= this.scrollBottomPosition
          : startPosition >= this.scrollTopPosition) &&
        this.#status[index].starting
    );
  }
  get #getDoingOptions() {
    return this.options.filter(
      ({ startPosition, index, doing, endPosition }) =>
        doing &&
        (this.#resetStatusFlag
          ? startPosition <= this.scrollTopPosition
          : endPosition >= this.scrollBottomPosition) &&
        this.#status[index].doing
    );
  }
  get #getEndingOptions() {
    return this.options.filter(
      ({ ending, index, endPosition }) =>
        ending &&
        (this.#resetStatusFlag
          ? endPosition <= this.scrollBottomPosition
          : endPosition >= this.scrollTopPosition) &&
        this.#status[index].ending
    );
  }
  get #throttleTimer() {
    return this.#props?.throttleTimer || 0;
  }
  #getOptions({
    options,
    commonOptions,
  }: {
    options?: IndexOption<InputOption>;
    commonOptions?: InputOption;
  }) {
    !options && (options = {});
    !commonOptions && (commonOptions = {});

    return this.elements.map((x, index) => {
      const startPosition =
        this.#direction === Direction.Y ? x.offsetTop : x.offsetLeft;
      const size =
        this.#direction === Direction.Y ? x.offsetHeight : x.offsetWidth;
      const endPosition = startPosition + size;
      const startMargin = this.#getMargin(
        commonOptions?.startMargin || options[index]?.startMargin
      );
      const endMargin = this.#getMargin(
        commonOptions?.endMargin || options[index]?.endMargin
      );
      return {
        index,
        size,
        startPosition: startPosition + startMargin,
        endPosition: endPosition + endMargin,
        starting: commonOptions?.starting || options[index]?.starting,
        doing: commonOptions?.doing || options[index]?.doing,
        ending: commonOptions?.ending || options[index]?.ending,
      };
    });
  }
  #getMargin(margin: string) {
    if (!margin) return 0;
    if (margin.includes("px")) return Number(margin.replace("px", ""));
    if (margin.includes("%"))
      return (Number(margin.replace("%", "")) * this.windowSize) / 100;
    return Number(margin) * this.windowSize;
  }
  #getElements(selector: string) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  #getWindowSize() {
    return this.#direction === Direction.Y
      ? window.innerHeight
      : window.innerWidth;
  }
  #getScrollSize() {
    return this.#direction === Direction.Y
      ? Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.body.clientHeight,
          document.documentElement.clientHeight
        )
      : Math.max(
          document.body.scrollWidth,
          document.documentElement.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.offsetWidth,
          document.body.clientWidth,
          document.documentElement.clientWidth
        );
  }

  onNextStarting(index: number): true | void {}
  onNextDoing(index: number): true | void {}
  onNextEnding(index: number): true | void {}
  onPrevStarting(index: number): true | void {}
  onPrevDoing(index: number): true | void {}
  onPrevEnding(index: number): true | void {}

  #scroll() {
    this.#getStartingOptions.map(({ index }) => {
      const res = this.#resetStatusFlag
        ? this.onNextStarting(index)
        : this.onPrevStarting(index);
      console.log(res, this.#status[index].starting, "res");
      if (res) this.#status[index].starting = false;
    });
    this.#getDoingOptions.map(({ index }) => {
      const res = this.#resetStatusFlag
        ? this.onNextDoing(index)
        : this.onPrevDoing(index);
      if (res) this.#status[index].doing = false;
    });
    this.#getEndingOptions.map(({ index }) => {
      const res = this.#resetStatusFlag
        ? this.onNextEnding(index)
        : this.onPrevEnding(index);
      if (res) this.#status[index].ending = false;
    });
  }
  #resetStatus(directive: number) {
    this.#resetStatusFlag = directive;
    for (const index in this.#status) {
      this.#status[index].starting = true;
      this.#status[index].doing = true;
      this.#status[index].ending = true;
    }
  }
  onScroll = throttle(() => {
    if (this.scrollPosition > window.scrollY) {
      this.#resetStatusFlag && this.#resetStatus(0);
    } else {
      !this.#resetStatusFlag && this.#resetStatus(1);
    }
    this.#scroll();
    this.scrollPosition = window.scrollY;
  }, this.#throttleTimer);
  #onInit() {
    this.windowSize = this.#getWindowSize();
    this.scrollSize = this.#getScrollSize();
    this.elements = this.#getElements(this.#props.selector);
    this.options = this.#getOptions({
      options: this.#props.options,
      commonOptions: this.#props.commonOptions,
    });
  }
  onResize = throttle(this.#onInit, this.#throttleTimer);
}
