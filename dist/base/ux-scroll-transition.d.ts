import Scroll, { InputOption, Props } from "./scroll";
export default class UxScrollTransition extends Scroll<InputOption> {
    constructor(props: Props<InputOption>);
    onStarting(index: number): true;
}
