import { Callback, ClassTransition, CALLBACK_ENDED, CALLBACK_STARTED } from ".";
const ca = ({ x, step, i }: { x: HTMLElement; step: number; i: number }) => {
  if (step > 100) step = 100;
  if (step < 0) step = 0;
  x.setAttribute("style", `opacity: ${step / 100}`);
  if (step === 100) return CALLBACK_STARTED;
  if (step === 0) return CALLBACK_ENDED;
};
const b = new Callback({
  selector: ".ux",
  callbacks: {
    0: ({ x, step, i }: { x: HTMLElement; step: number; i: number }) => {
      ca({ x, step, i });
    },
    1: ({ x, step, i }: { x: HTMLElement; step: number; i: number }) => {
      ca({ x, step, i });
    },
    2: ({ x, step, i }: { x: HTMLElement; step: number; i: number }) => {
      ca({ x, step, i });
    },
    3: ({ x, step, i }: { x: HTMLElement; step: number; i: number }) => {
      ca({ x, step, i });
    },
    4: ({ x, step, i }: { x: HTMLElement; step: number; i: number }) => {
      ca({ x, step, i });
    },
    5: ({ x, step, i }: { x: HTMLElement; step: number; i: number }) => {
      ca({ x, step, i });
    },
  },
});
// const a = new ClassTransition({
//   selector: ".ux",
// });
