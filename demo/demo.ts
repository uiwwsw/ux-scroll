import { UxScrollCallback, UxScrollTransition } from "..";

const c = new UxScrollCallback({
  selector: ".ux__counting",
  callbacks: {
    0: ({
      status,
      index,
      step,
      element,
    }: {
      status: string;
      index: number;
      step: number;
      element: HTMLElement;
    }) => {
      if (status !== "doing") return;
      const test = document.getElementById("test") as HTMLInputElement;

      const children = element.children;
      const numberElement = children[0].children;
      const number = (step * Number(test.value)) / 100;
      const c1 = Math.floor(number % 10).toString();
      const c2 = Math.floor((number / 10) % 10).toString();
      const c3 = Math.floor((number / 100) % 10).toString();
      const c4 = Math.floor((number / 1000) % 10).toString();
      numberElement[0].setAttribute("data-value", c4);
      numberElement[1].setAttribute("data-value", c3);
      numberElement[2].setAttribute("data-value", c2);
      numberElement[3].setAttribute("data-value", c1);
    },
  },
});
const b = new UxScrollCallback({
  // throttleTimer: 100,
  selector: ".ux__sticky",
  callbacks: {
    0: ({
      status,
      index,
      step,
      element,
    }: {
      status: string;
      index: number;
      step: number;
      element: HTMLElement;
    }) => {
      element.setAttribute(status, step.toString());
    },
    1: ({
      status,
      index,
      step,
      element,
    }: {
      status: string;
      index: number;
      step: number;
      element: HTMLElement;
    }) => {
      element.setAttribute(status, step.toString());
    },
    2: ({
      status,
      index,
      step,
      element,
    }: {
      status: string;
      index: number;
      step: number;
      element: HTMLElement;
    }) => {
      element.setAttribute(status, step.toString());
    },
    3: ({
      status,
      index,
      step,
      element,
    }: {
      status: string;
      index: number;
      step: number;
      element: HTMLElement;
    }) => {
      element.setAttribute(status, step.toString());
    },
    4: ({
      status,
      index,
      step,
      element,
    }: {
      status: string;
      index: number;
      step: number;
      element: HTMLElement;
    }) => {
      element.setAttribute(status, step.toString());
    },
    5: ({
      status,
      index,
      step,
      element,
    }: {
      status: string;
      index: number;
      step: number;
      element: HTMLElement;
    }) => {
      element.setAttribute(status, step.toString());
    },
  },
});

const a = new UxScrollTransition({
  selector: ".ux__transition",
});

window.onscroll = () => {
  a.onScroll();
  b.onScroll();
  c.onScroll();
};
window.onresize = () => {
  a.onResize();
  b.onResize();
  c.onResize();
};
