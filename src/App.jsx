import "./App.css";
import CountdownList from "./Counter/CoutdownList";

function App() {
  return (
    <>
      <header>
        <h1>Routinify your health</h1>
      </header>
      <section>
        While you are working is hard to keep tracks of many things. Routinify
        your health with these simple timers. You can add other timers if you
        prefer.
      </section>
      <CountdownList />
    </>
  );
}

export default App;
