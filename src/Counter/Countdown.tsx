import React, { useState, useEffect } from "react";
import classes from "./Countdown.module.css";

const Countdown = (props) => {
  const [timeInSeconds, setTimeInSeconds] = useState(props.timeSet);
  const [isPlaying, setIsPlaying] = useState(false);

  // Reference to the audio element
  const audioRef = React.useRef(null);

  useEffect(() => {
    let timerId;

    if (isPlaying && timeInSeconds > 0) {
      timerId = setInterval(() => {
        setTimeInSeconds((time) => time - 1);
      }, 1000);
    } else if (!timeInSeconds || !isPlaying) {
      clearInterval(timerId);
    }

    // Play the audio when the timer reaches 0
    if (timeInSeconds === 0 && isPlaying) {
      audioRef.current.play();
    }

    return () => clearInterval(timerId);
  }, [timeInSeconds, isPlaying, props.audio]);

  useEffect(() => {
    if (props.globalAction === "start") {
      setIsPlaying(true);
      props.reset();
    } else if (props.globalAction === "stop") {
      setIsPlaying(false);
      props.reset();
    } else if (props.globalAction === "reset") {
      setIsPlaying(false);
      setTimeInSeconds(props.timeSet);
      props.reset();
    }
  }, [props.globalAction, props.timeSet]);

  let hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
  let minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  let seconds = String(timeInSeconds % 60).padStart(2, "0");

  const startCountdown = () => setIsPlaying(true);
  const pauseCountdown = () => setIsPlaying(false);
  const resetCountdown = () => {
    setIsPlaying(false);
    setTimeInSeconds(props.timeSet);
    // Ensure audio is paused and reset to start when resetting the timer
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div className={classes.counter}>
      <h2 className={classes.title}>{props.title}</h2>
      <h3 className={classes.time}>{`${hours}:${minutes}:${seconds}`}</h3>
      {isPlaying ? (
        <button className={classes["button-primary"]} onClick={pauseCountdown}>
          Stop
        </button>
      ) : (
        <button className={classes["button-primary"]} onClick={startCountdown}>
          Start
        </button>
      )}
      <button className={classes["button-primary"]} onClick={resetCountdown}>
        Reset
      </button>
      <button className={classes["button-delete"]} onClick={props.onDelete}>
        Delete
      </button>
      <audio ref={audioRef} src={props.audio} preload="auto"></audio>
    </div>
  );
};

export default Countdown;
