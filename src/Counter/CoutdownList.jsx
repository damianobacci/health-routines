import { useState, useEffect } from "react";
import classes from "./CountdownList.module.css";

import Countdown from "./Countdown";
import NewCountdown from "./NewCountdown";
import SelectAudio from "./SelectAudio";
import alarm from "../assets/alarm.wav";

const countdowns = [
  { id: 0, title: "Drink your water 🥛🚰", timeSet: 3600 },
  { id: 1, title: "Put eye drops 💧👁️", timeSet: 3600 },
  { id: 2, title: "Walk & stretch 🚶🧘", timeSet: 3600 },
  { id: 3, title: "Get up from your chair 🪑", timeSet: 1200 },
];

const CountdownList = () => {
  const [countdownList, setCountdownList] = useState(
    JSON.parse(localStorage.getItem("timers")) || countdowns
  );
  const [globalAction, setGlobalAction] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(alarm);

  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(countdownList));
  }, [countdownList]);

  const countdownAdder = (data) => {
    setCountdownList((prevCounts) => {
      return [
        ...prevCounts,
        { id: data.id, title: data.title, timeSet: data.timeSet * 60 },
      ];
    });
  };

  const audioChangeHandler = (audio) => {
    setSelectedAudio(audio);
  };

  const deleteTimer = (idToDelete) => {
    setCountdownList((prevCounts) => {
      return prevCounts.filter((countdown) => countdown.id !== idToDelete);
    });
  };

  const startAllTimers = () => setGlobalAction("start");
  const stopAllTimers = () => setGlobalAction("stop");
  const resetAllTimers = () => setGlobalAction("reset");
  const resetGlobalAction = () => setGlobalAction(null);

  return (
    <div className={classes.list}>
      <div className={classes.controls}>
        <SelectAudio onAudioChange={audioChangeHandler} />
        <button className={classes["button-primary"]} onClick={startAllTimers}>
          Start All
        </button>
        <button className={classes["button-primary"]} onClick={stopAllTimers}>
          Stop All
        </button>
        <button className={classes["button-primary"]} onClick={resetAllTimers}>
          Reset All
        </button>
      </div>
      {countdownList.map((timer) => {
        return (
          <Countdown
            key={timer.id}
            title={timer.title}
            timeSet={timer.timeSet}
            onDelete={() => {
              deleteTimer(timer.id);
            }}
            globalAction={globalAction}
            reset={resetGlobalAction}
            audio={selectedAudio}
          />
        );
      })}
      <NewCountdown onAddTimer={countdownAdder} />
    </div>
  );
};

export default CountdownList;
