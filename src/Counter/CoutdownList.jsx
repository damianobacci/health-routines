import { useState } from "react";

import Countdown from "./Countdown";
import NewCountdown from "./NewCountdown";

const countdowns = [
  { id: 0, title: "Drink your water 🥛🚰", timeSet: 3600 },
  { id: 1, title: "Put eye drops 💧👁️", timeSet: 3600 },
  { id: 2, title: "Walk/do some stretching 🚶🧘", timeSet: 3600 },
];

const CountdownList = () => {
  const [countdownList, setCountdownList] = useState(countdowns);

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

  return (
    <>
      {countdownList.map((timer) => {
        return (
          <Countdown
            key={timer.id}
            title={timer.title}
            timeSet={timer.timeSet}
            onDelete={() => {
              deleteTimer(timer.id);
            }}
          />
        );
      })}
      <NewCountdown onAddTimer={countdownAdder} />
    </>
  );
};

export default CountdownList;
