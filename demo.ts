import { Callback100, ClassTransition } from ".";
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

new Callback100({
  selector: ".ux",
  options: {
    11: {
      marginStart: "1",
    },
  },
  callbacks: {
    10: ({ x, step, i }) => {
      //   const [div1, div2] = x.children;
      //   div1.setAttribute("style", `transform: translate(${step - 100}vw, 0)`);
      //   div2.setAttribute("style", `transform: translate(${100 - step}vw, 0)`);
      //   //   const deg = Math.ceil(step * 3.6);
      //   console.log(x.children);
    },
    11: ({ x, step, i }) => {
      const deg = Math.ceil(step * 3.6);
      x.setAttribute("style", `transform: rotate(${deg}deg)`);
    },
    12: ({ x, step, i }) => {
      const deg = Math.ceil(step * 3.6);
      x.setAttribute("style", `transform: rotate(${deg}deg)`);
    },
  },
});
