import { forwardRef } from "react";
import classes from "./AboutModal.module.css";

const AboutModal = forwardRef(function AboutModal(props, ref) {
  return (
    <dialog className={classes["result-modal"]} ref={ref}>
      <h2>About this app</h2>
      <p>
        <strong>Remembrify</strong> is a Single Page Application made in React
        as a portfolio project.
        <p>
          It uses <strong>LocalStorage</strong> to save the countdown data, so
          the data will be lost when you clean your browser data.
        </p>
        There is a Reddit thread if you want to provide feedback to improve the
        project.
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default AboutModal;
