import { Callback100, ClassTransition } from ".";

const a = new ClassTransition({
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

// const a = new Callback100({
//   selector: ".test",
//   options: {
//     10: {},
//   },
//   callbacks: {
//     10: ({ x, step, i }) => {
//       x.setAttribute("style", `transform: rotate(${step * 3.6}deg)`);
//     },
//     11: ({ x, step, i }) => {
//       x.setAttribute("style", `transform: rotate(${step * 3.6}deg)`);
//     },
//     12: ({ x, step, i }) => {
//       x.setAttribute("style", `transform: rotate(${step * 3.6}deg)`);
//     },
//   },
// });
