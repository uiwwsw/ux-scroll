import { UxScrollCallback, UxScrollTransition } from "../../src/base";

const getContent = (element: HTMLElement) =>
  element.children[0].children[0] as HTMLElement;
const d = new UxScrollCallback({
  selector: ".uiwwsw-demo__ux-scroll",
  options: {
    0: {
      doingFrame: 17,
    },
    1: {
      doingFrame: 89,
      endingFrame: 100,
    },
    2: {
      doingFrame: 20,
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
      switch (status) {
        case "doing":
          switch (step) {
            case 1:
              content.textContent = "de";
              break;
            case 2:
              content.textContent = "dev";
              break;
            case 3:
              content.textContent = "deve";
              break;
            case 4:
              content.textContent = "devel";
              break;
            case 5:
              content.textContent = "develo";
              break;
            case 6:
              content.textContent = "develop";
              break;
            case 7:
              content.textContent = "develope";
              break;
            case 8:
              content.textContent = "developer";
              break;
            case 9:
              content.textContent = "develope";
              break;
            case 10:
              content.textContent = "develop";
              break;
            case 11:
              content.textContent = "develo";
              break;
            case 12:
              content.textContent = "uevelo";
              break;
            case 13:
              content.textContent = "uewelo";
              break;
            case 14:
              content.textContent = "ueweso";
              break;
            case 15:
              content.textContent = "uewesw";
              break;
            case 16:
              content.textContent = "uewwsw";
              break;
            case 17:
              content.textContent = "uiwwsw";
              break;
            default:
              content.textContent = "d";
              break;
          }
          break;
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
      const imgEl = content.children[0] as HTMLImageElement;
      const textEl = content.children[1] as HTMLElement;
      switch (status) {
        case "starting":
          break;
        case "doing":
          const reverseStep = (100 - step) / 100;
          if (step < 50) {
            imgEl.setAttribute(
              "style",
              `transform:matrix(${reverseStep},0,0,${reverseStep},0,0)`
            );
            textEl.setAttribute("style", `opacity: 0`);
          } else {
            textEl.setAttribute("style", `opacity: 1`);
            imgEl.setAttribute("style", `transform:matrix(.5,0,0,.5,0,0)`);
            if (step > 50 && step < 60) textEl.className = "text text1";
            if (step > 60 && step < 70) textEl.className = "text text2";
            if (step > 70 && step < 80) textEl.className = "text text3";
            if (step > 80 && step < 90) textEl.className = "text text4";
          }

          break;
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
      const content = getContent(element);
      const reverseStep = 21 - step;
      if (status === "doing") {
        content.setAttribute(
          "style",
          `transform:matrix(${reverseStep},0,0,${reverseStep},0,0)`
        );
      }
    },
  },
});

export default d;
