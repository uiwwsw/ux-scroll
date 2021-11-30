import {
  UxScrollCallback,
  UxScrollTransition,
  CALLBACK_UP_DONE,
  CALLBACK_DOWN_DONE,
} from ".";
const ca = ({ x, step, i }: { x: HTMLElement; step: number; i: number }) => {
  if (step > 100) step = 100;
  if (step < 0) step = 0;
  x.setAttribute("style", `opacity: ${step / 100}`);
  if (step === 100) return CALLBACK_DOWN_DONE;
  if (step === 0) return CALLBACK_UP_DONE;
};
const b = new UxScrollCallback({
  selector: ".ux",
  callbacks: {
    0: ({ x, step, i }: { x: HTMLElement; step: number; i: number }) => {
      return ca({ x, step, i });
    },
    1: ({ x, step, i }: { x: HTMLElement; step: number; i: number }) => {
      return ca({ x, step, i });
    },
    2: ({ x, step, i }: { x: HTMLElement; step: number; i: number }) => {
      return ca({ x, step, i });
    },
    3: ({ x, step, i }: { x: HTMLElement; step: number; i: number }) => {
      return ca({ x, step, i });
    },
    4: ({ x, step, i }: { x: HTMLElement; step: number; i: number }) => {
      return ca({ x, step, i });
    },
    5: ({ x, step, i }: { x: HTMLElement; step: number; i: number }) => {
      return ca({ x, step, i });
    },
  },
});
// const a = new UxScrollTransition({
//   selector: ".ux",
// });
