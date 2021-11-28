export enum Direction {
  Y = "y",
  X = "x",
}
export enum Size {
  Y = "height",
  X = "width",
}
// type OptionKey = "classStart" | "classEnd";
export interface Option {
  classStart?: string;
  classEnd?: string;
  dataDuration?: string;
}
export interface OutOption extends Option {
  position: number;
  marginStart: number;
  marginEnd: number;
}
export interface InputOption extends Option {
  marginStart?: string;
  marginEnd?: string;
}
export interface InputOptions {
  [T: number]: InputOption;
}
export interface Elements {
  x: HTMLElement;
  i: number;
}
export default class Scroll {
  protected static windowSize: number;
  private elements: Elements[];
  public options: OutOption[];

  protected static scrollPosition = -1;
  protected static direction = Direction.Y;
  protected static size = Size.Y;

  constructor({
    selector,
    commonOptions,
    options,
  }: {
    selector: string;
    commonOptions?: InputOption;
    options?: InputOptions;
  }) {
    this.init({ selector, options, commonOptions });
  }
  public init({ selector, options, commonOptions }) {
    this.elements = this.getElements(selector);
    this.options = this.getOptions({ options, commonOptions });
    Scroll.windowSize = Scroll.getWindowSize();
    this.addGlobalEvent();
  }
  static get startPosition() {
    return Scroll.scrollPosition + Scroll.windowSize;
  }
  static get endPosition() {
    return Scroll.scrollPosition;
  }
  private get index() {
    const number = this.elements.findIndex(
      (x, i) => this.options[i].position > Scroll.windowSize
    );
    return number === -1 ? this.elements.length : number;
  }
  private getUnit(str: string) {
    if (!str) return 0;
    if (str.includes("px")) return Number(str.replace("px", ""));
    if (str.includes("%"))
      return Number(str.replace("%", "")) * Scroll.windowSize;
    return Number(str) * Scroll.windowSize;
  }
  private getOptions({ options, commonOptions }) {
    return this.elements.map(({ x, i }) => {
      const position =
        Scroll.direction === Direction.Y ? x.offsetTop : x.offsetLeft;
      return {
        position: position,
        marginStart:
          this.getUnit(options[i]?.marginStart) ||
          this.getUnit(commonOptions?.marginStart),
        marginEnd:
          this.getUnit(options[i]?.marginEnd) ||
          this.getUnit(commonOptions?.marginEnd),
        classStart: options[i]?.classStart || commonOptions?.classStart,
        classEnd: options[i]?.classEnd || commonOptions?.classEnd,
        dataDuration: options[i]?.dataDuration || commonOptions?.dataDuration,
      };
    });
  }
  private getElements(selector: string) {
    return Array.prototype.slice
      .call(document.querySelectorAll(selector))
      .map((x, i) => ({ x, i }));
  }

  static getWindowSize() {
    return Scroll.direction === Direction.Y
      ? window.outerHeight
      : window.outerWidth;
  }

  private getScrollDownElements() {
    return this.elements.filter(
      ({ x, i }) =>
        this.options[i].classStart &&
        this.options[i].position + this.options[i].marginStart <
          Scroll.startPosition &&
        !x.classList.contains(this.options[i].classStart)
    );
  }
  private getScrollDurationElements() {
    return this.elements
      .map(({ x, i }) => ({
        x: x,
        step: this.options[i].dataDuration,
        y: this.options[i].position + this.options[i].marginStart,
      }))
      .filter(
        ({ x, step, y }) =>
          step && y < Scroll.startPosition && x.dataset[step] !== "100"
      );
  }
  private getDownElements() {
    return this.elements.filter(
      ({ x, i }) =>
        this.options[i].classEnd &&
        this.options[i].position + this.options[i].marginEnd <
          Scroll.endPosition &&
        !x.classList.contains(this.options[i].classEnd)
    );
  }

  private getScrollUpElements() {
    return this.elements.filter(
      ({ x, i }) =>
        this.options[i].classStart &&
        this.options[i].position + this.options[i].marginStart >
          Scroll.startPosition &&
        x.classList.contains(this.options[i].classStart)
    );
  }
  private getDurationElements() {
    return this.elements
      .map(({ x, i }) => ({
        x: x,
        step: this.options[i].dataDuration,
        y: this.options[i].position + this.options[i].marginEnd,
      }))
      .filter(
        ({ x, step, y }) =>
          step && y > Scroll.endPosition && x.dataset[step] !== "0"
      );
  }
  private getUpElements() {
    return this.elements.filter(
      ({ x, i }) =>
        this.options[i].classEnd &&
        this.options[i].position + this.options[i].marginEnd >
          Scroll.endPosition &&
        x.classList.contains(this.options[i].classEnd)
    );
  }
  //   static throttleEvent(fn: Function, dutation: number) {
  //     let inThrottle: any = false;
  //     return (...args: any) => {
  //       if (inThrottle !== false) return;
  //       inThrottle = setTimeout(() => {
  //         fn.call(null, args);
  //         inThrottle = false;
  //       }, dutation);
  //     };
  //   }
  protected static getLevel(y: number) {
    let level = Math.ceil(((y - Scroll.windowSize) / Scroll.windowSize) * -100);
    if (level < 0) level = 0;
    if (level > 100) level = 100;
    return level.toString();
  }
  public onNextStart(x: HTMLElement, i: number) {}
  public onNextDutation(x: HTMLElement, y: number, i: number) {}
  public onNextEnd(x: HTMLElement, i: number) {}
  public onPrevStart(x: HTMLElement, i: number) {}
  public onPrevDutation(x: HTMLElement, y: number, i: number) {}
  public onPrevEnd(x: HTMLElement, i: number) {}
  private onNext() {
    this.getScrollDownElements().map(({ x, i }) => {
      this.onNextStart(x, i);
    });
    this.getScrollDurationElements().map(({ x, y }, i) => {
      this.onNextDutation(x, y, i);
    });
    this.getDownElements().map(({ x, i }) => {
      this.onNextEnd(x, i);
    });
  }
  private onPrev() {
    this.getScrollUpElements().map(({ x, i }) => {
      this.onPrevStart(x, i);
    });
    this.getDurationElements().map(({ x, y }, i) => {
      this.onPrevDutation(x, y, i);
    });
    this.getUpElements().map(({ x, i }) => {
      this.onPrevEnd(x, i);
    });
  }
  private onScroll() {
    if (Scroll.scrollPosition > window.scrollY) {
      this.onPrev();
    } else {
      this.onNext();
    }
    Scroll.scrollPosition = window.scrollY;
  }
  static onResize() {
    Scroll.windowSize = Scroll.getWindowSize();
  }
  private addGlobalEvent() {
    window.onscroll = this.onScroll.bind(this);
    window.onresize = Scroll.onResize;
  }
}
