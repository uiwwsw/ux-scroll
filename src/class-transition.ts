import Scroll, { InputOption, InputOptions } from "./scroll";
export default class ClassTransition extends Scroll {
  constructor({
    selector,
    commonOptions,
    options,
  }: {
    selector: string;
    commonOptions?: InputOption;
    options?: InputOptions;
  }) {
    super({ selector, options, commonOptions });
  }
  public onNextStart(x: HTMLElement, i: number) {
    x.classList.add(this.options[i].classStart);
  }
  public onNextEnd(x: HTMLElement, i: number) {
    x.classList.add(this.options[i].classEnd);
  }
  public onPrevStart(x: HTMLElement, i: number) {
    x.classList.remove(this.options[i].classStart);
  }
  public onPrevEnd(x: HTMLElement, i: number) {
    x.classList.remove(this.options[i].classEnd);
  }
}
