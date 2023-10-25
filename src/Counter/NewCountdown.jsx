import { useState } from "react";
import classes from "./NewCountdown.module.css";

const NewCountdown = (props) => {
  const formSetHandler = (event) => {
    event.preventDefault();
    let name = event.target.elements.name.value;
    let wantedTime = +event.target.elements.minutes.value;
    props.onAddTimer({
      id: Math.random().toString(),
      title: name,
      timeSet: wantedTime,
    });
  };

  return (
    <div className={classes.counter}>
      <h2 className={classes.title}>Add your personalized countdown</h2>
      <form onSubmit={formSetHandler}>
        <label className={classes.label} htmlFor="name">
          Name of the new countdown
        </label>
        <input
          className={classes.input}
          id="name"
          type="text"
          placeholder="Name"
        />
        <br />
        <label className={classes.label} htmlFor="minutes">
          Time in minutes (max 60 minutes)
        </label>
        <input
          className={classes.input}
          id="minutes"
          type="number"
          step="1"
          max="60"
          min="1"
          placeholder="1"
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
