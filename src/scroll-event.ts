export enum Direction {
  Y = "y",
  X = "x",
}
export enum Size {
  Y = "height",
  X = "width",
}
export enum OptionKey {
  classStart = "classStart",
  classEnd = "classEnd",
  adjustPosition = "adjustPosition",
  step = "step",
}
// type OptionKey = "classStart" | "classEnd";
export type Options = {
  [T in OptionKey]: string;
};
export default class ScrollEvent {
  readonly dataset: Options = {
    classStart: "uxScrollClassStart",
    classEnd: "uxScrollClassEnd",
    adjustPosition: "uxScrollAdjustPosition",
    step: "uxScrollStep",
  };
  protected static windowSize: number;
  private oldScrollPosition = -1;
  private elements: HTMLElement[];

  protected static direction = Direction.Y;
  protected static size = Size.Y;

  constructor({ selector }: { selector: string }) {
    this.init({ selector });
  }
  public init({ selector }) {
    this.elements = this.getElements(selector);
    ScrollEvent.windowSize = ScrollEvent.getWindowSize();
    this.addGlobalEvent();
  }
  private get index() {
    const number = this.elements.findIndex(
      (x) =>
        x.getBoundingClientRect()[ScrollEvent.direction] >
        ScrollEvent.windowSize
    );
    return number === -1 ? this.elements.length : number;
  }
  private getPosition(x: HTMLElement) {
    const position = x.getBoundingClientRect()[ScrollEvent.direction];
    const adjustPosition = this.getElementDataset(x, OptionKey.adjustPosition);
    const margin = Number(
      adjustPosition.includes("px")
        ? adjustPosition.replace("px", "")
        : Number(adjustPosition) * ScrollEvent.windowSize
    );
    return position + margin;
  }
  private getElementDataset(x: HTMLElement, keyword: OptionKey) {
    return x.dataset[this.dataset[keyword]] || "";
  }
  private getElements(selector: string) {
    return Array.prototype.slice
      .call(document.querySelectorAll(selector))
      .sort((a, b) => {
        return this.getPosition(a) - this.getPosition(b);
      });
  }

  static getWindowSize() {
    return ScrollEvent.direction === Direction.Y
      ? window.outerHeight
      : window.outerWidth;
  }

  private getScrollDownElements() {
    return this.elements.filter(
      (x) =>
        this.getElementDataset(x, OptionKey.classStart) &&
        this.getPosition(x) < ScrollEvent.windowSize &&
        !x.classList.contains(this.getElementDataset(x, OptionKey.classStart))
    );
  }
  private getScrollDurationElements() {
    return this.elements
      .map((x) => ({
        x: x,
        step: this.getElementDataset(x, OptionKey.step),
        y: this.getPosition(x),
      }))
      .filter(
        ({ x, step, y }) =>
          step &&
          y < ScrollEvent.windowSize &&
          x.dataset[this.dataset[OptionKey.step]] !== "100"
      );
  }
  private getDownElements() {
    return this.elements.filter(
      (x) =>
        this.getElementDataset(x, OptionKey.classEnd) &&
        x.getBoundingClientRect()[ScrollEvent.direction] < 0 &&
        !x.classList.contains(this.getElementDataset(x, OptionKey.classEnd))
    );
  }

  private getScrollUpElements() {
    return this.elements.filter(
      (x) =>
        this.getElementDataset(x, OptionKey.classStart) &&
        x.getBoundingClientRect()[ScrollEvent.direction] >
          ScrollEvent.windowSize &&
        x.classList.contains(this.getElementDataset(x, OptionKey.classStart))
    );
  }
  private getDurationElements() {
    return this.elements
      .map((x) => ({
        x: x,
        step: this.getElementDataset(x, OptionKey.step),
        y: this.getPosition(x),
      }))
      .filter(
        ({ x, step, y }) =>
          step && y > 0 && x.dataset[this.dataset[OptionKey.step]] !== "0"
      );
  }
  private getUpElements() {
    return this.elements.filter(
      (x) =>
        this.getElementDataset(x, OptionKey.classEnd) &&
        x.getBoundingClientRect()[ScrollEvent.direction] > 0 &&
        x.classList.contains(this.getElementDataset(x, OptionKey.classEnd))
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
    let level = Math.ceil(
      ((y - ScrollEvent.windowSize) / ScrollEvent.windowSize) * -100
    );
    if (level < 0) level = 0;
    if (level > 100) level = 100;
    return level.toString();
  }
  public onNextStart(x: HTMLElement) {
    x.classList.add(this.getElementDataset(x, OptionKey.classStart));
  }
  public onNextDutation(x: HTMLElement, y: number) {
    x.dataset[this.dataset[OptionKey.step]] = ScrollEvent.getLevel(y);
  }
  public onNextEnd(x) {
    x.classList.add(this.getElementDataset(x, OptionKey.classEnd));
  }
  public onPrevStart(x: HTMLElement) {
    x.classList.remove(this.getElementDataset(x, OptionKey.classStart));
  }
  public onPrevDutation(x: HTMLElement, y: number) {
    x.dataset[this.dataset[OptionKey.step]] = ScrollEvent.getLevel(y);
  }
  public onPrevEnd(x) {
    x.classList.remove(this.getElementDataset(x, OptionKey.classEnd));
  }
  private onNext() {
    this.getScrollDownElements().map((x) => {
      this.onNextStart(x);
    });
    this.getScrollDurationElements().map(({ x, y }) => {
      this.onNextDutation(x, y);
    });
    this.getDownElements().map((x) => {
      this.onNextEnd(x);
    });
  }
  private onPrev() {
    this.getScrollUpElements().map((x) => {
      this.onPrevStart(x);
    });
    this.getDurationElements().map(({ x, y }) => {
      this.onPrevDutation(x, y);
    });
    this.getUpElements().map((x) => {
      this.onPrevEnd(x);
    });
  }
  private onScroll() {
    if (this.oldScrollPosition > window.scrollY) {
      this.onPrev();
    } else {
      this.onNext();
    }
    this.oldScrollPosition = window.scrollY;
  }
  static onResize() {
    ScrollEvent.windowSize = ScrollEvent.getWindowSize();
  }
  private addGlobalEvent() {
    window.onscroll = this.onScroll.bind(this);
    window.onresize = ScrollEvent.onResize;
  }
}
