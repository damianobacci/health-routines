import { useState, useRef } from "react";
import classes from "./NewCountdown.module.css";

const NewCountdown = (props) => {
  const [isFormValid, setIsFormValid] = useState(true);

  const name = useRef();
  const time = useRef();

  const formSetHandler = (event) => {
    event.preventDefault();
    let enteredName = name.current.value;
    let enteredTime = +time.current.value;
    if (!enteredName || !enteredTime) {
      setIsFormValid(false);
      return;
    }
    props.onAddTimer({
      id: Math.random().toString(),
      title: enteredName,
      timeSet: enteredTime,
    });
    setIsFormValid(true);
    name.current.value = "";
    time.current.value = "";
  };

  return (
    <div className={classes.counter}>
      <h2 className={classes.title}>Add your personalized countdown</h2>
      <form onSubmit={formSetHandler}>
        <label className={classes.label} htmlFor="name">
          Name of the new countdown
        </label>
        <input
          className={isFormValid ? classes.input : classes.error}
          id="name"
          type="text"
          placeholder="Name"
          ref={name}
        />
        <br />
        <label className={classes.label} htmlFor="minutes">
          Time in minutes (max 60 minutes)
        </label>
        <input
          className={isFormValid ? classes.input : classes.error}
          id="minutes"
          type="number"
          step="1"
          max="60"
          min="1"
          placeholder="1"
          ref={time}
        />
        <br />
        <button className={classes["button-primary"]} type="submit">
          Set
        </button>
      </form>
    </div>
  );
};

export default NewCountdown;
