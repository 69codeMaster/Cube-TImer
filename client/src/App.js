import "./App.css";
import Timer from "./components/Timer";
import Scramble from "./components/Scramble";
import Average from "./components/Average";
import { useState, useEffect } from "react";
import { generateScramble } from "./utils/scrambleUtils";

import { RunningProvider } from "./store/runningContext";
import { ScrambleProvider } from "./store/scrambleContext";

function App() {
  console.log("app re-rendered");
  const [running, setRunning] = useState(false);
  const [scramble, setScramble] = useState("");

  useEffect(() => {
    if (!running) setScramble(generateScramble());
  }, [running]);

  return (
    <div className="app-container">
      <Scramble running={running} scramble={scramble} />
      <Timer running={running} setRunning={setRunning} scramble={scramble} />
      <Average averageOf={5} running={running} />
      <Average averageOf={12} running={running} />
    </div>
  );
}

export default App;
