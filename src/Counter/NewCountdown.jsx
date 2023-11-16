import { useState } from "react";
import classes from "./NewCountdown.module.css";

const NewCountdown = (props) => {
  const [enteredValues, setEnteredValues] = useState({
    name: "",
    time: "",
  });

  const [didEdit, setDidEdit] = useState({
    name: false,
    time: false,
  });

  const handleInputBlur = (identifier) => {
    setDidEdit((prevValues) => ({
      ...prevValues,
      [identifier]: true,
    }));
  };

  const handleInputChange = (identifier, value) => {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  };

  const formSetHandler = (event) => {
    event.preventDefault();
    let enteredName = enteredValues.name;
    let enteredTime = +enteredValues.time;
    if (!enteredName || !enteredTime) {
      if (!enteredName) {
        setDidEdit((prevValues) => ({
          ...prevValues,
          name: true,
        }));
      }
      if (!enteredTime) {
        setDidEdit((prevValues) => ({
          ...prevValues,
          time: true,
        }));
      }
      return;
    }

    props.onAddTimer({
      id: Math.random().toString(),
      title: enteredName,
      timeSet: enteredTime,
    });
    event.target.reset();
  };

  return (
    <div className={classes.counter}>
      <h2 className={classes.title}>Add your personalized countdown</h2>
      <form onSubmit={formSetHandler}>
        <label className={classes.label} htmlFor="name">
          Name of the new countdown
        </label>
        <input
          className={
            !didEdit.name || enteredValues.name ? classes.input : classes.error
          }
          id="name"
          type="text"
          placeholder="Name"
          onChange={(event) => handleInputChange("name", event.target.value)}
          onBlur={() => handleInputBlur("name")}
        />
        {didEdit.name && !enteredValues.name && (
          <p className={classes.errorText}> A name is required</p>
        )}
        <br />
        <label className={classes.label} htmlFor="minutes">
          Time in minutes (max 240 minutes)
        </label>
        <input
          className={
            !didEdit.time || enteredValues.time ? classes.input : classes.error
          }
          id="minutes"
          type="number"
          step="1"
          min="1"
          max="240"
          placeholder="1"
          onChange={(event) => handleInputChange("time", event.target.value)}
          onBlur={() => handleInputBlur("time")}
        />
        {didEdit.time && !enteredValues.time && (
          <p className={classes.errorText}> A time is required</p>
        )}
        <br />
        <button className={classes["button-primary"]} type="submit">
          Set
        </button>
      </form>
    </div>
  );
};

export default NewCountdown;
