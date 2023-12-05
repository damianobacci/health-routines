import classes from "./App.module.css";
import CountdownList from "./Counter/CoutdownList";
import AboutModal from "./UI/AboutModal";
import { useRef } from "react";

function App() {
  const dialog = useRef();
  return (
    <>
      <header className={classes.header}>
        <h1>Remembrify</h1>
        <h2>Your Nudge Towards Healthier Desk-Sitting Routines!</h2>
      </header>
      <section className={classes.text}>
        Working at your desk, it's easy to lose track of time and forget to do
        the most basic things, like drinking water. Setting alarms on your phone
        can be distracting and counterproductive, you may check your
        notifications and get lost.. <strong>Remembrify is here to help</strong>
        . The app allows you to set multiple reminders, helping you maintain
        your health routines without losing focus at work. Stay hydrated and
        follow healthy practices while you work, with minimal interruption!
        <button
          onClick={() => dialog.current.showModal()}
          className={classes["button-primary"]}
        >
          About
        </button>
      </section>
      <AboutModal ref={dialog} />
      <CountdownList />
    </>
  );
}

export default App;
