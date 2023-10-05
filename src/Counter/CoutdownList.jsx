import { useState, useEffect } from "react";

import Countdown from "./Countdown";
import NewCountdown from "./NewCountdown";

const countdowns = [
  { id: 0, title: "Drink your water 🥛🚰", timeSet: 3600 },
  { id: 1, title: "Put eye drops 💧👁️", timeSet: 3600 },
  { id: 2, title: "Walk/do some stretching 🚶🧘", timeSet: 3600 },
];

const CountdownList = () => {
  const [countdownList, setCountdownList] = useState(
    JSON.parse(localStorage.getItem("timers")) || countdowns
  );
  const [globalAction, setGlobalAction] = useState(null);

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

  const deleteTimer = (idToDelete) => {
    setCountdownList((prevCounts) => {
      return prevCounts.filter((countdown) => countdown.id !== idToDelete);
    });
  };

  const startAllTimers = () => setGlobalAction("start");
  const stopAllTimers = () => setGlobalAction("stop");
  const resetAllTimers = () => setGlobalAction("reset");

  return (
    <>
      <button onClick={startAllTimers}>Start All</button>
      <button onClick={stopAllTimers}>Stop All</button>
      <button onClick={resetAllTimers}>Reset All</button>
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
          />
        );
      })}
      <NewCountdown onAddTimer={countdownAdder} />
    </>
  );
};

export default CountdownList;
