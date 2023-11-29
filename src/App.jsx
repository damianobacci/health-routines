import classes from "./App.module.css";
import CountdownList from "./Counter/CoutdownList";

function App() {
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
        <button className={classes["button-primary"]}>About</button>
      </section>
      <CountdownList />
    </>
  );
}

export default App;
