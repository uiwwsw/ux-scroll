import { UxScrollCallback, UxScrollTransition } from "../../src/base";
const d = new UxScrollCallback({
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
      const number = (step / 999) * Number(test.value);
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

export default d;
