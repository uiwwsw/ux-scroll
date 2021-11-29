import { Callback, ClassTransition, CALLBACK_ENDED, CALLBACK_STARTED } from ".";
new ClassTransition({
  selector: ".ux",
  commonOptions: {
    classStart: "ux__animated",
  },
  options: {
    0: {
      marginStart: "1",
    },
  },
});

new Callback({
  selector: ".ux",
  options: {
    11: {
      marginStart: "1",
      marginEnd: "1",
    },
  },
  callbacks: {
    10: ({ x, step, i }: { x: HTMLElement; step: number; i: number }) => {},
    11: ({ x, step, i }: { x: HTMLElement; step: number; i: number }) => {
      if (step > 100) step = 100;
      if (step < 0) step = 0;
      const xChildren = x.children;
      xChildren[0].setAttribute(
        "style",
        `transform: translate(${step - 100}vw, 0)`
      );
      xChildren[1].setAttribute(
        "style",
        `transform: translate(${100 - step}vw, 0)`
      );
      if (step === 100) return CALLBACK_STARTED;
      if (step === 0) return CALLBACK_ENDED;
    },
    12: ({ x, step, i }: { x: HTMLElement; step: number; i: number }) => {
      const deg = Math.ceil(step * 3.6);
      x.setAttribute("style", `transform: rotate(${deg}deg)`);
    },
  },
});
