import Scroll, { IndexOption, InputOption, OutputOption, Props } from "./scroll";
export interface InputOptionForCallback extends InputOption {
    startingFrame?: number;
    doingFrame?: number;
    endingFrame?: number;
}
export interface OutputOptionForCallback extends OutputOption {
    startingFrame: number;
    doingFrame: number;
    endingFrame: number;
}
export interface PropsExtends extends Props {
    callbacks: IndexOption<Callback>;
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
    protected options: OutputOptionForCallback[];
    constructor(props: PropsExtends);
    onStarting(index: number): true | void;
    onDoing(index: number): true | void;
    onEnding(index: number): true | void;
}
