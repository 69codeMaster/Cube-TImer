import "./App.css";
import Timer from "./components/Timer";
import Scramble from "./components/Scramble";
import Average from "./components/Average";
import ScrambleProvider from "./store/ScrambleContext";
import { useState } from "react";
import DbProvider from "./store/DbContext";
function App() {
  const [dbUpdated, setDbUpdated] = useState(true);
  const [running, setRunning] = useState(false);
  return (
    <DbProvider>
      <div className="app-container">
        <ScrambleProvider>
          <Scramble running={running} />
          <Timer
            setDbUpdated={setDbUpdated}
            running={running}
            setRunning={setRunning}
          />
        </ScrambleProvider>
        <Average
          averageOf={5}
          dbUpdated={dbUpdated}
          setDbUpdated={setDbUpdated}
          running={running}
        />
      </div>
    </DbProvider>
  );
}

export default App;
