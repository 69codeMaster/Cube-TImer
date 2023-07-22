import "./App.css";
import Timer from "./components/Timer";
import Scramble from "./components/Scramble";
import Average from "./components/Averages";
import { useState } from "react";
import { generateScramble } from "./utils/scrambleUtils";

function App() {
  const [running, setRunning] = useState(false);
  const [scramble, setScramble] = useState(generateScramble());

  return (
    <div className="app-container">
      <Scramble running={running} scramble={scramble} />
      <Timer
        running={running}
        setRunning={setRunning}
        scramble={scramble}
        handleTimeStopped={() => setScramble(generateScramble())}
      />
      <Average averageOf={5} scramble={scramble} running={running} />
      <Average averageOf={12} scramble={scramble} running={running} />
    </div>
  );
}

export default App;
