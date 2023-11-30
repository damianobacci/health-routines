import { forwardRef } from "react";
import classes from "./AboutModal.module.css";

const AboutModal = forwardRef(function AboutModal(props, ref) {
  return (
    <dialog className={classes["result-modal"]} ref={ref}>
      <h2>About this app</h2>
      <p>About text</p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default AboutModal;
