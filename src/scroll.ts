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
export interface IndexOption<T> {
  [T: number]: T;
}
export interface Elements {
  x: HTMLElement;
  i: number;
}
export default class Scroll {
  private elements: Elements[];
  public options: OutOption[];

  protected static windowSize: number;
  protected static scrollPosition = -1;
  protected static direction = Direction.Y;
  // protected static size = Size.Y;

  constructor({
    selector,
    commonOptions,
    options,
  }: {
    selector: string;
    commonOptions?: InputOption;
    options?: IndexOption<InputOption>;
  }) {
    Scroll.windowSize = Scroll.getWindowSize();
    this.elements = this.getElements(selector);
    this.options = this.getOptions({ options, commonOptions });
    this.addGlobalEvent();
  }
  public static get startPosition() {
    return Scroll.scrollPosition + Scroll.windowSize;
  }
  public static get endPosition() {
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
      return Number(str.replace("%", "")) * Scroll.windowSize * 0.01;
    return Number(str) * Scroll.windowSize;
  }
  private getOptions({
    options,
    commonOptions,
  }: {
    options?: IndexOption<InputOption>;
    commonOptions?: InputOption;
  }) {
    !options && (options = {});
    !commonOptions && (commonOptions = {});
    return this.elements.map(({ x, i }) => {
      const position =
        Scroll.direction === Direction.Y ? x.offsetTop : x.offsetLeft;
      return {
        position: position,
        marginStart:
          this.getUnit(commonOptions?.marginStart) ||
          this.getUnit(options[i]?.marginStart),
        marginEnd:
          this.getUnit(commonOptions?.marginEnd) ||
          this.getUnit(options[i]?.marginEnd),
        classStart: options[i]?.classStart || commonOptions?.classStart,
        classEnd: options[i]?.classEnd || commonOptions?.classEnd,
        dataDuration: options[i]?.dataDuration || commonOptions?.dataDuration,
      };
    });
  }
  private getElements(selector: string) {
    return Array.prototype.slice
      .call(document.querySelectorAll(selector))
      .map((x: HTMLElement, i: number) => ({ x, i }));
  }

  static getWindowSize() {
    return Scroll.direction === Direction.Y
      ? window.outerHeight
      : window.outerWidth;
  }

  private getScrollDownElements() {
    return this.elements
      .map(({ x, i }) => ({
        x: x,
        y: this.options[i].position + this.options[i].marginStart,
        i,
      }))
      .filter(
        ({ x, y, i }) =>
          this.options[i].classStart &&
          y < Scroll.startPosition &&
          !x.classList.contains(this.options[i].classStart)
      );
  }
  // private getScrollDurationElements() {
  //   return this.elements
  //     .map(({ x, i }) => ({
  //       x: x,
  //       step: this.options[i].dataDuration,
  //       y: this.options[i].position + this.options[i].marginStart,
  //     }))
  //     .filter(
  //       ({ x, step, y }) =>
  //         step && y < Scroll.startPosition && x.dataset[step] !== "100"
  //     );
  // }
  private getDownElements() {
    return this.elements
      .map(({ x, i }) => ({
        x: x,
        y: this.options[i].position + this.options[i].marginEnd,
        i,
      }))
      .filter(
        ({ x, y, i }) =>
          this.options[i].classEnd &&
          y < Scroll.endPosition &&
          !x.classList.contains(this.options[i].classEnd)
      );
  }

  private getScrollUpElements() {
    return this.elements
      .map(({ x, i }) => ({
        x: x,
        y: this.options[i].position + this.options[i].marginStart,
        i,
      }))
      .filter(
        ({ x, y, i }) =>
          this.options[i].classStart &&
          y > Scroll.startPosition &&
          x.classList.contains(this.options[i].classStart)
      );
  }
  // private getDurationElements() {
  //   return this.elements
  //     .map(({ x, i }) => ({
  //       x: x,
  //       step: this.options[i].dataDuration,
  //       y: this.options[i].position + this.options[i].marginEnd,
  //     }))
  //     .filter(
  //       ({ x, step, y }) =>
  //         step && y > Scroll.endPosition && x.dataset[step] !== "0"
  //     );
  // }
  private getUpElements() {
    return this.elements
      .map(({ x, i }) => ({
        x: x,
        y: this.options[i].position + this.options[i].marginEnd,
        i,
      }))
      .filter(
        ({ x, y, i }) =>
          this.options[i].classEnd &&
          y > Scroll.endPosition &&
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

  public onNextStart({ x, y, i }: { x: HTMLElement; y: number; i: number }) {}
  public onNextEnd({ x, y, i }: { x: HTMLElement; y: number; i: number }) {}
  public onPrevStart({ x, y, i }: { x: HTMLElement; y: number; i: number }) {}
  public onPrevEnd({ x, y, i }: { x: HTMLElement; y: number; i: number }) {}
  private onNext() {
    this.getScrollDownElements().map(({ x, y, i }) => {
      this.onNextStart({ x, y, i });
    });
    // this.getScrollDurationElements().map(({ x, y }, i) => {
    //   this.onNextDutation(x, y, i);
    // });
    this.getDownElements().map(({ x, y, i }) => {
      this.onNextEnd({ x, y, i });
    });
  }
  private onPrev() {
    this.getScrollUpElements().map(({ x, y, i }) => {
      this.onPrevStart({ x, y, i });
    });
    // this.getDurationElements().map(({ x, y }, i) => {
    //   this.onPrevDutation(x, y, i);
    // });
    this.getUpElements().map(({ x, y, i }) => {
      this.onPrevEnd({ x, y, i });
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
