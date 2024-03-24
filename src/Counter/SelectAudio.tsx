import { useRef, useState } from "react";
import alarm from "../assets/alarm.wav";
import bell from "../assets/bell.wav";
import telephone from "../assets/telephone.mp3";
import classes from "./SelectAudio.module.css";

type SelectAudioProps = {
  onAudioChange: (audio: string) => void;
};

export default function SelectAudio({ onAudioChange }: SelectAudioProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audio, setAudio] = useState(alarm);

  const audioFiles: { [key: string]: string } = {
    alarm: alarm,
    bell: bell,
    telephone: telephone,
  };

  const audioChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAudio = audioFiles[event.target.value];
    setAudio(selectedAudio);
    onAudioChange(selectedAudio);
  };

  const playPreviewAudio = () => {
    audioRef.current as HTMLAudioElement;
    audioRef.current!.play();
    setTimeout(() => {
      audioRef.current!.pause();
      audioRef.current!.currentTime = 0;
    }, 1900);
  };
  return (
    <div>
      <h2 className={classes.title}>Control all countdowns</h2>
      <select
        onChange={audioChangeHandler}
        name="audioSelect"
        id="audioSelect"
        defaultValue="Select an alarm..."
      >
        <option value="alarm">Digital Alarm</option>
        <option value="bell">Train Bell</option>
        <option value="telephone">Telephone</option>
      </select>
      <button className={classes["button-primary"]} onClick={playPreviewAudio}>
        Preview 🎵
      </button>
      <audio ref={audioRef} src={audio}></audio>
    </div>
  );
}
