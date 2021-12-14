// import throttle from "../utils/throttle";
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
export interface Props<T> {
  selector: string;
  throttleTimer?: number;
  commonOptions?: T;
  options?: IndexOption<T>;
}
export default class Scroll<K> {
  readonly #props: Props<K>;
  readonly #direction = Direction.Y;
  readonly #status: Option<boolean>[];

  protected readonly elements: HTMLElement[];
  protected options: OutputOption[];

  protected scrollSize: number;
  protected scrollPosition = -1;
  protected windowSize: number;
  protected scrollDirection: 0 | 1 = 1;
  readonly onResize: Function;
  readonly onScroll: Function;

  constructor(props: Props<K>) {
    this.#props = props;
    this.elements = this.#getElements();
    this.#status = this.#getStatus();
    this.#onResize();
    this.onResize = this.#setThrottle(this.#onResize, this.#throttleTimer);
    this.onScroll = this.#setThrottle(this.#onScroll, this.#throttleTimer);
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
      const others = Object.assign(commonOptions, options[index]);

      const startTopMargin = this.#getMargin(others.startTopMargin);
      const endTopMargin = this.#getMargin(others.endTopMargin);
      const startBottomMargin = this.#getMargin(others.startBottomMargin);
      const endBottomMargin = this.#getMargin(others.endBottomMargin);
      return {
        index,
        size,
        ...others,
        startTopPosition: startPosition + startTopMargin,
        endTopPosition: endPosition + endTopMargin,
        startBottomPosition: startPosition + startBottomMargin,
        endBottomPosition: endPosition + endBottomMargin,
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
  #getElements() {
    return Array.prototype.slice.call(
      document.querySelectorAll(this.#props.selector)
    );
  }
  #getStatus() {
    return this.elements.map(() => ({
      starting: true,
      doing: true,
      ending: true,
    }));
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
  #resetStatus(directive: 0 | 1) {
    this.scrollDirection = directive;
    for (const index in this.#status) {
      this.#status[index].starting = true;
      this.#status[index].doing = true;
      this.#status[index].ending = true;
    }
  }
  #onScroll = this.#requestAnimationFrame(() => {
    if (!this.elements) return;
    if (this.scrollPosition > window.scrollY) {
      // console.log("업");
      this.scrollDirection && this.#resetStatus(0);
    } else if (this.scrollPosition < window.scrollY) {
      // console.log("다운");
      !this.scrollDirection && this.#resetStatus(1);
    }
    this.#checkOptions();
    this.scrollPosition = window.scrollY;
  });

  #onResize = this.#requestAnimationFrame(() => {
    if (!this.elements) return;
    this.windowSize = this.#getWindowSize();
    this.scrollSize = this.#getScrollSize();
    this.options = this.#getOptions({
      options: this.#props.options,
      commonOptions: this.#props.commonOptions,
    });
  });
  #requestAnimationFrame(callback: Function) {
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
  #setThrottle(callback: Function, wait: number) {
    let inThrottle: any;
    return (...arg: any) => {
      if (inThrottle) return;
      inThrottle = setTimeout(() => {
        callback.call(this, arg);
        inThrottle = false;
      }, wait);
    };
  }

  onStarting(index: number): true | void {}
  onDoing(index: number): true | void {}
  onEnding(index: number): true | void {}
}
