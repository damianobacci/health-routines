import React, { useState, useEffect } from "react";
import alarm from "../assets/alarm.wav";
import classes from "./Countdown.module.css";

const Countdown = (props) => {
  const [timeInSeconds, setTimeInSeconds] = useState(props.timeSet);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Reference to the audio element
  const audioRef = React.useRef(null);

  useEffect(() => {
    let timerId;

    if (isActive && !isPaused && timeInSeconds > 0) {
      timerId = setInterval(() => {
        setTimeInSeconds((time) => time - 1);
      }, 1000);
    } else if (!timeInSeconds || !isActive || isPaused) {
      clearInterval(timerId);
    }

    // Play the audio when the timer reaches 0
    if (timeInSeconds === 0 && isActive) {
      audioRef.current.play();
    }

    return () => clearInterval(timerId);
  }, [timeInSeconds, isActive, isPaused]);

  useEffect(() => {
    if (props.globalAction === "start") {
      setIsActive(true);
      setIsPaused(false);
    } else if (props.globalAction === "stop") {
      setIsPaused(true);
    } else if (props.globalAction === "reset") {
      setIsActive(false);
      setIsPaused(false);
      setTimeInSeconds(props.timeSet);
    }
  }, [props.globalAction, props.timeSet]);

  let hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
  let minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  let seconds = String(timeInSeconds % 60).padStart(2, "0");

  const startCountdown = () => setIsActive(true);
  const pauseCountdown = () => setIsPaused((prevState) => !prevState);
  const resetCountdown = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeInSeconds(props.timeSet);
    // Ensure audio is paused and reset to start when resetting the timer
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div className={classes.counter}>
      <h2>{props.title}</h2>
      <h3>{`${hours}:${minutes}:${seconds}`}</h3>
      <button
        className={classes["button-primary"]}
        onClick={startCountdown}
        disabled={isActive && !isPaused}
      >
        ▶️
      </button>
      <button
        className={classes["button-primary"]}
        onClick={pauseCountdown}
        disabled={!isActive}
      >
        Pause/Resume
      </button>
      <button className={classes["button-primary"]} onClick={resetCountdown}>
        Reset
      </button>
      <button className={classes["button-delete"]} onClick={props.onDelete}>
        Delete
      </button>
      <audio ref={audioRef} src={alarm} preload="auto"></audio>
    </div>
  );
};

export default Countdown;
