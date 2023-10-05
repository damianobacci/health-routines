const NewCountdown = (props) => {
  const formSetHandler = (event) => {
    event.preventDefault();
    let name = event.target.elements.name.value;
    let wantedTime = +event.target.elements.minutes.value;
    props.onAddTimer({
      id: Math.random().toString(),
      title: name,
      timeSet: wantedTime,
    });
  };

  return (
    <>
      <h2>Add your personalized countdown</h2>
      <form onSubmit={formSetHandler}>
        <label htmlFor="name">Name of the new counter</label>
        <input id="name" type="text" />
        <label htmlFor="minutes">
          Time in minutes of the new counter (max 60 minutes)
        </label>
        <input id="minutes" type="number" step="1" max="60" min="1" />
        <button type="submit">Set</button>
      </form>
    </>
  );
};

export default NewCountdown;
