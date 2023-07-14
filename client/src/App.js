import "./App.css";
import Timer from "./components/Timer";
import Scramble from "./components/Scramble";
import { useState } from "react";
import { ScramblelProvider } from "./store/scrambleContext";
function App() {
  const [running, setRunning] = useState(false);

  return (
    <ScramblelProvider>
      <div className="app-container">
        <Scramble running={running} />
        <Timer running={running} setRunning={setRunning} />
      </div>
    </ScramblelProvider>
  );
}

export default App;
