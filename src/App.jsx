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
        While you are working is hard to keep tracks of many things. Have a
        healthy routine with these simple timers. You can add other timers if
        you prefer.
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
