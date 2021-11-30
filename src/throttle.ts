export default function (fn: Function, wait: number) {
  let inThrottle: any;
  return function (...arg: any) {
    if (inThrottle) return;
    inThrottle = setTimeout(() => {
      fn.call(this, arg);
      inThrottle = false;
    }, wait);
  };
}
