import { UxScrollCallback, UxScrollTransition } from "../../src/base";

const getContent = (element: HTMLElement) =>
  element.children[0].children[0] as HTMLElement;
const d = new UxScrollCallback({
  selector: ".uiwwsw-demo__ux-scroll",
  options: {
    0: {
      doingFrame: 200,
    },
    1: {
      doingFrame: 200,
      endingFrame: 100,
    },
    2: {
      doingFrame: 2000,
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
      const content = getContent(element);
      if (status === "doing") {
        if (step < 10) content.setAttribute("data-text", "d");
        else if (step > 11 && step < 20)
          content.setAttribute("data-text", "de");
        else if (step > 21 && step < 30)
          content.setAttribute("data-text", "dev");
        else if (step > 31 && step < 40)
          content.setAttribute("data-text", "deve");
        else if (step > 41 && step < 50)
          content.setAttribute("data-text", "devel");
        else if (step > 51 && step < 60)
          content.setAttribute("data-text", "develo");
        else if (step > 61 && step < 70)
          content.setAttribute("data-text", "develop");
        else if (step > 71 && step < 80)
          content.setAttribute("data-text", "develope");
        else if (step > 81 && step < 90)
          content.setAttribute("data-text", "developer");
        else if (step > 91 && step < 100)
          content.setAttribute("data-text", "develope");
        else if (step > 101 && step < 110)
          content.setAttribute("data-text", "develop");
        else if (step > 111 && step < 120)
          content.setAttribute("data-text", "develo");
        else if (step > 121 && step < 130)
          content.setAttribute("data-text", "uevelo");
        else if (step > 131 && step < 140)
          content.setAttribute("data-text", "uewelo");
        else if (step > 141 && step < 150)
          content.setAttribute("data-text", "ueweso");
        else if (step > 151 && step < 160)
          content.setAttribute("data-text", "uewesw");
        else if (step > 161 && step < 170)
          content.setAttribute("data-text", "uewwsw");
        else if (step > 171 && step < 180)
          content.setAttribute("data-text", "uiwwsw");
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
      const content = getContent(element);
      const img = content.children[0] as HTMLImageElement;
      const text = content.children[1] as HTMLElement;

      if (status === "starting") {
      }
      if (status === "doing") {
        if (!img.classList.contains("done")) {
          const reverseStep = 100 - step;
          img.dataset.width = reverseStep.toString();
          text.dataset.width = step.toString();
          if (step > 70) {
            img.classList.add("done");
            img.dataset.width = "30";
            text.dataset.width = "70";
          }
        } else {
          if (step < 70) {
            img.classList.remove("done");
          }
        }
        if (step < 149 && step > 125) {
          text.dataset.value = "1";
        }
        if (step < 174 && step > 150) {
          text.dataset.value = "2";
        }
        if (step < 199 && step > 175) {
          text.dataset.value = "3";
        }
      }
      if (status === "ending") {
        if (step > 10) {
          text.dataset.value = "4";
        }
      }
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
      //   const content = getContent(element);
      //   const reverseStep = 2001 - step;
      //   const reverseStep2 = (2000 - step) / 50;
      //   if (status === "doing") {
      //     content.setAttribute(
      //       "style",
      //       `transform:scale(${reverseStep}) translateY(-${reverseStep2}%)`
      //     );
      //   }
    },
  },
});

export default d;
