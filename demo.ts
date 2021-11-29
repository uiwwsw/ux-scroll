import { Callback, ClassTransition, LEVEL } from ".";
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
    10: ({ x, step, i }) => {},
    11: ({ x, step, i }) => {
      if (step > 100) step = 100;
      if (step < 0) step = 0;
      const [div1, div2] = x.children;
      div1.setAttribute("style", `transform: translate(${step - 100}vw, 0)`);
      div2.setAttribute("style", `transform: translate(${100 - step}vw, 0)`);
      if (step === 100) return LEVEL.START_DONE;
      if (step === 0) return LEVEL.END_DONE;
    },
    12: ({ x, step, i }) => {
      const deg = Math.ceil(step * 3.6);
      x.setAttribute("style", `transform: rotate(${deg}deg)`);
    },
  },
});
