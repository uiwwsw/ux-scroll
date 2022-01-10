export declare type TEasing = (time: number) => number;
export declare enum TEasingName {
    linear = "linear",
    quadratic = "quadratic",
    cubic = "cubic",
    elastic = "elastic",
    inQuad = "inQuad",
    outQuad = "outQuad",
    inOutQuad = "inOutQuad",
    inCubic = "inCubic",
    outCubic = "outCubic",
    inOutCubic = "inOutCubic",
    inQuart = "inQuart",
    outQuart = "outQuart",
    inOutQuart = "inOutQuart",
    inQuint = "inQuint",
    outQuint = "outQuint",
    inOutQuint = "inOutQuint",
    inSine = "inSine",
    outSine = "outSine",
    inOutSine = "inOutSine",
    inExpo = "inExpo",
    outExpo = "outExpo",
    inOutExpo = "inOutExpo",
    inCirc = "inCirc",
    outCirc = "outCirc",
    inOutCirc = "inOutCirc"
}
export declare type TEasingMap = {
    [easing in TEasingName]: TEasing;
};
declare const easingsFunctions: TEasingMap;
export default easingsFunctions;
