import Scroll, { IndexOption, InputOption } from "./scroll";
export const CALLBACK_STARTED = Symbol("STARTED");
export const CALLBACK_ENDED = Symbol("ENDED");
// export symbol LEVEL = 'd' {
//   START_DONE = "START_DONE",
//   END_DONE = "END_DONE",
// }
export default class Callback extends Scroll {
  callbacks: IndexOption<Function>;
  constructor({
    selector,
    callbacks,
    commonOptions,
    options,
  }: {
    selector: string;
    callbacks: IndexOption<Function>;
    commonOptions?: InputOption;
    options?: IndexOption<InputOption>;
  }) {
    commonOptions = {
      classStart: "ux__callback--end",
      classEnd: "ux__callback--start",
      ...commonOptions,
    };
    super({ selector, options, commonOptions });
    this.callbacks = callbacks;
  }
  private getLevel(y: number) {
    return Math.ceil(((Scroll.startPosition - y) * 100) / Scroll.windowSize);
  }
  public onNextStart({ x, y, i }: { x: HTMLElement; y: number; i: number }) {
    const fn = this.callbacks[i];
    const step = this.getLevel(y);
    const res = fn && fn({ x, step, i });
    !x.classList.contains(this.options[i].classEnd) &&
      x.classList.add(this.options[i].classEnd);
    if (res === CALLBACK_STARTED) x.classList.add(this.options[i].classStart);
  }
  public onPrevEnd({ x, y, i }: { x: HTMLElement; y: number; i: number }) {
    const fn = this.callbacks[i];
    const step = this.getLevel(y);
    const res = fn && fn({ x, step, i });
    x.classList.contains(this.options[i].classStart) &&
      x.classList.remove(this.options[i].classStart);
    if (res === CALLBACK_ENDED) x.classList.remove(this.options[i].classEnd);
  }
}
