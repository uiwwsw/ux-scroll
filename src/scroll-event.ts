enum Direction {
  Y = "y",
  X = "x",
}
enum Size {
  Y = "height",
  X = "width",
}
enum OptionKey {
  classStart = "classStart",
  classEnd = "classEnd",
  duration = "duration",
  _step = "_step",
}
// type OptionKey = "classStart" | "classEnd";
type Options = {
  [T in OptionKey]: string;
};
export default class ScrollEvent {
  readonly dataset: Options = {
    classStart: "uiScrollClassStart",
    classEnd: "uiScrollClassEnd",
    duration: "uiScrollDuration",
    _step: "uiScrollStep",
  };
  private windowSize = 0;
  private oldScrollPosition = -1;
  public elements: HTMLElement[];

  private direction = Direction.Y;
  private size = Size.Y;

  constructor({ selector }: { selector: string }) {
    this.elements = this.getElements(selector);
    this.windowSize = this.getWindowSize();
    this.addGlobalEvent();
  }
  private get index() {
    const number = this.elements.findIndex(
      (x) => x.getBoundingClientRect()[this.direction] > this.windowSize
    );
    return number === -1 ? this.elements.length : number;
  }
  private getElementDataset(x: HTMLElement, keyword: OptionKey) {
    return x.dataset[this.dataset[keyword]] || "";
  }
  private getElements(selector: string) {
    return Array.prototype.slice
      .call(document.querySelectorAll(selector))
      .sort(
        (a, b) =>
          a.getBoundingClientRect()[this.direction] -
          b.getBoundingClientRect()[this.direction]
      );
  }

  private getWindowSize() {
    return this.direction === Direction.Y
      ? window.outerHeight
      : window.outerWidth;
  }

  private getScrollDownElements() {
    return this.elements.filter(
      (x) =>
        this.getElementDataset(x, OptionKey.classStart) &&
        x.getBoundingClientRect()[this.direction] < this.windowSize &&
        !x.classList.contains(this.getElementDataset(x, OptionKey.classStart))
    );
  }
  private getScrollDurationElements() {
    return this.elements
      .map((x) => ({
        x: x,
        duration: this.getElementDataset(x, OptionKey.duration),
        rect: x.getBoundingClientRect(),
      }))
      .filter(
        ({ x, duration, rect }) =>
          duration &&
          rect[this.direction] < this.windowSize &&
          x.dataset[this.dataset[OptionKey._step]] !== "100"
      );
  }
  private getDownElements() {
    return this.elements.filter(
      (x) =>
        this.getElementDataset(x, OptionKey.classEnd) &&
        x.getBoundingClientRect()[this.direction] < 0 &&
        !x.classList.contains(this.getElementDataset(x, OptionKey.classEnd))
    );
  }

  private getScrollUpElements() {
    return this.elements.filter(
      (x) =>
        this.getElementDataset(x, OptionKey.classStart) &&
        x.getBoundingClientRect()[this.direction] > this.windowSize &&
        x.classList.contains(this.getElementDataset(x, OptionKey.classStart))
    );
  }
  private getDurationElements() {
    return this.elements
      .map((x) => ({
        x: x,
        duration: this.getElementDataset(x, OptionKey.duration),
        rect: x.getBoundingClientRect(),
      }))
      .filter(
        ({ x, duration, rect }) =>
          duration &&
          rect[this.direction] > 0 &&
          x.dataset[this.dataset[OptionKey._step]] !== "0"
      );
  }
  private getUpElements() {
    return this.elements.filter(
      (x) =>
        this.getElementDataset(x, OptionKey.classEnd) &&
        x.getBoundingClientRect()[this.direction] > 0 &&
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
  private onNext() {
    this.getScrollDownElements().map((x) => {
      x.classList.add(this.getElementDataset(x, OptionKey.classStart));
    });
    this.getScrollDurationElements().map(({ x, rect }) => {
      let level = Math.ceil(
        ((rect.y - this.windowSize) / this.windowSize) * -100
      );
      if (level < 0) level = 0;
      if (level > 100) level = 100;
      x.dataset[this.dataset[OptionKey._step]] = level.toString();
    });
    this.getDownElements().map((x) => {
      x.classList.add(this.getElementDataset(x, OptionKey.classEnd));
    });
  }
  private onPrev() {
    this.getScrollUpElements().map((x) => {
      x.classList.remove(this.getElementDataset(x, OptionKey.classStart));
    });
    this.getDurationElements().map(({ x, rect }) => {
      let level = Math.ceil(
        ((rect.y - this.windowSize) / this.windowSize) * -100
      );
      console.log(level, "djaklwdkjawd");
      if (level < 0) level = 0;
      if (level > 100) level = 100;
      x.dataset[this.dataset[OptionKey._step]] = level.toString();
    });
    this.getUpElements().map((x) => {
      x.classList.remove(this.getElementDataset(x, OptionKey.classEnd));
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
  private onResize() {
    this.windowSize = this.getWindowSize();
  }
  private addGlobalEvent() {
    window.removeEventListener("scroll", this.onScroll.bind(this));
    window.addEventListener("scroll", this.onScroll.bind(this));
    window.removeEventListener("resize", this.onResize.bind(this));
    window.addEventListener("resize", this.onResize.bind(this));
  }
}
