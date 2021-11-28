import Scroll, { IndexOption, InputOption } from "./scroll";
export default class Callback100 extends Scroll {
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
      classStart: "ux__callback-100--start",
      classEnd: "ux__callback-100--end",
      ...commonOptions,
    };
    super({ selector, options, commonOptions });
    this.callbacks = callbacks;
  }
  private getLevel(y: number) {
    let level = Math.ceil(
      ((Scroll.startPosition - y) * 100) / Scroll.windowSize
    );
    if (level < 0) level = 0;
    if (level > 100) level = 100;
    return level;
  }
  public onNextStart({ x, y, i }: { x: HTMLElement; y: number; i: number }) {
    const fn = this.callbacks[i];
    const step = this.getLevel(y);
    fn && fn({ x, step, i });
    !x.classList.contains(this.options[i].classEnd) &&
      x.classList.add(this.options[i].classEnd);
    if (step === 100) x.classList.add(this.options[i].classStart);
  }
  public onPrevEnd({ x, y, i }: { x: HTMLElement; y: number; i: number }) {
    const fn = this.callbacks[i];
    const step = this.getLevel(y);
    fn && fn({ x, step, i });
    x.classList.contains(this.options[i].classStart) &&
      x.classList.remove(this.options[i].classStart);
    if (step === 0) x.classList.remove(this.options[i].classEnd);
  }
}
