import "./App.css";
import Timer from "./components/Timer";
import Scramble from "./components/Scramble";
import Average from "./components/Average";
import ScrambleRunningProvider from "./store/scrambleRunningContext";
import { useState } from "react";

function App() {
  const [dbUpdated, setDbUpdated] = useState(true);
  return (
    <ScrambleRunningProvider>
      <div className="app-container">
        <Scramble />
        <Timer setDbUpdated={setDbUpdated} />

        <Average
          averageOf={5}
          dbUpdated={dbUpdated}
          setDbUpdated={setDbUpdated}
        />
        {/* <Average
          averageOf={12}
          dbUpdated={dbUpdated}
          setDbUpdated={setDbUpdated}
        /> */}
      </div>
    </ScrambleRunningProvider>
  );
}

export default App;
