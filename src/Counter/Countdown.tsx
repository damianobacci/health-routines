import { useState, useEffect, useRef } from "react";
import classes from "./Countdown.module.css";

type CountDownProps = {
  globalAction: string | null;
  reset: () => void;
  audio: string;
  timeSet: number;
  title: string;
  onDelete: () => void;
};

export default function Countdown({
  globalAction,
  reset,
  audio,
  timeSet,
  title,
  onDelete,
}: CountDownProps) {
  const [timeInSeconds, setTimeInSeconds] = useState<number>(timeSet);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Reference to the audio element
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let timerId: number = 0;

    if (isPlaying && timeInSeconds > 0) {
      timerId = setInterval(() => {
        setTimeInSeconds((time: number) => time - 1);
      }, 1000);
    } else if (!timeInSeconds || !isPlaying) {
      clearInterval(timerId);
    }

    // Play the audio when the timer reaches 0
    if (timeInSeconds === 0 && isPlaying) {
      audioRef.current!.play();
    }

    return () => clearInterval(timerId);
  }, [timeInSeconds, isPlaying, audio]);

  useEffect(() => {
    if (globalAction === "start") {
      setIsPlaying(true);
      reset();
    } else if (globalAction === "stop") {
      setIsPlaying(false);
      reset();
    } else if (globalAction === "reset") {
      setIsPlaying(false);
      setTimeInSeconds(timeSet);
      reset();
    }
  }, [globalAction, timeSet]);

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
    setTimeInSeconds(timeSet);
    // Ensure audio is paused and reset to start when resetting the timer
    audioRef.current!.pause();
    audioRef.current!.currentTime = 0;
  };

  return (
    <div className={classes.counter}>
      <h2 className={classes.title}>{title}</h2>
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
      <button className={classes["button-delete"]} onClick={onDelete}>
        Delete
      </button>
      <audio ref={audioRef} src={audio} preload="auto"></audio>
    </div>
  );
}
