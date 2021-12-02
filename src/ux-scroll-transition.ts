import Scroll, { Props } from "./scroll";
export default class UxScrollTransition extends Scroll {
  constructor(props: Props) {
    super({
      ...props,
      commonOptions: {
        starting: "ux__transition--animated",
        ending: "ux__transition--animated",
        endMargin: "-1",
        ...props.commonOptions,
      },
    });
  }
  onNextStarting(index: number): true {
    this.elements[index].classList.add(this.options[index].starting);
    return true;
  }
  onPrevEnding(index: number): true {
    this.elements[index].classList.remove(this.options[index].starting);
    return true;
  }
}
