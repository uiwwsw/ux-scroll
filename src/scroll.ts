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
export interface Option<T> {
  starting?: T;
  doing?: T;
  ending?: T;
}
export interface InputOption extends Option<string> {
  startTopMargin?: string; // starting 이벤트중 top=>down 시 마진
  endTopMargin?: string; // ending 이벤트중 top=>down 시 마진
  startBottomMargin?: string; // starting 이벤트중 down=>top 시 마진
  endBottomMargin?: string; // ending 이벤트중 down=>top 시 마진
}
export interface OutputOption extends Option<string> {
  index: number;
  size: number;
  startTopPosition: number;
  endTopPosition: number;
  startBottomPosition: number;
  endBottomPosition: number;
}
export interface IndexOption<T> {
  [T: number]: T;
}
export interface Props {
  selector: string;
  throttleTimer?: number;
  commonOptions?: InputOption;
  options?: IndexOption<InputOption>;
}
export default class Scroll {
  readonly #props: Props;
  readonly #direction = Direction.Y;
  readonly #status: Option<boolean>[];

  protected readonly elements: HTMLElement[];
  protected options: OutputOption[];

  protected scrollSize: number;
  protected scrollPosition = -1;
  protected windowSize: number;
  protected scrollDirection: number = 1;
  readonly onResize: Function;
  readonly onScroll: Function;
  constructor(props: Props) {
    this.#props = props;
    this.elements = this.#getElements(this.#props.selector);
    this.#onResize();
    this.#status = this.elements.map(() => ({
      starting: true,
      doing: true,
      ending: true,
    }));
    this.onResize = throttle(this.#onResize, this.#throttleTimer);
    this.onScroll = throttle(this.#onScroll, this.#throttleTimer);
  }
  get scrollBottomPosition() {
    return this.scrollPosition + this.windowSize;
  }
  get scrollTopPosition() {
    return this.scrollPosition;
  }
  // get #index() {
  //   if (this.scrollTopPosition === 0) return 0;
  //   if (this.scrollBottomPosition === this.scrollSize)
  //     return this.options.length - 1;
  //   return this.options.findIndex(
  //     ({ startPosition, endPosition, index }) =>
  //       startPosition >= this.scrollTopPosition
  //   );
  // }

  get #getStartingOptions() {
    return this.options.filter(
      ({ startTopPosition, startBottomPosition, index, starting }) =>
        starting &&
        (this.scrollDirection
          ? startTopPosition <= this.scrollBottomPosition
          : startBottomPosition >= this.scrollTopPosition) &&
        this.#status[index].starting
    );
  }
  get #getDoingOptions() {
    return this.options.filter(
      ({ startTopPosition, endBottomPosition, index, doing }) =>
        doing &&
        (this.scrollDirection
          ? startTopPosition <= this.scrollTopPosition
          : endBottomPosition >= this.scrollBottomPosition) &&
        this.#status[index].doing
    );
  }
  get #getEndingOptions() {
    return this.options.filter(
      ({ ending, index, endTopPosition, endBottomPosition }) =>
        ending &&
        (this.scrollDirection
          ? endTopPosition <= this.scrollBottomPosition
          : endBottomPosition >= this.scrollTopPosition) &&
        this.#status[index].ending
    );
  }
  get #throttleTimer() {
    return this.#props.throttleTimer || 0;
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
      const startTopMargin = this.#getMargin(
        commonOptions?.startTopMargin || options[index]?.startTopMargin
      );
      const endTopMargin = this.#getMargin(
        commonOptions?.endTopMargin || options[index]?.endTopMargin
      );
      const startBottomMargin = this.#getMargin(
        commonOptions?.startBottomMargin || options[index]?.startBottomMargin
      );
      const endBottomMargin = this.#getMargin(
        commonOptions?.endBottomMargin || options[index]?.endBottomMargin
      );
      return {
        index,
        size,
        // startPosition: startPosition,
        // endPosition: endPosition,
        startTopPosition: startPosition + startTopMargin,
        endTopPosition: endPosition + endTopMargin,
        startBottomPosition: startPosition + startBottomMargin,
        endBottomPosition: endPosition + endBottomMargin,
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

  #checkOptions() {
    this.#getStartingOptions.map(({ index }) => {
      const res = this.onStarting(index);
      if (res) this.#status[index].starting = false;
    });
    this.#getDoingOptions.map(({ index }) => {
      const res = this.onDoing(index);
      if (res) this.#status[index].doing = false;
    });
    this.#getEndingOptions.map(({ index }) => {
      const res = this.onEnding(index);
      if (res) this.#status[index].ending = false;
    });
  }
  #resetStatus(directive: number) {
    this.scrollDirection = directive;
    for (const index in this.#status) {
      this.#status[index].starting = true;
      this.#status[index].doing = true;
      this.#status[index].ending = true;
    }
  }
  #onScroll = this.#throttleUsingRaf(() => {
    if (!this.elements) return;
    if (this.scrollPosition > window.scrollY) {
      this.scrollDirection && this.#resetStatus(0);
    } else {
      !this.scrollDirection && this.#resetStatus(1);
    }
    this.#checkOptions();
    this.scrollPosition = window.scrollY;
  });
  #onResize = this.#throttleUsingRaf(() => {
    if (!this.elements) return;
    this.windowSize = this.#getWindowSize();
    this.scrollSize = this.#getScrollSize();
    this.options = this.#getOptions({
      options: this.#props.options,
      commonOptions: this.#props.commonOptions,
    });
  });
  #throttleUsingRaf(callback: Function) {
    let ticking = false;

    return () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          callback();
          ticking = false;
        });
      }
    };
  }

  onStarting(index: number): true | void {}
  onDoing(index: number): true | void {}
  onEnding(index: number): true | void {}
}
