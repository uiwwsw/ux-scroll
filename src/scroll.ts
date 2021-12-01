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
export interface Props {
  selector: string;
  commonOptions?: InputOption;
  options?: IndexOption<InputOption>;
}
export default class Scroll {
  private readonly props: Props;
  private elements: Elements[];
  public options: OutOption[];

  private scrollPosition = -1;
  public windowSize: number;
  private readonly direction = Direction.Y;
  // protected static size = Size.Y;

  constructor(props: Props) {
    this.props = props;
    this.onResize();
  }
  public get startPosition() {
    return this.scrollPosition + this.windowSize;
  }
  public get endPosition() {
    return this.scrollPosition;
  }
  private get index() {
    const number = this.elements.findIndex(
      (x, i) => this.options[i].position > this.windowSize
    );
    return number === -1 ? this.elements.length : number;
  }
  private getUnit(str: string) {
    if (!str) return 0;
    if (str.includes("px")) return Number(str.replace("px", ""));
    if (str.includes("%"))
      return Number(str.replace("%", "")) * this.windowSize * 0.01;
    return Number(str) * this.windowSize;
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
        this.direction === Direction.Y ? x.offsetTop : x.offsetLeft;
      return {
        position,
        marginStart:
          this.getUnit(commonOptions?.marginStart) ||
          this.getUnit(options[i]?.marginStart),
        marginEnd:
          this.getUnit(commonOptions?.marginEnd) ||
          this.getUnit(options[i]?.marginEnd),
        classStart: commonOptions?.classStart || options[i]?.classStart,
        classEnd: commonOptions?.classEnd || options[i]?.classEnd,
        dataDuration: commonOptions?.dataDuration || options[i]?.dataDuration,
      };
    });
  }
  private getElements(selector: string) {
    return Array.prototype.slice
      .call(document.querySelectorAll(selector))
      .map((x: HTMLElement, i: number) => ({ x, i }));
  }

  private getWindowSize() {
    return this.direction === Direction.Y
      ? window.outerHeight
      : window.outerWidth;
  }

  private get getScrollDownElements() {
    return this.elements
      .map(({ x, i }) => ({
        x: x,
        y: this.options[i].position + this.options[i].marginStart,
        i,
      }))
      .filter(
        ({ x, y, i }) =>
          this.options[i].classStart &&
          y < this.startPosition &&
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
  private get getDownElements() {
    return this.elements
      .map(({ x, i }) => ({
        x: x,
        y: this.options[i].position + this.options[i].marginEnd,
        i,
      }))
      .filter(
        ({ x, y, i }) =>
          this.options[i].classEnd &&
          y < this.endPosition &&
          !x.classList.contains(this.options[i].classEnd)
      );
  }

  private get getScrollUpElements() {
    return this.elements
      .map(({ x, i }) => ({
        x: x,
        y: this.options[i].position + this.options[i].marginStart,
        i,
      }))
      .filter(
        ({ x, y, i }) =>
          this.options[i].classStart &&
          y > this.startPosition &&
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
  private get getUpElements() {
    return this.elements
      .map(({ x, i }) => ({
        x: x,
        y: this.options[i].position + this.options[i].marginEnd,
        i,
      }))
      .filter(
        ({ x, y, i }) =>
          this.options[i].classEnd &&
          y > this.endPosition &&
          x.classList.contains(this.options[i].classEnd)
      );
  }

  public onNextStart({ x, y, i }: { x: HTMLElement; y: number; i: number }) {}
  public onNextEnd({ x, y, i }: { x: HTMLElement; y: number; i: number }) {}
  public onPrevStart({ x, y, i }: { x: HTMLElement; y: number; i: number }) {}
  public onPrevEnd({ x, y, i }: { x: HTMLElement; y: number; i: number }) {}
  private onNext = throttle(() => {
    // console.log(this.elements, this);
    this.getScrollDownElements.map(({ x, y, i }) => {
      this.onNextStart({ x, y, i });
    });
    // this.getScrollDurationElements().map(({ x, y }, i) => {
    //   this.onNextDutation(x, y, i);
    // });
    this.getDownElements.map(({ x, y, i }) => {
      this.onNextEnd({ x, y, i });
    });
  }, 100);
  private onPrev = throttle(() => {
    // console.log(this.elements, this);
    this.getScrollUpElements.map(({ x, y, i }) => {
      this.onPrevStart({ x, y, i });
    });
    // this.getDurationElements().map(({ x, y }, i) => {
    //   this.onPrevDutation(x, y, i);
    // });
    this.getUpElements.map(({ x, y, i }) => {
      this.onPrevEnd({ x, y, i });
    });
  }, 100);
  public onScroll() {
    if (this.scrollPosition > window.scrollY) {
      this.onPrev();
    } else {
      this.onNext();
    }
    this.scrollPosition = window.scrollY;
  }
  // static onResize = throttle(() => {
  //   Scroll.windowSize = Scroll.getWindowSize();
  // }, 100);
  public onResize = throttle(() => {
    this.elements = this.getElements(this.props.selector);
    this.options = this.getOptions({
      options: this.props.options,
      commonOptions: this.props.commonOptions,
    });
    this.windowSize = this.getWindowSize();
  }, 100);
}
