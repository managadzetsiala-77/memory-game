function Difficulty({ makeGame }) {
  return (
    <div className="difficulty">
      <button onClick={() => makeGame(10)}>Easy</button>
      <button onClick={() => makeGame(20)}>Medium</button>
      <button onClick={() => makeGame(30)}>Hard</button>
      <button onClick={() => makeGame(40)}>Expert</button>
      <button onClick={() => makeGame(50)}>Impossible</button>
    {/* <button onClick={() => console.log("CLICK")}>
  TEST
</button> */}
    
    </div>
  );
}

export default Difficulty;