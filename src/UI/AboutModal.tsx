import classes from "./AboutModal.module.css";

export default function AboutModal({ onClose }) {
  return (
    <div className={classes.backdrop}>
      <div className={classes["result-modal"]}>
        <h2>About this app</h2>
        <p>
          <strong>Remembrify</strong> is a Single Page Application made in React
          as a portfolio project.
        </p>
        <p>
          It uses <strong>LocalStorage</strong> to save the countdown data, so
          the data will be lost when you clean your browser data.
        </p>
        <p>
          There is a Reddit thread if you want to provide feedback to improve
          the project.
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
