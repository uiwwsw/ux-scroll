import Scroll, { IndexOption, Props } from "./scroll";
interface PropsExtends extends Props {
    callbacks: IndexOption<Function>;
}
export interface CallbackProps {
    status: string;
    index: number;
    step: number;
    element: HTMLElement;
}
export declare type Callback = (props: CallbackProps) => true | void;
export default class UxScrollCallback extends Scroll {
    #private;
    constructor(props: PropsExtends);
    static getStep(level: number): number;
    onStarting(index: number): true | void;
    onDoing(index: number): true | void;
    onEnding(index: number): true | void;
}
export {};
