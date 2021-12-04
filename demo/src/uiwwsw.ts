import { UxScrollCallback, UxScrollTransition } from "../../src/base";

const d = new UxScrollCallback({
  selector: ".uiwwsw-demo__ux-scroll",
  options: {
    0: {
      doingFrame: 200,
      endingFrame: 100,
    },
  },
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
      element.setAttribute(status, step.toString());
      const children = element.children[0].children[0];
      const img = children.children[0];
      const [p1, p2, p3, p4] = children.children[1].children;

      if (status === "starting" && step === 1000 && scrollDirection) {
        element.classList.add("started");
      }
      if (status === "doing" && step === 0 && !scrollDirection) {
        element.classList.remove("started");
      }
      if (status === "doing" && step === 200 && scrollDirection) {
        element.classList.add("ended");
      }
      if (status === "ending" && step === 0 && !scrollDirection) {
        element.classList.remove("ended");
      }
      // if (status === "starting" && step === 1000) {
      //   if (scrollDirection) element.classList.add("started");
      //   else element.classList.remove("started");
      // }
      if (status === "doing") {
        if (!img.classList.contains("done")) {
          const reverseStep = 100 - step;
          img.setAttribute("style", `width: ${reverseStep}%;`);
          if (step > 70) {
            img.classList.add("done");
            children.children[1].setAttribute("style", `display: block;`);
            img.setAttribute("style", `width: 30%; background: #363638;`);
          }
        } else {
          if (step < 70) {
            img.classList.remove("done");
            children.children[1].setAttribute("style", `display: none`);
            img.setAttribute("style", `background: none;`);
          }
        }
        if (step > 125) {
          p1.setAttribute("style", "font-weight: bold");
          p2.setAttribute("style", "font-weight: normal");
          p3.setAttribute("style", "font-weight: normal");
          p4.setAttribute("style", "font-weight: normal");
        }
        if (step > 150) {
          p1.setAttribute("style", "font-weight: normal");
          p2.setAttribute("style", "font-weight: bold");
          p3.setAttribute("style", "font-weight: normal");
          p4.setAttribute("style", "font-weight: normal");
        }
        if (step > 175) {
          p1.setAttribute("style", "font-weight: normal");
          p2.setAttribute("style", "font-weight: normal");
          p3.setAttribute("style", "font-weight: bold");
          p4.setAttribute("style", "font-weight: normal");
        }
      }
      if (status === "ending") {
        // img.setAttribute("style", `opacity: ${(100 - step) / 100}`);
        if (step > 10) {
          p1.setAttribute("style", "font-weight: normal");
          p2.setAttribute("style", "font-weight: normal");
          p3.setAttribute("style", "font-weight: normal");
          p4.setAttribute("style", "font-weight: bold");
        }
      }
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
  },
});

export default d;
