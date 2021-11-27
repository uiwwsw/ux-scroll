import ScrollEvent, { OptionKey } from "./scroll-event";

export default class CountingNumber extends ScrollEvent {
  constructor({ selector }: { selector: string }) {
    super({ selector });
  }
  public onNextDutation(x: HTMLElement, y: number) {
    x.dataset[this.dataset[OptionKey.step]] = ScrollEvent.getLevel(y);
  }
  public onPrevDutation(x: HTMLElement, y: number) {
    x.dataset[this.dataset[OptionKey.step]] = ScrollEvent.getLevel(y);
  }
}
