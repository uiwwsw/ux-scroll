import Scroll, { IndexOption, InputOption, Props } from "./scroll";
export interface InputOptionForCallback extends InputOption {
    startTopMargin?: string;
    endTopMargin?: string;
    startBottomMargin?: string;
    endBottomMargin?: string;
}
export interface PropsExtends extends Props {
    callbacks: IndexOption<Function>;
    commonOptions?: InputOptionForCallback;
    options?: IndexOption<InputOptionForCallback>;
}
export interface CallbackProps {
    scrollDirection: 0 | 1;
    status: string;
    index: number;
    step: number;
    element: HTMLElement;
}
export declare type Callback = (props: CallbackProps) => true | void;
export default class UxScrollCallback extends Scroll {
    #private;
    constructor(props: PropsExtends);
    onStarting(index: number): true | void;
    onDoing(index: number): true | void;
    onEnding(index: number): true | void;
}
