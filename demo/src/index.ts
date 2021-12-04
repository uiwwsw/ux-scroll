// import { UxScrollCallback, UxScrollTransition } from "ux-scroll";
import "./styles/styles.scss";
import uiwwsw from "./uiwwsw";
// const c = new UxScrollCallback({
//   selector: ".ux__counting",
//   callbacks: {
//     0: ({
//       scrollDirection,
//       status,
//       index,
//       step,
//       element,
//     }: {
//       scrollDirection: number;
//       status: string;
//       index: number;
//       step: number;
//       element: HTMLElement;
//     }) => {
//       if (status !== "doing") return;
//       const test = document.getElementById("test") as HTMLInputElement;

//       const children = element.children;
//       const numberElement = children[0].children;
//       const number = (step * Number(test.value)) / 100;
//       const c1 = Math.floor(number % 10).toString();
//       const c2 = Math.floor((number / 10) % 10).toString();
//       const c3 = Math.floor((number / 100) % 10).toString();
//       const c4 = Math.floor((number / 1000) % 10).toString();
//       numberElement[0].setAttribute("data-value", c4);
//       numberElement[1].setAttribute("data-value", c3);
//       numberElement[2].setAttribute("data-value", c2);
//       numberElement[3].setAttribute("data-value", c1);
//     },
//   },
// });
// const b = new UxScrollCallback({
//   // throttleTimer: 100,
//   selector: ".ux__sticky",
//   callbacks: {
//     0: ({
//       scrollDirection,
//       status,
//       index,
//       step,
//       element,
//     }: {
//       scrollDirection: number;
//       status: string;
//       index: number;
//       step: number;
//       element: HTMLElement;
//     }) => {
//       console.log(status);
//       element.setAttribute(status, step.toString());
//     },
//     1: ({
//       scrollDirection,
//       status,
//       index,
//       step,
//       element,
//     }: {
//       scrollDirection: number;
//       status: string;
//       index: number;
//       step: number;
//       element: HTMLElement;
//     }) => {
//       element.setAttribute(status, step.toString());
//     },
//     2: ({
//       scrollDirection,
//       status,
//       index,
//       step,
//       element,
//     }: {
//       scrollDirection: number;
//       status: string;
//       index: number;
//       step: number;
//       element: HTMLElement;
//     }) => {
//       element.setAttribute(status, step.toString());
//     },
//     3: ({
//       scrollDirection,
//       status,
//       index,
//       step,
//       element,
//     }: {
//       scrollDirection: number;
//       status: string;
//       index: number;
//       step: number;
//       element: HTMLElement;
//     }) => {
//       element.setAttribute(status, step.toString());
//     },
//     4: ({
//       scrollDirection,
//       status,
//       index,
//       step,
//       element,
//     }: {
//       scrollDirection: number;
//       status: string;
//       index: number;
//       step: number;
//       element: HTMLElement;
//     }) => {
//       element.setAttribute(status, step.toString());
//     },
//     5: ({
//       scrollDirection,
//       status,
//       index,
//       step,
//       element,
//     }: {
//       scrollDirection: number;
//       status: string;
//       index: number;
//       step: number;
//       element: HTMLElement;
//     }) => {
//       element.setAttribute(status, step.toString());
//     },
//   },
// });

// const a = new UxScrollTransition({
//   selector: ".ux__transition",
// });

window.onscroll = () => {
  uiwwsw.onScroll();
};
window.onresize = () => {
  uiwwsw.onResize();
};
