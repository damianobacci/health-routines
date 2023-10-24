import { useRef, useState } from "react";
import alarm from "../assets/alarm.wav";
import bell from "../assets/bell.wav";
import telephone from "../assets/telephone.mp3";

const SelectAudio = (props) => {
  const audioRef = useRef(null);
  const [audio, setAudio] = useState(alarm);

  const audioFiles = {
    alarm: alarm,
    bell: bell,
    telephone: telephone,
  };

  const audioChangeHandler = (event) => {
    const selectedAudio = audioFiles[event.target.value];
    setAudio(selectedAudio);
    props.onAudioChange(selectedAudio);
  };

  const playPreviewAudio = () => {
    audioRef.current.play();
    setTimeout(() => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }, 1900);
  };
  return (
    <div>
      <label htmlFor="audioSelect">Select your alarm: </label>
      <select onChange={audioChangeHandler} name="audioSelect" id="audioSelect">
        <option value="alarm" defaultValue>
          Digital Alarm
        </option>
        <option value="bell">Bell</option>
        <option value="telephone">Telephone</option>
      </select>
      <button onClick={playPreviewAudio}>Preview 🎵</button>
      <audio ref={audioRef} src={audio}></audio>
    </div>
  );
};

export default SelectAudio;
