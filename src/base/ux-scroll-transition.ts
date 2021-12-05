import Scroll, { Props } from "./scroll";
export default class UxScrollTransition extends Scroll {
  constructor(props: Props) {
    super({
      ...props,
      commonOptions: {
        starting: "ux__transition--animated",
        startTopMargin: ".2",
        startBottomMargin: "-1",
        ...props.commonOptions,
      },
    });
  }
  onStarting(index: number): true {
    if (this.scrollDirection) {
      this.elements[index].classList.add(this.options[index].starting);
    } else {
      this.elements[index].classList.remove(this.options[index].starting);
    }
    return true;
  }
}
