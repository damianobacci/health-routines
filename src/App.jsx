import classes from "./App.module.css";
import CountdownList from "./Counter/CoutdownList";

function App() {
  return (
    <>
      <header className={classes.header}>
        <h1>Have some healthy routines!</h1>
      </header>
      <section className={classes.text}>
        While you are working is hard to keep tracks of many things. Have a
        healthy routine with these simple timers. You can add other timers if
        you prefer.
      </section>
      <CountdownList />
    </>
  );
}

export default App;
