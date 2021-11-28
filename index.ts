import ClassTransition from "./src/class-transition";
import "./styles.scss";
export { ClassTransition };

const a = new ClassTransition({
  selector: ".test",
  commonOptions: {
    classStart: "test11",
    classEnd: "test132313121",
  },
  options: {
    13: {
      marginStart: "100px",
    },
    15: {
      classStart: "ux--fade-up",
      classEnd: "ux--fade-end",
    },
  },
});
