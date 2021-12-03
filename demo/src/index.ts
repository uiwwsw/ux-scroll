// import { UxScrollCallback, UxScrollTransition } from "ux-scroll";
import "./styles/styles.scss";
import { UxScrollCallback, UxScrollTransition } from "../../src/base";

const d = new UxScrollCallback({
  selector: ".uiwwsw-demo__ux-scroll",
  callbacks: {
    0: ({
      scrollDirection,
      status,
      index,
      step,
      element,
    }: {
      scrollDirection: number;
      status: string;
      index: number;
      step: number;
      element: HTMLElement;
    }) => {
      if (status === "starting" && step === 1000 && scrollDirection) {
        element.classList.add("started");
      }
      if (status === "doing" && step === 0 && !scrollDirection) {
        element.classList.remove("started");
      }
      // if (status === "starting" && step === 1000) {
      //   if (scrollDirection) element.classList.add("started");
      //   else element.classList.remove("started");
      // }
      if (status === "doing") {
        const children = element.children[0].children[0];
        const img = children.children[0];
        if (step > 200) {
          const [p1, p2, p3, p4] = children.children[1].children;
          if (step > 400) {
            p1.setAttribute("style", "font-weight: bold");
            p2.setAttribute("style", "font-weight: normal");
            p3.setAttribute("style", "font-weight: normal");
            p4.setAttribute("style", "font-weight: normal");
          }
          if (step > 600) {
            p1.setAttribute("style", "font-weight: normal");
            p2.setAttribute("style", "font-weight: bold");
            p3.setAttribute("style", "font-weight: normal");
            p4.setAttribute("style", "font-weight: normal");
          }
          if (step > 750) {
            p1.setAttribute("style", "font-weight: normal");
            p2.setAttribute("style", "font-weight: normal");
            p3.setAttribute("style", "font-weight: bold");
            p4.setAttribute("style", "font-weight: normal");
          }
          if (step > 820) {
            p1.setAttribute("style", "font-weight: normal");
            p2.setAttribute("style", "font-weight: normal");
            p3.setAttribute("style", "font-weight: normal");
            p4.setAttribute("style", "font-weight: bold");
          }
        }
        if (!img.classList.contains("done")) {
          const scale = 200 - step;
          children.children[0].setAttribute("style", `width: ${scale}%;`);
          if (300 > step && step > 200) {
            img.classList.add("done");
            children.children[1].setAttribute("style", `opacity: 1`);
            children.children[0].setAttribute(
              "style",
              `transform: scale(0.32);`
            );
          }
        } else {
          if (step < 200) {
            img.classList.remove("done");
            children.children[1].setAttribute("style", `opacity: 0`);
          }
        }
      }
    },
  },
});
const c = new UxScrollCallback({
  selector: ".ux__counting",
  callbacks: {
    0: ({
      scrollDirection,
      status,
      index,
      step,
      element,
    }: {
      scrollDirection: number;
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
      scrollDirection,
      status,
      index,
      step,
      element,
    }: {
      scrollDirection: number;
      status: string;
      index: number;
      step: number;
      element: HTMLElement;
    }) => {
      console.log(status);
      element.setAttribute(status, step.toString());
    },
    1: ({
      scrollDirection,
      status,
      index,
      step,
      element,
    }: {
      scrollDirection: number;
      status: string;
      index: number;
      step: number;
      element: HTMLElement;
    }) => {
      element.setAttribute(status, step.toString());
    },
    2: ({
      scrollDirection,
      status,
      index,
      step,
      element,
    }: {
      scrollDirection: number;
      status: string;
      index: number;
      step: number;
      element: HTMLElement;
    }) => {
      element.setAttribute(status, step.toString());
    },
    3: ({
      scrollDirection,
      status,
      index,
      step,
      element,
    }: {
      scrollDirection: number;
      status: string;
      index: number;
      step: number;
      element: HTMLElement;
    }) => {
      element.setAttribute(status, step.toString());
    },
    4: ({
      scrollDirection,
      status,
      index,
      step,
      element,
    }: {
      scrollDirection: number;
      status: string;
      index: number;
      step: number;
      element: HTMLElement;
    }) => {
      element.setAttribute(status, step.toString());
    },
    5: ({
      scrollDirection,
      status,
      index,
      step,
      element,
    }: {
      scrollDirection: number;
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
  d.onScroll();
};
window.onresize = () => {
  a.onResize();
  b.onResize();
  c.onResize();
  d.onResize();
};
