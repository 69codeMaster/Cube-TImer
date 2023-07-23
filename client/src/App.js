import "./App.css";
import Timer from "./components/Timer";
import Scramble from "./components/Scramble";
import Average from "./components/Averages";
import { useState } from "react";
import { generateScramble } from "./utils/scrambleUtils";

/*TODO:
 fetching the average happens before the new solve is inserted to the DB
 the fetch should happend after that
*/
function App() {
  const [running, setRunning] = useState(false);
  const scramble = generateScramble();

  return (
    <div className="app-container">
      <Scramble running={!running} scramble={scramble} />
      <Timer running={running} setRunning={setRunning} scramble={scramble} />
      <Average averageOf={5} running={running} />
      {/* <Average averageOf={12} running={running} /> */}
    </div>
  );
}

export default App;
