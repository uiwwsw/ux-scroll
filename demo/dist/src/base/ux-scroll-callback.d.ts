import Scroll, { IndexOption, InputOption, OutputOption, Props } from "./scroll";
import { TEasingName } from "../utils/easing";
export interface InputOptionForCallback extends InputOption {
    startingFrame?: number;
    doingFrame?: number;
    endingFrame?: number;
    startingEasing?: TEasingName;
    doingEasing?: TEasingName;
    endingEasing?: TEasingName;
}
export interface OutputOptionForCallback extends OutputOption {
    startingFrame: number;
    doingFrame: number;
    endingFrame: number;
    startingEasing: TEasingName;
    doingEasing: TEasingName;
    endingEasing: TEasingName;
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
