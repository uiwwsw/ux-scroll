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
      doingFrame: 200,
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
      const img = content.children[0] as HTMLImageElement;
      const text = content.children[1] as HTMLElement;
      switch (status) {
        case "starting":
          break;
        case "doing":
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
