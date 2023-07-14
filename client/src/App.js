import "./App.css";
import Timer from "./components/Timer";
import Scramble from "./components/Scramble";
import { useState } from "react";
function App() {
  const [running, setRunning] = useState(false);

  return (
    <div className="app-container">
      <Scramble running={running} />
      <Timer running={running} setRunning={setRunning} />
    </div>
  );
}

export default App;
