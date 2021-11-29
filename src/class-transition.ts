import Scroll, { IndexOption, InputOption } from "./scroll";
export default class ClassTransition extends Scroll {
  constructor({
    selector,
    commonOptions,
    options,
  }: {
    selector: string;
    commonOptions?: InputOption;
    options?: IndexOption<InputOption>;
  }) {
    commonOptions = {
      classStart: "ux__transition--animated",
      ...commonOptions,
    };
    super({ selector, options, commonOptions });
  }
  public onNextStart({ x, y, i }: { x: HTMLElement; y: number; i: number }) {
    x.classList.add(this.options[i].classStart);
  }
  public onNextEnd({ x, y, i }: { x: HTMLElement; y: number; i: number }) {
    x.classList.add(this.options[i].classEnd);
  }
  public onPrevStart({ x, y, i }: { x: HTMLElement; y: number; i: number }) {
    x.classList.remove(this.options[i].classStart);
  }
  public onPrevEnd({ x, y, i }: { x: HTMLElement; y: number; i: number }) {
    x.classList.remove(this.options[i].classEnd);
  }
}
