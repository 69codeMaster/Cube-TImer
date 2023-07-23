import "./App.css";
import Timer from "./components/Timer";
import Scramble from "./components/Scramble";
import Average from "./components/Averages";
import { useState } from "react";
import { generateScramble } from "./utils/scrambleUtils";

function App() {
  const [running, setRunning] = useState(false);
  let scramble = generateScramble();

  return (
    <div className="app-container">
      <Scramble show={!running} scramble={scramble} />
      <Timer running={running} setRunning={setRunning} scramble={scramble} />
      <Average averageOf={5} running={running} />
      <Average averageOf={12} running={running} />
    </div>
  );
}

export default App;
