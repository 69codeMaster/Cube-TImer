import "./App.css";
import Timer from "./components/Timer";
import Scramble from "./components/Scramble";
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
    </div>
  );
}

export default App;
