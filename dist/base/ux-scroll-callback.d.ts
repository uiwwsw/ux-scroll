import Scroll, { IndexOption, InputOption, OutputOption, Props } from "./scroll";
export declare type EasingName = "linear" | "easeInQuad" | "easeOutQuad" | "easeInOutQuad" | "easeInCubic" | "easeOutCubic" | "easeInOutCubic" | "easeInQuart" | "easeOutQuart" | "easeInOutQuart" | "easeInQuint" | "easeOutQuint" | "easeInOutQuint" | "easeInSine" | "easeOutSine" | "easeInOutSine" | "easeInExpo" | "easeOutExpo" | "easeInOutExpo" | "easeInCirc" | "easeOutCirc" | "easeInOutCirc" | "easeInBack" | "easeOutBack" | "easeInOutBack" | "easeInElastic" | "easeOutElastic" | "easeInOutElastic" | "easeInBounce" | "easeOutBounce" | "easeInOutBounce";
export interface InputOptionForCallback extends InputOption {
    startingFrame?: number;
    doingFrame?: number;
    endingFrame?: number;
    startingEasing?: EasingName;
    doingEasing?: EasingName;
    endingEasing?: EasingName;
}
export interface OutputOptionForCallback extends OutputOption {
    startingFrame: number;
    doingFrame: number;
    endingFrame: number;
    startingEasing: EasingName;
    doingEasing: EasingName;
    endingEasing: EasingName;
}
export interface PropsExtends extends Props<InputOptionForCallback> {
    callbacks: IndexOption<Callback>;
}
export interface CallbackProps {
    scrollDirection: 0 | 1;
    status: string;
    index: number;
    step: number;
    element: HTMLElement;
}
export declare type Callback = (props: CallbackProps) => true | void;
export default class UxScrollCallback extends Scroll<InputOptionForCallback> {
    #private;
    protected options: OutputOptionForCallback[];
    constructor(props: PropsExtends);
    onStarting(index: number): true | void;
    onDoing(index: number): true | void;
    onEnding(index: number): true | void;
}
