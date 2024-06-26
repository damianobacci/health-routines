import { useState } from "react";
import classes from "./NewCountdown.module.css";

type NewCountdownProps = {
  onAddTimer: (data: { id: number; title: string; timeSet: number }) => void;
};

export default function NewCountdown({ onAddTimer }: NewCountdownProps) {
  const [enteredValues, setEnteredValues] = useState({
    name: "",
    time: "",
  });

  const [didEdit, setDidEdit] = useState({
    name: false,
    time: false,
  });

  const [overTime, setOverTime] = useState<boolean | null>(null);

  const handleInputBlur = (identifier: string) => {
    setDidEdit((prevValues) => ({
      ...prevValues,
      [identifier]: true,
    }));
  };

  const handleInputChange = (identifier: string, value: string) => {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  };

  const formSetHandler = (event: React.FormEvent<HTMLFormElement>) => {
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
    if (enteredTime > 240) {
      setOverTime(true);
      return;
    }

    onAddTimer({
      id: Math.random(),
      title: enteredName,
      timeSet: enteredTime,
    });
    event.currentTarget.reset();
    setOverTime(false);
  };

  return (
    <div className={classes.counter}>
      <h2 className={classes.title}>Add your countdown</h2>
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
        {overTime && (
          <p className={classes.errorText}>
            Your time cannot be over 240 minutes.
          </p>
        )}
        <br />
        <button className={classes["button-primary"]} type="submit">
          Set
        </button>
      </form>
    </div>
  );
}
