export declare type TEasing = (time: number) => number;
export declare type TEasingName = "linear" | "quadratic" | "cubic" | "elastic" | "inQuad" | "outQuad" | "inOutQuad" | "inCubic" | "outCubic" | "inOutCubic" | "inQuart" | "outQuart" | "inOutQuart" | "inQuint" | "outQuint" | "inOutQuint" | "inSine" | "outSine" | "inOutSine" | "inExpo" | "outExpo" | "inOutExpo" | "inCirc" | "outCirc" | "inOutCirc";
export declare type TEasingMap = {
    [easing in TEasingName]: TEasing;
};
declare const easingsFunctions: TEasingMap;
export default easingsFunctions;
