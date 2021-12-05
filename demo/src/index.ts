// import { UxScrollCallback, UxScrollTransition } from "ux-scroll";
import "./styles/styles.scss";
import uiwwsw from "./uiwwsw";
import transition from "./transition";
import callback from "./callback";
import counting from "./counting";

window.onscroll = () => {
  uiwwsw.onScroll();
  transition.onScroll();
  callback.onScroll();
  counting.onScroll();
};
window.onresize = () => {
  uiwwsw.onResize();
  transition.onResize();
  callback.onResize();
  counting.onResize();
};
